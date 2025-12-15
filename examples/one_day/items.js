import {combine} from "../../src/functions.js"
import {Container} from "../../src/container.js"
import {Item} from "../../src/item.js"
import {yes} from "../../src/main.js"

new Item("ноутбук")

new Item(["подушка", "подушку"])

combine(new Item(["простыня", "простыню"]), {
    canBeHung: yes,
})

combine(new Item("одеяло"), {
    canBeHung: yes,
})

combine(new Item("ключи"), {
    canBeHung: yes,
})

new Item("дезодорант")

new Item("мыло")

new Item(["зубная щётка", "зубную щётку"])

new Item(["расческа", "расческу"])

combine(new Item("полотенце"), {
    canBeHung: yes,
})

combine(new Item(["мочалка", "мочалку"]), {
    canBeHung: yes,
})

new Item(["туалетная бумага", "туалетную бумагу"])

combine(new Item(["затычка", "", "", "затычку", "затычкой"]), {
    isPlug: yes,
    plugType: 0,
})
