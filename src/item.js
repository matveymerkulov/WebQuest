import {Obj} from "./object.js"
import {player} from "./person.js"
import {loc, tran} from "./localization.js"
import {currentContainer, declineName, Pad} from "./main.js"
import {isClosed, removeFromArray, toString} from "./functions.js"
import {processContainers} from "./container.js"

export class Item extends Obj {
    getCommands() {
        const commands = super.getCommands()
        if(!player.has(this)) {
            commands.push({
                text: () => loc("take"),
                execution: (item) => player.take(item)
            })
        }

        processContainers(this, commands, false, (thisItem, container) => {
            if(!container.put || isClosed(container)) return
            if(player.has(thisItem)) return
            commands.push({
                text: () => loc("drop") + "/" + tran(container.put),
                execution: (item) => {
                    player.take(item, container)
                }
            })
        })

        //console.clear()

        processContainers(this, commands, true, (thisItem, container) => {
            if(!container.put || isClosed(container)) return
            if(container.hanger && !thisItem.canBeHung) return
            if(!player.has(thisItem)) return
            commands.push({
                text: function() {
                    const verb = (container.putVerb ? tran(container.putVerb) : loc("drop"))
                    return verb + "/" + tran(container.put)
                },
                execution: (item) => player.drop(item, container)
            })
        })

        return commands
    }

    moveTo(container) {
        if(this.container === container) return
        if(this.container) removeFromArray(this.container.objects, this)
        container.objects.push(this)
        this.container = container
    }

    isIn(container) {
        return this.container === container
    }

    destroy() {
        if(this.container) removeFromArray(this.container.objects, this)
        removeFromArray(player.inventory, this)
    }
}