import {combine} from "../../src/functions.js"
import {Container} from "../../src/container.js"
import {Location} from "../../src/location.js"
import {Passage} from "../../src/passage.js"

export const onLivingRoomFloor = combine(new Container("на полу [в гостиной]"), {
})

export const livingRoom = combine(new Location("гостиная"), {
    description: "Это жилая комната.",
    objects: ["шкаф", "кровать", "стол [в гостиной]", "на полу [в гостиной]"]
})


export const onHallwayFloor = combine(new Container("на полу [в прихожей]"), {
})

export const hallway = combine(new Location("прихожая"), {
    description: "Вы находитесь в прихожей.",
    objects: ["дверь в подъезд", "шкафчик для обуви", "коврик для ног", "зеркало [в прихожей]", "на полу [в прихожей]"]
})


export const onWcFloor = combine(new Container("на полу [в туалете]"), {
})

export const wc = combine(new Location("туалет"), {
    description: "Вы находитесь в туалете.",
    objects: ["унитаз", "шкафчик [в туалете]", "на полу [в туалете]"]
})


export const onBathroomFloor = combine(new Container("на полу [в ванной]"), {
})

export const bathroom = combine(new Location("ванная"), {
    description: "Вы зашли в ванную комнату.",
    objects: ["ванна", "раковина [в ванной]", "шкафчик [в ванной]", "вешалка", "зеркало [в ванной]", "на полу [в ванной]"]
})


export const onKitchenFloor = combine(new Container("на полу [на кухне]"), {
})

export const kitchen = combine(new Location("кухня"), {
    description: "Вы находитесь в небольшой кухне.",
    objects: ["буфет", "раковина [на кухне]", "стол [на кухне]", "холодильник", "на полу [на кухне]"]
})




