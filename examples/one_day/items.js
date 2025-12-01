import {combine} from "../../src/functions.js"
import {Container} from "../../src/container.js"
import {Item} from "../../src/item.js"

export const laptop = combine(new Item("ноутбук"), {
})

export const pillow = combine(new Item(["подушка", "подушку"]), {
})

export const sheet = combine(new Item(["простыня", "простыню"]), {
})

export const blanket = combine(new Item("одеяло"), {
})

export const deodorant = combine(new Item("дезодорант"), {
})

export const soap = combine(new Item("мыло"), {
})

export const glass = combine(new Item("стакан [в ванной]"), {
})

export const toothbrush = combine(new Item("зубная щётка"), {
})