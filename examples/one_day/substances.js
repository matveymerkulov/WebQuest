import {Substance} from "../../src/substance.js"
import {combine} from "../../src/functions.js"

combine(new Substance(["вода", "воды", ""]), {
    move: "залить",
})
combine(new Substance(["соль для ванн", "соли для ванн", ""]), {
    move: "засыпать",
})
combine(new Substance(["зубная паста", "зубной пасты", ""]), {
    move: "залить",
})
combine(new Substance(["гель для душа", "геля для душа", ""]), {
    move: "залить",
})
combine(new Substance(["шампунь", "шампуня", ""]), {
    move: "залить",
})
combine(new Substance(["средство для мытья сантехники", "средства для мытья сантехники", ""]), {
    move: "залить",
})
combine(new Substance(["средство для мытья унитазов", "средства для мытья унитазов", ""]), {
    move: "залить",
})
combine(new Substance(["стиральный порошок", "стирального порошка", ""]), {
    move: "засыпать",
})