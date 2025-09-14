import {yes, no} from "../../src/main.js"
import {light} from "./main.js"
import {write} from "../../src/gui.js"
import {player} from "../../src/person.js"
import {basement, entrance, hallway, garden, atTheGates} from "./locations.js"
import {key, shovel, box} from "./items.js"
import {Obj} from "../../src/object.js"
import {Passage} from "../../src/passage.js"
import {tran} from "../../src/localization.js"

export const door = Object.assign(new Obj("дверь"), {
    location0: "порог",
    location1: "прихожая",
    isClosed: yes,

    name: () => (door.isClosed ? ["закрытая дверь~closed door", "закрытую дверь~closed door"]
        : ["открытая дверь~open door", "открытую дверь~open door"]),
    commands: [
        {
            text: "осмотреть~inspect",
            execution: () => write(tran("Дверь сделана из добротного дерева и в данный момент " +
                "~The door is made of good quality wood and is currently ")+
                tran(door.isClosed ? "закрыта, но не заперта~closed but not locked" :
                    "остается широко открытой~wide open") + ".")
        }, {
            text: "войти~enter",
            condition: () => !door.isClosed && player.isIn(entrance),
            execution: () => {
                player.moveTo(hallway)
            }
        }, {
            text: "выйти~exit",
            condition: () => !door.isClosed && player.isIn(hallway),
            execution: () => {
                player.moveTo(entrance)
            }
        }, {
            text: "открыть~open",
            condition: () => door.isClosed,
            execution: () => {
                write("ОК, вы открыли дверь.~OK, you opened the door.")
                door.isClosed = no
            }
        }, {
            text: "закрыть~close",
            condition: () => !door.isClosed,
            execution: () => {
                write("OК, теперь дверь закрыта.~OK, now the door is closed.")
                door.isClosed = yes
            }
        }
    ],
})


export const cupboard = Object.assign(new Obj("буфет"), {
    isClosed: yes,
    wasOpen: no,

    name: () => (cupboard.isClosed ? "закрытый буфет~closed cupboard" : "открытый буфет~opened cupboard"),
    commands: [
        {
            text: "открыть~open",
            condition: () => cupboard.isClosed,
            execution: () => {
                cupboard.isClosed = no
                write("ОК, вы открыли буфет.")
                if(!cupboard.wasOpen) {
                    write('Вы слышите тихий голос, доносящийся из глубины буфета:' +
                        '"Швырни шкатулку c чердака и увидишь, что будет!".' +
                        '~You hear a quiet voice coming from the depths of the cupboard: ' +
                        '"Throw the box from the attic and see what happens!"')
                    cupboard.wasOpen = yes
                } else {
                    write("Но что такое? Все тихо!~But what's going on? Everything is quiet!")
                }
            }
        }, {
            text: "закрыть~close",
            condition: () => !cupboard.isClosed,
            execution: () => {
                cupboard.isClosed = yes
                write("ОК, теперь буфет закрыт.~OK, now the cupboard is closed.")
            }
        }
    ],
})


export const safe = Object.assign(new Obj("сейф"), {
    isClosed: yes,
    isLocked: yes,
    isHidden: () => !light(basement),

    objects: "шкатулка",
    name: () => (safe.isClosed ? "закрытый сейф~closed safe" : "открытый сейф~opened safe"),
    commands: [
        {
            text: "отпереть~unlock/бронзовым ключом~with the bronze key",
            condition: () => player.has(key) && safe.isLocked,
            execution: () => {
                write("ОК, вы отперли сейф ключом.~OK, you have unlocked the safe with the key.")
                safe.isLocked = no
            }
        }, {
            text: "запереть~lock/бронзовым ключом~with bronze key",
            condition: () => player.has(key) && !safe.isLocked,
            execution: () => {
                if(safe.isClosed) {
                    write("ОК, вы заперли сейф на ключ.~OK, you've locked the safe.")
                    safe.isLocked = yes
                } else {
                    write("Сейф в данный момент открыт, его нельзя запереть." +
                        "~The safe is currently open and cannot be locked.")
                }
            }
        }, {
            text: "открыть~open",
            condition: () => safe.isClosed,
            execution: () => {
                if(safe.isLocked) {
                    write("Не открывается! Заперт на ключ.~It won't open! It's locked.")
                } else if(safe.contains(box)) {
                    write("Сейф открывается, и внутри вы видите деревянную шкатулку." +
                        "~The safe opens and inside you see a wooden casket.")
                    safe.isClosed = no
                } else {
                    write("ОК, вы открыли сейф.~OK, you have opened the safe.")
                    safe.isClosed = no
                }
            }
        }, {
            text: "закрыть~close",
            condition: () => !safe.isClosed,
            execution: () => {
                write("ОК, вы закрыли дверь сейфа.~OK, you have closed the safe door.")
                safe.isClosed = yes
            }
        }, {
            text: "осмотреть~inspect",
            condition: () => !safe.isClosed,
            execution: () => {
                if(safe.isClosed) {
                    write("Дверца сейфа закрыта.~The safe door is closed.")
                } else {
                    write("Дверца сейфа открыта.~The safe door is open.")
                }
            }
        }
    ],
})


export const gates = Object.assign(new Obj("ворота"), {
    isClosed: yes,

    name: () => (gates.isClosed ? "закрытые ворота~closed gates" : "открытые ворота~open gates"),
    commands: [
        {
            text: "войти~enter",
            condition: () => !gates.isClosed && player.isIn(atTheGates),
            execution: () => {
                player.moveTo(garden)
            }
        }, {
            text: "выйти~exit",
            condition: () => !gates.isClosed && player.isIn(garden),
            execution: () => {
                player.moveTo(atTheGates)
            }
        }, {
            text: "осмотреть~inspect",
            execution: () => {
                write(
                    tran("Bopoтa сделаны из неважного дерева и в данный момент " +
                        "~The gates are made of low-quality wood and are currently ") +
                    tran(gates.isClosed
                        ? "закрыты изнутри на засов~locked from the inside with a bolt"
                        : "остаются открытыми~standing open"
                    ) + "."
                )
            }
        }, {
            text: "открыть~open",
            condition: () => gates.isClosed && player.isIn(garden),
            execution: () => {
                write("ОК, вы открыли ворота, отодвинув засов.~OK, you opened the gates by sliding the bolt.")
                gates.isClosed = no
            }
        }, {
            text: "закрыть~close",
            condition: () => !gates.isClosed && player.isIn(garden),
            execution: () => {
                write("ОК, вы закрыли ворота на засов.~OK, you bolted the gates.")
                gates.isClosed = yes
            }
        }
    ]
})


export const hole = Object.assign(new Obj("яма"), {
    isHidden: yes,

    objects: "ключ",
    name: ["яма~hole", "яму~hole"],
    commands: [
        {
            text: "осмотреть~inspect",
            execution: "Это довольно глубокая яма, и если туда свалиться, то...!" +
                "~This is a pretty deep hole—if you fall in, then...!"
        }, {
            text: "закопать~fill/лопатой~with shovel",
            condition: () => player.has(shovel),
            execution: () => {
                write("OК, вы закопали яму и оставили на лужайке некрасивое пятно!" +
                    "~OK, you filled in the hole and left an unsightly spot on the lawn!")
                hole.isHidden = yes
            }
        }, {
            text: "закопать~fill/руками~with bare hands",
            execution: () => {
                write("OК, вы закопали яму и оставили на лужайке некрасивое пятно!" +
                    "~OK, you filled in the hole and left an unsightly spot on the lawn!")
                hole.isHidden = yes
            }
        }
    ]
})
