import {combine} from "../../src/functions.js"
import {Obj} from "../../src/object.js"
import {Container} from "../../src/container.js"
import {yes} from "../../src/main.js"
import {Passage} from "../../src/passage.js"
import {bathroom, hallway, kitchen, livingRoom, wc} from "./locations.js"


export const insideWardrobe = combine(new Container("в шкафу"), {
    objects: ["пиджак", "брюки", "рубашка"],
    put: "в шкаф",
})

export const onShelf = combine(new Container("на полке"), {
    put: "на полку",
})

export const onWardrobe = combine(new Container("на шкафу"), {
    put: "на шкаф",
})

export const underWardrobe = combine(new Container("под шкафом"), {
    put: "под шкаф",
})

export const wardrobe = combine(new Obj("шкаф"), {
    objects: ["в шкафу", "на полке", "на шкафу", "под шкафом"],
    inspectable: yes,

    description: "Это деревянный платяной шкаф, покрашенный коричневой краской."
})



export const onTable = combine(new Container("на столе"), {
    objects: "ноутбук",
    put: "на стол",
})

export const underTable = combine(new Container("под столом"), {
    put: "под стол",
})

export const table = combine(new Obj("стол [в гостиной]"), {
    objects: ["на столе", "под столом"],
    inspectable: yes,

    description: "Это обычный письменный стол."
})



export const onBed = combine(new Container("на кровати"), {
    objects: ["простыня", "одеяло", "подушка"],
    put: "на кровать",
})

export const underBed = combine(new Container("под кроватью"), {
    objects: ["носки", "тапочки"],
    put: "под кровать",
})

export const bed = combine(new Obj("кровать"), {
    objects: ["на кровати", "под кроватью"],
    inspectable: yes,

    description: "Кровать из ДСП."
})


export const hallwayDoor = combine(new Obj("дверь в подъезд"), {

})


export const onBottomShelfOfBootShelf = combine(new Container("на нижней полке [шкафчика для обуви]"), {
    objects: "ботинки"
})

export const onTopShelfOfBootShelf = combine(new Container("на верхней полке [шкафчика для обуви]"), {
})

export const onTopOfBootShelf = combine(new Container("на шкафчике [для обуви]"), {
})

export const bootShelf = combine(new Obj("шкафчик для обуви"), {
    objects: ["на нижней полке [шкафчика для обуви]", "на верхней полке [шкафчика для обуви]"
        , "на шкафчике [для обуви]"],
    inspectable: yes,
})


export const onDoormat = combine(new Container("на коврике"), {
})

export const doormat = combine(new Obj("коврик для ног"), {
    objects: "на коврике"
})


export const hallwayMirror = combine(new Obj("зеркало [в прихожей]"), {

})


export const toilet = combine(new Obj("унитаз"), {
})


export const onBottomShelfOfWcShelf = combine(new Container("на нижней полке [в туалете]"), {
})

export const onTopShelfOfWcShelf = combine(new Container("на верхней полке [в туалете]"), {
})

export const onTopOfWcShelf = combine(new Container("на шкафчике [в туалете]"), {
})

export const wcShelf = combine(new Obj("шкафчик [в туалете]"), {
    objects: ["на нижней полке [в туалете]", "на верхней полке [в туалете]", "на шкафчике [в туалете]"],
    inspectable: yes,
})


export const insideBath = combine(new Container("в ванне"), {
})

export const bath = combine(new Obj("ванна"), {
    objects: "в ванне"
})


export const insideBathroomSink = combine(new Container("в раковине"), {
})

export const bathroomSink = combine(new Obj("раковина [в ванной]"), {
    objects: "в раковине"
})


export const bathroomMirror = combine(new Obj("зеркало [в ванной]"), {
})


export const hanger = combine(new Obj("вешалка"), {
})


export const onBottomShelfOfBathroomShelf = combine(new Container("на нижней полке [шкафчика в ванной]"), {
})

export const onTopShelfOfBathroomShelf = combine(new Container("на верхней полке [шкафчика в ванной]"), {
})

export const onTopOfBathroomShelf = combine(new Container("на шкафчике [в ванной]"), {
})

export const bathroomShelf = combine(new Obj("шкафчик [в ванной]"), {
    objects: ["на нижней полке [шкафчика в ванной]", "на верхней полке [шкафчика в ванной]"
        , "на шкафчике [в ванной]"],
    inspectable: yes,
})


export const cupboard = combine(new Obj("буфет"), {
})


export const kitchenSink = combine(new Obj("раковина [на кухне]"), {
})


export const kitchenTable = combine(new Obj("стол [на кухне]"), {
})


export const fridge = combine(new Obj("холодильник"), {
})



export const livingRoomDoor = new Passage("дверь в гостиную", "гостиная", "прихожая")

export const wcDoor = new Passage("дверь в туалет", "туалет", "прихожая")

export const bathroomDoor = new Passage("дверь в ванную", "ванная", "прихожая")

export const kitchenDoor = new Passage("дверь в ванную", "кухня", "прихожая")

