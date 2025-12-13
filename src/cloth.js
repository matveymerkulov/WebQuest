import {Item} from "./item.js"
import {player} from "./person.js"
import {loc, tran} from "./localization.js"
import {currentContainer} from "./main.js"
import {toString} from "./functions.js"
import {processContainers} from "./container.js"

export class Cloth extends Item {
    getCommands() {
        const commands = super.getCommands()
        if(!player.wears(this)) {
            commands.push({
                text: () => loc("putOn"),
                execution: (item) => {
                    player.putOn(item)
                }
            })
        }

        processContainers(this, commands, true, (cloth, container) => {
            if(!container.put) return
            if(!player.wears(cloth)) return
            commands.push({
                text: () => loc("putOff") + "/" + tran(container.put),
                execution: (item) => player.putOff(item, container)
            })
        })

        return commands
    }
}