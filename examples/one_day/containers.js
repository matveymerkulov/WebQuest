import {combine} from "../../src/functions.js"
import {Item} from "../../src/item.js"


combine(new Item("стакан [в ванной]"), {
    inspectable: true,
    objects: ["зубная щётка"],
    inside: "в стакане",
    put: "в стакан",
    containerVolume: 200,
})

combine(new Item("банка соли для ванн"), {
    containerVolume: 1800,
    substance: "соль",
    substanceVolume: 1100,
})

combine(new Item(["тюбик зубной пасты"]), {
    containerVolume: 140,
    substance: "зубная паста",
    substanceVolume: 80,
})

combine(new Item(["флакон геля для душа"]), {
    containerVolume: 250,
    substance: "гель для душа",
    substanceVolume: 230,
})

combine(new Item("флакон шампуня"), {
    containerVolume: 800,
    substance: "шампунь",
    substanceVolume: 90,
})

combine(new Item("бутылка средства для мытья сантехники"), {
    containerVolume: 500,
    substance: "средство для мытья сантехники",
    substanceVolume: 300,
})

combine(new Item("бутылка средства для мытья унитазов"), {
    containerVolume: 500,
    substance: "средство для мытья унитазов",
    substanceVolume: 300,
})

combine(new Item("пакет стирального порошка"), {
    containerVolume: 1500,
    substance: "стиральный порошок",
    substanceVolume: 600,
})

combine(new Item("стаканчик"), {
    containerVolume: 100,
})