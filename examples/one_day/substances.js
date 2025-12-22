import {Substance} from "../../src/substance.js"
import {combine} from "../../src/functions.js"
import {yes} from "../../src/main.js"

export const temperature = {
    cold: 0,
    warm: 1,
    hot: 2,
}

combine(new Substance(["вода", "воды", ""]), {
    liquid: yes,
})
combine(new Substance(["соль для ванн", "соли для ванн", ""]), {
})
combine(new Substance(["зубная паста", "зубной пасты", ""]), {
    liquid: yes,
})
combine(new Substance(["гель для душа", "геля для душа", ""]), {
    liquid: yes,
})
combine(new Substance(["шампунь", "шампуня", ""]), {
    liquid: yes,
})
combine(new Substance(["средство для мытья сантехники", "средства для мытья сантехники", ""]), {
    liquid: yes,
})
combine(new Substance(["средство для мытья унитазов", "средства для мытья унитазов", ""]), {
    liquid: yes,
})
combine(new Substance(["стиральный порошок", "стирального порошка", ""]), {
})