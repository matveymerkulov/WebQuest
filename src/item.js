import {Obj} from "./object.js"
import {player} from "./person.js"
import {loc, tran} from "./localization.js"
import {currentContainer} from "./main.js"
import {isClosed} from "./functions.js"

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

        function addDropCommand(container) {
            if(container.put && !isClosed(container)) {
                commands.push({
                    text: () => loc("drop") + "/" + tran(container.put),
                    condition: (item) => player.has(item),
                    execution: (item) => player.drop(item, container)
                })
            }
            if(container.objects === undefined) return
            for(const object of container.objects) {
                if(object.inspectable) continue
                if(isClosed(container) && !object.outside) continue
                addDropCommand(object)
            }
        }

        addDropCommand(currentContainer())

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