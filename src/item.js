import {Obj} from "./object.js"
import {player} from "./person.js"
import {loc, tran} from "./localization.js"
import {currentContainer, declineName} from "./main.js"
import {isClosed, toString} from "./functions.js"

export class Item extends Obj {
    getCommands() {
        const commands = []
        commands.push({
            text: () => loc("take") + "/в руки",
            condition: (item) => !player.has(item),
            execution: (item) => {
                player.putOff(item, currentContainer())
                player.take(item)
            }
        })

        function addTakeCommand(container) {
            if(container === this) return
            if(container.put && !isClosed(container)) {
                commands.push({
                    text: () => loc("take") + "/" + tran(container.put),
                    condition: (item) => !player.has(item),
                    execution: (item) => {
                        player.putOff(item, currentContainer())
                        player.take(item, container)
                    }
                })
            }

            const objects = container.objects === undefined ? container : container.objects
            for(const object of objects) {
                addTakeCommand(object)
            }
        }

        addTakeCommand(player.inventory)
        addTakeCommand(player.clothes)

        console.clear()

        function addDropCommand(container, checkContainers = true) {
            //console.log(declineName(container))
            if(container === this) return
            if(container.put && !isClosed(container)) {
                commands.push({
                    text: () => loc("drop") + "/" + tran(container.put),
                    condition: (item) => player.has(item),
                    execution: (item) => player.drop(item, container)
                })
            }
            const objects = container.objects === undefined ? container : container.objects
            for(const object of objects) {
                if(!checkContainers && object.inspectable) continue
                if(isClosed(container) && !object.outside) continue
                addDropCommand(object)
            }
        }

        addDropCommand(currentContainer(), false)
        addDropCommand(player.inventory)
        addDropCommand(player.clothes)

        return commands
    }

    moveTo(container) {
        if(this.container === container) return
        if(this.container) this.container.objects.remove(this)
        container.objects.push(this)
        this.container = container
    }

    isIn(container) {
        return this.container === container
    }
}