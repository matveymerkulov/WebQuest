import {combine} from "../../src/functions.js"
import {Container} from "../../src/container.js"
import {Item} from "../../src/item.js"

new Item("ноутбук")

new Item(["подушка", "подушку"])

new Item(["простыня", "простыню"])

    new Item("одеяло")

new Item("ключи")

new Item("дезодорант")

new Item("мыло")

new Item(["зубная щётка", "зубную щётку"])

new Item(["зубная паста", "зубную пасту"])

new Item(["расческа", "расческу"])

combine(new Item("стакан [в ванной]"), {
    inspectable: true,
    objects: ["зубная щётка"],
    put: "в стакан"
})

new Item("средство для мытья сантехники")

new Item("соль для ванн")

new Item("полотенце")

new Item(["мочалка", "мочалку"])

new Item(["туалетная бумага", "туалетную бумагу"])

new Item("гель для душа")

new Item("шампунь")