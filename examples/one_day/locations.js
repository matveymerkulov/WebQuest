import {combine} from "../../src/functions.js"
import {Container} from "../../src/container.js"
import {Location} from "../../src/location.js"
import {bathroomHanger, bathroomHanger2, bathroomMirror, bathroomShelf, bathroomSink, hallwayHanger, hallwayMirror, kitchenSink, kitchenTable, livingRoomTable, toiletShelf} from "./objects.js"


combine(new Location("гостиная"), {
    description: "Это жилая комната.",
    objects: [
        "шкаф",
        "кровать",
        livingRoomTable.id,
        combine(new Container("на полу"), {
            put: "на пол",
        }).id,
    ]
})



combine(new Location("прихожая"), {
    description: "Вы находитесь в прихожей.",
    objects: [
        "дверь в подъезд",
        "шкафчик для обуви",
        "коврик для ног",
        hallwayMirror.id,
        hallwayHanger.id,
        "полка для шапок",
        combine(new Container("на полу"), {
            put: "на пол",
        }).id,
    ]
})



combine(new Location("туалет"), {
    description: "Вы находитесь в туалете.",
    objects: [
        "унитаз",
        "бачок",
        toiletShelf.id,
        combine(new Container("на полу"), {
            put: "на пол",
        }).id,
    ]
})


combine(new Location("ванная"), {
    description: "Вы зашли в ванную комнату.",
    objects: ["ванна",
        bathroomSink.id,
        bathroomShelf.id,
        bathroomHanger.id,
        bathroomMirror.id,
        "стиральная машина",
        bathroomHanger2.id,
        combine(new Container("на полу"), {
            put: "на пол",
        }).id,
    ]
})


combine(new Location("кухня"), {
    description: "Вы находитесь на небольшой кухне.",
    objects: [
        "буфет",
        kitchenSink.id,
        kitchenTable.id,
        "холодильник",
        combine(new Container("на полу"), {
            put: "на пол",
        }).id,
    ]
})




