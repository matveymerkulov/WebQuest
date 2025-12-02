import {combine} from "../../src/functions.js"
import {Container} from "../../src/container.js"
import {Item} from "../../src/item.js"

combine(new Item("ноутбук"), {
})

combine(new Item(["подушка", "подушку"]), {
})

combine(new Item(["простыня", "простыню"]), {
})

combine(new Item("одеяло"), {
})

combine(new Item("ключи"), {
})

combine(new Item("дезодорант"), {
})

combine(new Item("мыло"), {
})

combine(new Item("зубная щётка"), {
})

combine(new Item("зубная паста"), {
})

combine(new Item("стакан [в ванной]"), {
    inspectable: true,
    objects: ["зубная щётка"],
    put: "в стакан"
})