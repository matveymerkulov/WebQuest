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

function createTrousers() {
    return combine(new Cloth("брюки"), {
        inspectable: true,
        put: "в карман брюк",
        inside: "в кармане брюк",
    })
}

export const trousersID = createTrousers().id
export const trousers2ID = createTrousers().add("ключи").id

combine(new Cloth(["куртка", "куртку"]), {
})

combine(new Cloth(["кепка", "кепку"]), {
})