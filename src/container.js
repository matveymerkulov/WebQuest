import {allObjects, BaseObject} from "./base.js"
import {error, isClosed, toArray, toString} from "./functions.js"
import {loc} from "./localization.js"
import {player} from "./person.js"
import {currentContainer, declineName} from "./main.js"

export class Container extends BaseObject {
    objects = []

    init() {
        super.init()
        const array = []
        for(let objectName of toArray(this.objects)) {
            const object = allObjects.get(objectName)
            if(!object) error(loc("object") + objectName + loc("isNotFound"))
            object.container = this
            array.push(object)
        }
        this.objects = array
        if(this.substance !== undefined) {
            if(!allObjects.has(this.substance)) error("substance \"" + this.substance + "\" is not found")
            this.substance = allObjects.get(this.substance)
        }
    }

    getCommands() {
        const thisContainer = this
        const commands = []

        function isZero(value) {
            return value === 0 || value === undefined
        }

        if(isZero(thisContainer.substanceVolume)) return []
        const substance = thisContainer.substance
        
        function addMoveCommand(container, checkContainers = true) {
            if(container === thisContainer) return
            if(container.put && !isClosed(container)) {
                if(container.volume !== undefined && isZero(container.substanceVolume)) {
                    if(!player.has(thisContainer)) {
                        commands.push({
                            text: () => toString(substance.move) + "/" + container.put,
                            execution: (item) => {
                                container.substance = substance
                                const volume = Math.min(item.substanceVolume, container.volume)
                                container.substanceVolume = volume
                                item.substanceVolume -= volume
                            }
                        })
                    }
                }
            }
            const objects = container.objects === undefined ? container : container.objects
            for(const object of objects) {
                if(!checkContainers && object.inspectable) continue
                if(isClosed(container) && !object.outside) continue
                addMoveCommand(object)
            }
        }

        addMoveCommand(currentContainer(), false)
        addMoveCommand(player.inventory)
        addMoveCommand(player.clothes)

        return commands
    }

    contains(object) {
        return this.objects.includes(object)
    }

    add(...object) {
        this.objects.push(...object)
    }

    remove(...object) {
        this.objects.remove(...object)
    }
}