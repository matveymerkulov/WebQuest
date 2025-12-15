import {allObjects, BaseObject} from "./base.js"
import {error, isClosed, toArray, toString} from "./functions.js"
import {loc, tran} from "./localization.js"
import {player} from "./person.js"
import {currentContainer, declineName, Pad} from "./main.js"

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

        if(!isZero(thisContainer.substanceVolume)) {
            const substance = thisContainer.substance

            processContainers(this, commands, true, (thisContainer, container) => {
                if(!container.put || isClosed(container)) return
                if((container.substanceVolume ?? 0) >= container.volume) return
                const equalSubstances = substance === container.substance
                if(container.volume === undefined || (!isZero(container.substanceVolume) && !equalSubstances)) return
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
            })
        }

        if(this.plugType !== undefined) {
            processContainers(this, commands, true, (thisContainer, plug) => {
                if(plug.plugType !== thisContainer.plugType || !plug.isPlug) return
                commands.push({
                    text: function() {
                        return "заткнуть/" + declineName(plug, Pad.tvor)
                    },
                    execution: () => {
                        plug.destroy()
                        thisContainer.plug = plug
                    }
                })
            })
        }

        if(this.plug !== undefined) {
            const plug = this.plug
            commands.push({
                text: function() {
                    return "вытащить " + declineName(plug, Pad.vin)
                },
                execution: () => {
                    player.take(plug)
                    thisContainer.plug = undefined
                }
            })
        }

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


export function processContainers(thisItem, commands, checkOutside = true, code) {
    function addCommand(container, checkContainers = true) {
        //console.log(declineName(container))
        if(container === thisItem) return
        code(thisItem, container)

        const objects = container.objects === undefined ? container : container.objects
        for(const object of objects) {
            if(!checkContainers && object.inspectable) continue
            if(isClosed(container) && !object.outside) continue
            addCommand(object)
        }
    }

    if(checkOutside) addCommand(currentContainer(), false)
    addCommand(player.inventory)
    addCommand(player.clothes)

    return commands
}