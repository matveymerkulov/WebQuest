import {Item} from "./item.js"
import {player} from "./person.js"
import {loc, tran} from "./localization.js"
import {currentContainer} from "./main.js"
import {toString} from "./functions.js"

export class Cloth extends Item {
    getCommands() {
        const cloth = this
        const commands = super.getCommands()
        if(!player.wears(cloth)) {
            commands.push({
                text: () => loc("putOn"),
                execution: (item) => {
                    player.putOn(item)
                }
            })
        }

        function addDropCommand(container) {
            if(container === cloth) return
            if(!container.put) return
            if(!player.wears(cloth)) return
            commands.push({
                text: () => loc("putOff") + "/" + tran(container.put),
                execution: (item) => player.putOff(item, container)
            })
        }

        addDropCommand(currentContainer())
        for(const object of currentContainer().objects) {
            addDropCommand(object)
        }

        return commands
    }
}