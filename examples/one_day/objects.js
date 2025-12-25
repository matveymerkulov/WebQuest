import {combine, isClosed} from "../../src/functions.js"
import {Obj} from "../../src/object.js"
import {Container} from "../../src/container.js"
import {decline, declineName, genus, no, Pad, yes} from "../../src/main.js"
import {allObjects} from "../../src/base.js"
import {temperature, water} from "./substances.js"


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


combine(new Container("в шкафу"), {
    objects: ["пиджак", "брюки [1]", "рубашка"],
    put: "в шкаф",
})

combine(new Container("на полке"), {
    put: "на полку",
})

combine(new Container("на шкафу"), {
    put: "на шкаф",
    outside: yes,
})

combine(new Container("под шкафом"), {
    put: "под шкаф",
    outside: yes,
})

combine(new Obj("шкаф"), {
    objects: ["в шкафу", "на полке", "на шкафу", "под шкафом"],
    inspectable: yes,

    description: "Это деревянный платяной шкаф, покрашенный коричневой краской."
}, openable())



combine(new Container("на столе"), {
    objects: "ноутбук",
    put: "на стол",
})

combine(new Container("под столом"), {
    put: "под стол",
})

combine(new Obj("стол [в гостиной]"), {
    objects: ["на столе", "под столом"],
    inspectable: yes,
    description: "Это обычный письменный стол."
})



combine(new Container("на кровати"), {
    objects: ["простыня", "одеяло", "подушка"],
    put: "на кровать",
})

combine(new Container("под кроватью"), {
    objects: ["носки", "тапочки"],
    put: "под кровать",
})

combine(new Obj("кровать"), {
    objects: ["на кровати", "под кроватью"],
    inspectable: yes,
    description: "Кровать из ДСП."
})


// ПРИХОЖАЯ


combine(new Obj("дверь в подъезд"), {

})


combine(new Container("на нижней полке [шкафчика для обуви]"), {
    objects: "ботинки",
    put: "на нижнюю полку"
})

combine(new Container("на верхней полке [шкафчика для обуви]"), {
    put: "на верхнюю полку"
})

combine(new Container("на шкафчике [для обуви]"), {
    put: "на шкафчик"
})

combine(new Obj("шкафчик для обуви"), {
    objects: ["на нижней полке [шкафчика для обуви]", "на верхней полке [шкафчика для обуви]"
        , "на шкафчике [для обуви]"],
    inspectable: yes,
})


combine(new Container("на коврике"), {
    put: "на коврик"
})

combine(new Obj("коврик для ног"), {
    objects: "на коврике"
})


combine(new Obj(["вешалка [в прихожей]", "вешалку"]), {
    objects: "куртка",
    inspectable: yes,
    put: "на вешалку"
})


combine(new Obj(["полка для шапок", "полку для шапок"]), {
    objects: "кепка",
    inspectable: yes,
    put: "на полку для шапок"
})


combine(new Obj("зеркало [в прихожей]"), {

})


// РАКОВИНА


function createReservoir(imenName, datName, vinName, where, volume) {
    where = where === "" ? "" : " [" + where + "]"

    const inside = "в " + datName + where
    combine(new Container(inside), {
        put: "в " + vinName
    })
    const on = "на " + datName + where
    combine(new Container(on), {
        put: "на " + vinName
    })

    const coldValve = "вентиль холодной воды" + where
    const coldValveObject = combine(new Obj(coldValve), openable())
    const hotValve = "вентиль горячей воды" + where
    const hotValveObject = combine(new Obj(hotValve), openable())

    const tap = "кран" + where
    combine(new Obj(tap), {
        coldValve: coldValveObject,
        hotValveObject: hotValveObject,
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
            if(coldValveObject.isClosed) {
                if(!hotValveObject.isClosed) return temperature.hot
            } else {
                if(hotValveObject.isClosed) return temperature.cold
                return temperature.warm
            }
            return undefined
        },
    })

    return combine(new Obj(imenName + where), {
        name: [imenName, vinName],
        volume: 18000,
        plugType: 0,
        objects: [tap, coldValve, hotValve, inside, on],
        inspectable: yes,
    })
}


// ШКАФЧИКИ


function createShelf(where) {
    const bottomShelf = "на нижней полке [шкафчика " + where + "]"
    combine(new Container(bottomShelf), {
        put: "на нижнюю полку"
    })
    const topShelf = "на верхней полке [шкафчика " + where + "]"
    combine(new Container(topShelf), {
        put: "на верхнюю полку"
    })
    const onShelf = "на шкафчике [" + where + "]"
    combine(new Container(onShelf), {
        put: "на шкафчик",
        outside: yes,
    })

    return combine(new Obj("шкафчик [" + where + "]"), {
        objects: [bottomShelf, topShelf, onShelf],
        inspectable: yes,
    }, openable())
}


// ТУАЛЕТ


combine(new Obj("унитаз"), {
    volume: 25000,
})


combine(new Container("на бачке"), {
    put: "на бачок",
    outside: yes,
    objects: ["туалетная бумага"],
})

combine(new Container("в бачке"), {
    put: "в бачок",
})

combine(new Obj(["ручка смыва", "ручку смыва"]), {
    outside: yes,
})

combine(new Obj("бачок"), {
    objects: ["ручка смыва", "на бачке", "в бачке"],
    inspectable: yes,
    volume: 6000,
    substance: "вода",
    substanceVolume: 6000,
}, openable())


createShelf("в туалете")


// ВАННАЯ


combine(new Container("в ванне"), {
    put: "в ванну"
})

combine(new Container("на ванне"), {
    put: "на ванну",
    objects: ["флакон геля для душа", "флакон шампуня", "затычка"],
})



combine(createReservoir("ванна", "ванне", "ванну", "", 150000), {
    inspectable: yes,
})
allObjects.get("ванна").objects.push("флакон геля для душа", "флакон шампуня", "затычка")


createReservoir("раковина", "раковине", "раковину", "в ванной", 18000)
allObjects.get("на раковине [в ванной]").objects.push("стакан [в ванной]", "мыло", "тюбик зубной пасты", "расческа")


combine(new Obj("зеркало [в ванной]"), {
})


combine(new Obj(["вешалка [в ванной]", "вешалку"]), {
    inside: "на вешалке",
    put: "на вешалку",
    hanger: yes,
    putVerb: "повесить",
    objects: "полотенце",
    inspectable: yes,
})


combine(new Obj(["вешалка [в ванной 2]", "вешалку"]), {
    inside: "на вешалке",
    put: "на вешалку",
    hanger: yes,
    putVerb: "повесить",
    objects: "мочалка",
    inspectable: yes,
})


createShelf("в ванной")


allObjects.get("на верхней полке [шкафчика в ванной]").objects.push("банка соли для ванн")

allObjects.get("на нижней полке [шкафчика в ванной]").objects.push("пульверизатор для мытья сантехники",
    "пульверизатор для мытья унитазов")


combine(new Container("на стиральной машине"), {
    put: "на стиральную машину",
    outside: yes,
    objects: ["пакет стирального порошка", "стаканчик"],
})

combine(new Container("в стиральной машине"), {
    put: "в стиральную машину",
    objects: "брюки [2]",
})

combine(new Container("в лотке стиральной машины"), {
    put: "в лоток стиральной машины",
})

combine(new Obj(["стиральная машина", "стиральную машину"]), {
    inspectable: yes,
    objects: ["на стиральной машине", "в стиральной машине", "в лотке стиральной машины"],
}, openable(genus.feminine))


// КУХНЯ


combine(new Obj("буфет"), {
    inspectable: yes,
}, openable())


createReservoir("раковина", "раковине", "раковину", "на кухне", 18000)


combine(new Obj("стол [на кухне]"), {
    inspectable: yes,
})


combine(new Obj("холодильник"), {
    inspectable: yes,
}, openable())
