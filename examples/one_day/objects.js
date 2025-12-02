import {combine, isClosed} from "../../src/functions.js"
import {Obj} from "../../src/object.js"
import {Container} from "../../src/container.js"
import {decline, declineName, genus, no, yes} from "../../src/main.js"
import {write} from "../../src/gui.js"


function openable(gen = genus.masculine) {
    return {
        name: (obj) => {
            const ending = gen === genus.masculine ? "ый" : gen === genus.feminine ? "ая" : "ое"
            return (obj.isClosed ? "закрыт" : "открыт") + ending + " " + decline(obj.initialName)
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
})

combine(new Container("под шкафом"), {
    put: "под шкаф",
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


function createSink(where) {
    where = " [" + where + "]"

    const inside = "в раковине" + where
    combine(new Container(inside), {
        put: "в раковину"
    })
    const tap = "кран" + where
    new Obj(tap)
    const coldValve = "вентиль холодной воды" + where
    new Obj(coldValve)
    const hotValve = "вентиль горячей воды" + where
    new Obj(hotValve)

    return combine(new Obj("раковина" + where), {
        name: ["раковина", "раковину"],
        objects: [tap, coldValve, hotValve, inside],
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
        put: "на шкафчик"
    })

    return combine(new Obj("шкафчик [" + where + "]"), {
        objects: [bottomShelf, topShelf, onShelf],
        inspectable: yes,
    }, openable())
}


// ТУАЛЕТ


combine(new Obj("унитаз"), {
})


createShelf("в туалете")


// ВАННАЯ


combine(new Container("в ванне"), {
    put: "в ванну"
})

combine(new Obj(["ванна", "ванну"]), {
    objects: "в ванне"
})


createSink("в ванной")


combine(new Obj("зеркало [в ванной]"), {
})


combine(new Obj(["вешалка [в ванной]", "вешалку"]), {
    put: ""
})


createShelf("в ванной")


combine(new Obj(["стиральная машина", "стиральную машину"]), {
    inspectable: yes,
    objects: "брюки [2]",
    put: ""
}, openable(genus.feminine))


// КУХНЯ


combine(new Obj("буфет"), {
    inspectable: yes,
}, openable())


createSink("на кухне")


combine(new Obj("стол [на кухне]"), {
    inspectable: yes,
})


combine(new Obj("холодильник"), {
    inspectable: yes,
}, openable())
