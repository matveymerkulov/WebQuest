import {combine, rndi} from "../../src/functions.js"
import {Item} from "../../src/item.js"


combine(new Item("стакан"), {
    inspectable: true,
    objects: ["зубная щётка"],
    inside: "в стакане",
    put: "в стакан",
    volume: 200,
})

combine(new Item(["банка соли для ванн", "банку соли для ванн"]), {
    volume: 1800,
    substance: "соль для ванн",
    substanceVolume: rndi(100, 1800, 100),
    inside: "в банке соли для ванн",
    put: "в банку соли для ванн",
})

combine(new Item(["тюбик зубной пасты"]), {
    volume: 140,
    substance: "зубная паста",
    substanceVolume: rndi(40, 140, 10),
    inside: "в тюбике зубной пасты",
    put: "в тюбик зубной пасты",
})

combine(new Item(["флакон геля для душа"]), {
    volume: 250,
    substance: "гель для душа",
    substanceVolume: rndi(50, 250, 10),
    inside: "в флаконе геля для душа",
    put: "в флакон геля для душа",
})

combine(new Item("флакон шампуня"), {
    volume: 800,
    substance: "шампунь",
    substanceVolume: rndi(50, 800, 50),
    inside: "в флаконе шампуня",
    put: "в флакон шампуня",
})

combine(new Item("пульверизатор для мытья сантехники"), {
    volume: 500,
    substance: "средство для мытья сантехники",
    substanceVolume: rndi(50, 500, 10),
    inside: "в пульверизаторе для мытья сантехники",
    put: "в пульверизатор для мытья сантехники",
})

combine(new Item("пульверизатор для мытья унитазов"), {
    volume: 500,
    substance: "средство для мытья унитазов",
    substanceVolume: rndi(50, 500, 10),
    inside: "в пульверизаторе для мытья унитазов",
    put: "в пульверизатор для мытья унитазов",
})

combine(new Item("пакет стирального порошка"), {
    volume: 1500,
    substance: "стиральный порошок",
    substanceVolume: rndi(50, 1500, 50),
    inside: "в пакете стирального порошка",
    put: "в пакет стирального порошка",
})

combine(new Item("стаканчик"), {
    volume: 100,
    inside: "в стаканчике",
    put: "в стаканчик",
})