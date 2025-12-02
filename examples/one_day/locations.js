import {combine} from "../../src/functions.js"
import {Container} from "../../src/container.js"
import {Location} from "../../src/location.js"
import {Passage} from "../../src/passage.js"

combine(new Container("на полу [в гостиной]"), {
})

combine(new Location("гостиная"), {
    description: "Это жилая комната.",
    objects: ["шкаф", "кровать", "стол [в гостиной]", "на полу [в гостиной]"]
})


combine(new Container("на полу [в прихожей]"), {
})

combine(new Location("прихожая"), {
    description: "Вы находитесь в прихожей.",
    objects: ["дверь в подъезд", "шкафчик для обуви", "коврик для ног", "зеркало [в прихожей]", "вешалка [в прихожей]",
        "полка для шапок", "на полу [в прихожей]"]
})


combine(new Container("на полу [в туалете]"), {
})

combine(new Location("туалет"), {
    description: "Вы находитесь в туалете.",
    objects: ["унитаз", "шкафчик [в туалете]", "на полу [в туалете]"]
})


combine(new Container("на полу [в ванной]"), {
})

combine(new Location("ванная"), {
    description: "Вы зашли в ванную комнату.",
    objects: ["ванна", "раковина [в ванной]", "шкафчик [в ванной]", "вешалка [в ванной]", "зеркало [в ванной]",
        "стиральная машина", "на полу [в ванной]"]
})


combine(new Container("на полу [на кухне]"), {
})

combine(new Location("кухня"), {
    description: "Вы находитесь на небольшой кухне.",
    objects: ["буфет", "раковина [на кухне]", "стол [на кухне]", "холодильник", "на полу [на кухне]"]
})




