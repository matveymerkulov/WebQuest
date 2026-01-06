import {combine, isClosed} from "../../src/functions.js"
import {Obj} from "../../src/object.js"
import {Container} from "../../src/container.js"
import {decline, declineName, genus, no, Pad, yes} from "../../src/main.js"
import {allObjects} from "../../src/base.js"
import {temperature, water} from "./substances.js"
import {trousers2ID, trousersID} from "./cloth.js"


function openable(gen = genus.masculine) {
    return {
        name: (obj) => {
            const ending = gen === genus.masculine ? "ый" : gen === genus.feminine ? "ую" : "ое"
            return (obj.isClosed ? "закрыт" : "открыт") + ending + " " + decline(obj.initialName, Pad.vin)
        },
        isClosed: yes,
        commands: [
            {
                text: "открыть",
                condition: (obj) => obj.isClosed,
                execution: (obj) => {
                    obj.isClosed = no
                }
            }, {
                text: "закрыть",
                condition: (obj) => !obj.isClosed,
                execution: (obj) => {
                    obj.isClosed = yes
                }
            }
        ]
    }
}


// ГОСТИНАЯ


combine(new Obj("шкаф"), {
    objects: [
        combine(new Container("в шкафу"), {
            objects: ["пиджак", trousersID, "рубашка"],
            put: "в шкаф",
        }).id,

        combine(new Container("на полке"), {
            put: "на полку",
        }).id,

        combine(new Container("на шкафу"), {
            put: "на шкаф",
            outside: yes,
        }).id,

        combine(new Container("под шкафом"), {
            put: "под шкаф",
            outside: yes,
        }).id,
    ],
    inspectable: yes,

    description: "Это деревянный платяной шкаф, покрашенный коричневой краской."
}, openable())



export const livingRoomTable = combine(new Obj("стол"), {
    objects: [
        combine(new Container("на столе"), {
            objects: "ноутбук",
            put: "на стол",
        }).id,

        combine(new Container("под столом"), {
            put: "под стол",
        }).id,
    ],
    inspectable: yes,
    description: "Это обычный письменный стол."
})



combine(new Obj("кровать"), {
    objects: [
        combine(new Container("на кровати"), {
            objects: ["простыня", "одеяло", "подушка"],
            put: "на кровать",
        }).id,

        combine(new Container("под кроватью"), {
            objects: ["носки", "тапочки"],
            put: "под кровать",
        }).id,
    ],
    inspectable: yes,
    description: "Кровать из ДСП."
})


// ПРИХОЖАЯ


combine(new Obj("дверь в подъезд"), {

})



combine(new Obj("шкафчик для обуви"), {
    objects: [
        combine(new Container("на нижней полке"), {
            objects: "ботинки",
            put: "на нижнюю полку"
        }).id,

        combine(new Container("на верхней полке"), {
            put: "на верхнюю полку"
        }).id,

        combine(new Container("на шкафчике"), {
            put: "на шкафчик"
        }).id,
    ],
    inspectable: yes,
})



combine(new Obj("коврик для ног"), {
    objects: [
        combine(new Container("на коврике"), {
            put: "на коврик"
        }).id
    ]
})


export const hallwayHanger = combine(new Obj(["вешалка", "вешалку"]), {
    objects: "куртка",
    inspectable: yes,
    put: "на вешалку"
})


combine(new Obj(["полка для шапок", "полку для шапок"]), {
    objects: "кепка",
    inspectable: yes,
    put: "на полку для шапок"
})


export const hallwayMirror = combine(new Obj("зеркало"), {})


// РАКОВИНА


function createReservoir(imenName, datName, vinName, volume, inside = undefined, on = undefined) {
    const coldValve = combine(new Obj("вентиль холодной воды"), openable())
    const hotValve = combine(new Obj("вентиль горячей воды"), openable())
    const tap = combine(new Obj("кран"), {
        coldValve: coldValve,
        hotValveObject: hotValve,
        substance: "вода",
        waterText: function() {
            let text = ""
            switch(this.getTemperature()) {
                case temperature.cold:
                    text = "холодная"
                    break
                case temperature.warm:
                    text = "тёплая"
                    break
                case temperature.hot:
                    text = "горячая"
                    break
            }
            return text === "" ? "" : "течёт " + text + " вода"
        },
        getTemperature: function() {
            if(coldValve.isClosed) {
                if(!hotValve.isClosed) return temperature.hot
            } else {
                if(hotValve.isClosed) return temperature.cold
                return temperature.warm
            }
            return undefined
        },
    })

    return combine(new Obj(imenName), {
        name: [imenName, vinName],
        volume: volume,
        plugType: 0,
        objects: [
            tap.id,
            coldValve.id,
            hotValve.id,
            combine(new Container("в " + datName), {
                put: "в " + vinName,
                objects: inside,
            }).id,
            combine(new Container("на " + datName), {
                put: "на " + vinName,
                objects: on,
            }).id,
        ],
        inspectable: yes,
    })
}


// ШКАФЧИКИ


function createShelf(bottomShelf = undefined, topShelf = undefined, top = undefined) {
    return combine(new Obj("шкафчик"), {
        objects: [
            combine(new Container("на нижней полке"), {
                put: "на нижнюю полку",
                objects: bottomShelf,
            }).id,
            combine(new Container("на верхней полке"), {
                put: "на верхнюю полку",
                objects: topShelf,
            }).id,
            combine(new Container("на шкафчике"), {
                put: "на шкафчик",
                outside: yes,
                objects: top,
            }).id,
        ],
        inspectable: yes,
    }, openable())
}


// ТУАЛЕТ


combine(new Obj("унитаз"), {
    volume: 25000,
})


combine(new Obj("бачок"), {
    objects: [
        combine(new Container("на бачке"), {
            put: "на бачок",
            outside: yes,
            objects: ["туалетная бумага"],
        }).id,

        combine(new Container("в бачке"), {
            put: "в бачок",
        }).id,

        combine(new Obj(["ручка смыва", "ручку смыва"]), {
            outside: yes,
        }).id,
    ],
    inspectable: yes,
    volume: 6000,
    substance: "вода",
    substanceVolume: 6000,
}, openable())

export const toiletShelf = createShelf()


// ВАННАЯ


combine(createReservoir("ванна", "ванне", "ванну",150000,
    undefined, ["флакон геля для душа", "флакон шампуня", "затычка"]), {
    inspectable: yes,
})


export const bathroomSink = createReservoir("раковина", "раковине", "раковину", 18000
    , undefined,["стакан", "мыло", "тюбик зубной пасты", "расческа"])


export const bathroomMirror = combine(new Obj("зеркало"), {
})


export const bathroomHanger = combine(new Obj(["вешалка", "вешалку"]), {
    inside: "на вешалке",
    put: "на вешалку",
    hanger: yes,
    putVerb: "повесить",
    objects: "полотенце",
    inspectable: yes,
})


export const bathroomHanger2 = combine(new Obj(["вешалка", "вешалку"]), {
    inside: "на вешалке",
    put: "на вешалку",
    hanger: yes,
    putVerb: "повесить",
    objects: "мочалка",
    inspectable: yes,
})


export const bathroomShelf = createShelf(["банка соли для ванн"],
    ["пульверизатор для мытья сантехники", "пульверизатор для мытья унитазов"])


combine(new Obj(["стиральная машина", "стиральную машину"]), {
    inspectable: yes,
    objects: [
        combine(new Container("на стиральной машине"), {
            put: "на стиральную машину",
            outside: yes,
            objects: ["пакет стирального порошка", "стаканчик"],
        }).id,

        combine(new Container("в стиральной машине"), {
            put: "в стиральную машину",
            objects: trousers2ID,
        }).id,

        combine(new Container("в лотке стиральной машины"), {
            put: "в лоток стиральной машины",
        }).id,
    ],
}, openable(genus.feminine))


// КУХНЯ


combine(new Obj("буфет"), {
    inspectable: yes,
}, openable())


export const kitchenSink = createReservoir("раковина", "раковине", "раковину", 18000)


export const kitchenTable = combine(new Obj("стол"), {
    inspectable: yes,
})


combine(new Obj("холодильник"), {
    inspectable: yes,
}, openable())
