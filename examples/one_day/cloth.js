import {combine} from "../../src/functions.js"
import {Item} from "../../src/item.js"
import {Cloth} from "../../src/cloth.js"

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

combine(new Cloth("брюки"), {
})

combine(new Cloth(["куртка", "куртку"]), {
})

combine(new Cloth(["кепка", "кепку"]), {
})