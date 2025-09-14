import {yes, no} from "../../src/main.js"
import {write} from "../../src/gui.js"
import {player} from "../../src/person.js"
import {stable, attic} from "./locations.js"
import {Item} from "../../src/item.js"
import {Cloth} from "../../src/cloth.js"

export const torch = Object.assign(new Item("факел"), {
    lit: no,

    name: () => `${torch.lit ? "горящий " : ""}факел~${torch.lit ? "burning " : ""}torch`,
    description: "Небольшой факел, совершенно обыкновенный на вид.~A small torch, completely ordinary in appearance.",
    commands: [
        {
            text: "погасить~extinguish",
            condition: () => torch.lit,
            execution: () => {
                torch.lit = no
                write("OК, он сразу же погас.~OK, it went out immediately.")
            }
        }, {
            text: "зажечь~lit",
            condition: () => !torch.lit,
            execution: () => {
                torch.lit = yes
                write("OK, now the torch is burning.")
            }
        }
    ]
})


export const chips = Object.assign(new Item("щепки"), {
    name: "деревянные щепки~wood chips"
})


export const diamond = Object.assign(new Item("алмаз"), {
    name: "алмаз~diamond",
    description: "Что за подозрения?! Он настоящий. Скорей бери его и покончим с этим делом!" +
        "~What are you suspicious of?! It's real. Hurry up and take it, and let's finish this!"
})


export const blanket = Object.assign(new Cloth("плед"), {
    name: "шерстяной плед~woolen blanket",
    description: "Красивый плед, выглядит как из французской шерсти." +
        "~A beautiful blanket; it looks like it's made of French wool.",
})


export const box = Object.assign(new Item("шкатулка"), {
    name: ["деревянная шкатулка~wooden box", "деревянную шкатулку~wooden box"],
    commands: [
        {
            text: "осмотреть~inspect",
            execution: "Она достаточно прочна.~It's quite sturdy."
        }, {
            text: "открыть~open",
            execution: "Несмотря ни на какие усилия, открыть ее не удаётся!~Despite all efforts, it cannot be opened!"
        }, {
            text: "отпереть~unlock/бронзовым ключом~with the bronze key",
            condition: () => player.has(key),
            execution: "Ключ к шкатулке нe подходит.~The key doesn't fit the box."
        }, {
            text: "швырнуть вниз~throw down",
            condition: () => player.isIn(attic),
            execution: () => {
                write("Вот это бросок!!! От удара шкатулка разбилась. Что-то из нее выпало и" +
                    ", блеснув, покатилось по полу конюшни." +
                    "~What a throw!!! The box shattered from the impact. Something fell out of it and, flashing, " +
                    "rolled across the stable floor.")
                player.destroy(box)
                stable.add(chips, diamond)
            }
        }
    ]
})


export const key = Object.assign(new Item("ключ"), {
    name: "бронзовый ключ~bronze key",
})


export const shovel = Object.assign(new Item("лопата"), {
    name: ["короткая лопата~short shovel", "короткую лопату~short shovel"],
})