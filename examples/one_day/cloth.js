import {combine} from "../../src/functions.js"
import {Item} from "../../src/item.js"
import {Cloth} from "../../src/cloth.js"

export const flippers = combine(new Cloth("тапочки"), {
})

export const socks = combine(new Cloth("носки"), {
})

export const boots = combine(new Cloth("ботинки"), {
})

export const jacket = combine(new Cloth("пиджак"), {
})

export const shirt = combine(new Cloth("рубашка"), {
    name: ["рубашка", "рубашку"]
})

export const trousers = combine(new Cloth("брюки"), {
})