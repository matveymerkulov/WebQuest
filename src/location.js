// noinspection NonAsciiCharacters

import {Контейнер} from "./container.js"
import {вМассив} from "./functions.js"
import {всеОбъекты} from "./base.js"

export class Локация extends Контейнер {
    инициализировать() {
        super.инициализировать()
        this.команды = вМассив(this.команды)

        const массив = []
        for(let выход of вМассив(this.выходы)) {
            массив.добавить([выход[0], всеОбъекты.get(выход[1])])
        }
        this.выходы = массив
    }
}