// noinspection NonAsciiCharacters

export const всеОбъекты = new Map()

export class БазовыйОбъект {
    constructor(имя) {
        всеОбъекты.set(имя, this)
    }

    инициализировать() {
    }
}