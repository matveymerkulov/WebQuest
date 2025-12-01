import {combine} from "../../src/functions.js"
import {Obj} from "../../src/object.js"
import {Container} from "../../src/container.js"
import {yes} from "../../src/main.js"


// ГОСТИНАЯ


combine(new Container("в шкафу"), {
    objects: ["пиджак", "брюки", "рубашка"],
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
})



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
})

combine(new Obj("коврик для ног"), {
    objects: "на коврике"
})


combine(new Obj(["вешалка [в прихожей]", "вешалку"]), {
    objects: "куртка",
    inspectable: yes,
})


combine(new Obj(["полка для шапок", "полку для шапок"]), {
    objects: "кепка",
    inspectable: yes,
})


combine(new Obj("зеркало [в прихожей]"), {

})



// ТУАЛЕТ


combine(new Obj("унитаз"), {
})


combine(new Container("на нижней полке [в туалете]"), {
})

combine(new Container("на верхней полке [в туалете]"), {
})

combine(new Container("на шкафчике [в туалете]"), {
})

combine(new Obj("шкафчик [в туалете]"), {
    objects: ["на нижней полке [в туалете]", "на верхней полке [в туалете]", "на шкафчике [в туалете]"],
    inspectable: yes,
})


// РАКОВИНА


function createSink(where) {
    where = " [" + where + "]"

    new Container("в раковине" + where)
    new Obj("кран" + where)
    new Obj("вентиль холодной воды" + where)
    new Obj("вентиль горячей воды" + where)

    return combine(new Obj("раковина" + where), {
        name: ["раковина", "раковину"],
        objects: ["кран" + where, "вентиль холодной воды" + where, "вентиль горячей воды" + where, "в раковине" + where],
        inspectable: yes,
    })
}


// ВАННАЯ


combine(new Container("в ванне"), {
})

combine(new Obj(["ванна", "ванну"]), {
    objects: "в ванне"
})


createSink("в ванной")


combine(new Obj("зеркало [в ванной]"), {
})


combine(new Obj(["вешалка [в ванной]", "вешалку"]), {
})


function createShelf(where) {
    new Container("на нижней полке [шкафчика " + where + "]")
    new Container("на верхней полке [шкафчика " + where + "]")
    new Container("на шкафчике [" + where + "]")

    return combine(new Obj("шкафчик [в ванной]"), {
        objects: ["на нижней полке [шкафчика в ванной]", "на верхней полке [шкафчика " + where + "]"
            , "на шкафчике [" + where + "]"],
        inspectable: yes,
    })

}

createShelf("в ванной")


combine(new Obj("буфет"), {
    inspectable: yes,
})


createSink("на кухне")


combine(new Obj("стол [на кухне]"), {
    inspectable: yes,
})


combine(new Obj("холодильник"), {
    inspectable: yes,
})
