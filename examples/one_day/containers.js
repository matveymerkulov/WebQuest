import {combine, rnd} from "../../src/functions.js"
import {Item} from "../../src/item.js"


combine(new Item("стакан [в ванной]"), {
    inspectable: true,
    objects: ["зубная щётка"],
    inside: "в стакане",
    put: "в стакан",
    containerVolume: 200,
})

combine(new Item(["банка соли для ванн", "банку соли для ванн"]), {
    containerVolume: 1800,
    substance: "соль",
    substanceVolume: rnd(100, 1800),
})

combine(new Item(["тюбик зубной пасты"]), {
    containerVolume: 140,
    substance: "зубная паста",
    substanceVolume: rnd(40, 140),
})

combine(new Item(["флакон геля для душа"]), {
    containerVolume: 250,
    substance: "гель для душа",
    substanceVolume: rnd(50, 250),
})

combine(new Item("флакон шампуня"), {
    containerVolume: 800,
    substance: "шампунь",
    substanceVolume: rnd(50, 800),
})

combine(new Item(["бутылка средства для мытья сантехники", "бутылку средства для мытья сантехники"]), {
    containerVolume: 500,
    substance: "средство для мытья сантехники",
    substanceVolume: rnd(50, 500),
})

combine(new Item(["бутылка средства для мытья унитазов", "бутылку средства для мытья унитазов"]), {
    containerVolume: 500,
    substance: "средство для мытья унитазов",
    substanceVolume: rnd(50, 500),
})

combine(new Item("пакет стирального порошка"), {
    containerVolume: 1500,
    substance: "стиральный порошок",
    substanceVolume: rnd(50, 1500),
})

combine(new Item("стаканчик"), {
    containerVolume: 100,
})