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

        if(isZero(thisContainer.substanceVolume)) return commands
        const substance = thisContainer.substance
        
        function addMoveCommand(container, checkContainers = true) {
            if(container === thisContainer) return
            if(container.put && !isClosed(container) && (container.substanceVolume ?? 0) < container.volume) {
                const equalSubstances = substance === container.substance
                if(container.volume !== undefined && (isZero(container.substanceVolume) || equalSubstances)) {
                    commands.push({
                        text: () => (substance.liquid ? "залить" : "засыпать") +
                            "/" + container.put,
                        execution: () => {
                            container.substance = substance
                            if(container.substanceVolume === undefined) container.substanceVolume = 0
                            const volume = Math.min(thisContainer.substanceVolume, container.volume -
                                container.substanceVolume)
                            container.substanceVolume += volume
                            thisContainer.substanceVolume -= volume
                        }
                    })
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