import {combine} from "../../src/functions.js"
import {Item} from "../../src/item.js"
import {Cloth} from "../../src/cloth.js"
import {Container} from "../../src/container.js"

combine(new Cloth("тапочки"), {
})

combine(new Cloth("носки"), {
})

combine(new Cloth("ботинки"), {
})

combine(new Cloth("пиджак"), {
})

combine(new Cloth(["рубашка", "рубашку"]), {
})

function createTrousers(postfix) {
    postfix = " [" + postfix + "]"
    return combine(new Cloth("брюки" + postfix), {
        inspectable: true,
        put: "в карман брюк",
        inside: "в кармане брюк",
    })
}

createTrousers("1")

createTrousers("2").objects.push("ключи")

combine(new Cloth(["куртка", "куртку"]), {
})

combine(new Cloth(["кепка", "кепку"]), {
})