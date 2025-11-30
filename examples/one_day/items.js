import {combine} from "../../src/functions.js"
import {Container} from "../../src/container.js"
import {Item} from "../../src/item.js"

export const laptop = combine(new Item("ноутбук"), {
})

export const pillow = combine(new Item("подушка"), {
    name: ["подушка", "подушку"]
})

export const sheet = combine(new Item("простыня"), {
    name: ["простыня", "простыню"]
})

export const blanket = combine(new Item("одеяло"), {
})

export const flippers = combine(new Item("тапочки"), {
})

export const socks = combine(new Item("носки"), {
})

export const boots = combine(new Item("ботинки"), {
})

export const suit = combine(new Item("пиджак"), {
})

export const shirt = combine(new Item("рубашка"), {
    name: ["рубашка", "рубашку"]
})

export const trousers = combine(new Item("брюки"), {
})