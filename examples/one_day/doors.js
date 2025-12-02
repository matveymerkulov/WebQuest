import {combine, isClosed} from "../../src/functions.js"
import {Obj} from "../../src/object.js"
import {no, yes} from "../../src/main.js"
import {tran} from "../../src/localization.js"
import {player} from "../../src/person.js"
import {write} from "../../src/gui.js"
import {Passage} from "../../src/passage.js"

export class Door extends Passage {
    location0doorName
    location1doorName
    isClosed = yes

    constructor(name, location0, location1, location0doorName, location1doorName) {
        super(name, location0, location1)
        this.location0doorName = location0doorName
        this.location1doorName = location1doorName
    }

    init() {
        super.init()
        this.name = (door) => {
            const doorName = player.location === this.location0 ? this.location0doorName : this.location1doorName
            return (door.isClosed ? "закрытую " : "открытую ") + doorName
        }
    }

    getCommands() {
        return [
            {
                text: "войти",
                condition: (door) => !door.isClosed,
                execution: (door) => {
                    player.moveTo(player.location === door.location0 ? door.location1 : door.location0)
                }
            }, {
                text: "открыть",
                condition: (door) => door.isClosed,
                execution: (door) => {
                    door.isClosed = no
                }
            }, {
                text: "закрыть",
                condition: (door) => !door.isClosed,
                execution: (door) => {
                    door.isClosed = yes
                }
            }
        ]
    }
}


combine(new Door("дверь в гостиную", "гостиная", "прихожая",
    "дверь в прихожую", "дверь в гостиную"))

combine(new Door("дверь в туалет", "туалет", "прихожая",
    "дверь в прихожую", "дверь в туалет"))

combine(new Door("дверь в ванную", "ванная", "прихожая",
    "дверь в прихожую", "дверь в ванную"))

combine(new Door("дверь на кухню", "кухня", "прихожая",
    "дверь в прихожую", "дверь на кухню"))
