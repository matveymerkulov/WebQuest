// noinspection NonAsciiCharacters

import {да, локация, неЗадан, нет, объект, предмет} from "./main.js"

Object.defineProperty(Array.prototype, "размер", {
    get: function myProperty() {
        return this.length
    }
})
Array.prototype.содержит = Array.prototype.содержат = Array.prototype.includes

Array.prototype.добавить = Array.prototype.push
Array.prototype.удалить = function(элемент) {
    const индекс = this.indexOf(элемент, 0);
    if (индекс > -1) {
        this.splice(индекс, 1);
    }
}

Object.defineProperty(String.prototype, "длина", {
    get: function myProperty() {
        return this.length
    }
})
String.prototype.символ = String.prototype.charAt
String.prototype.добавить = String.prototype.concat
String.prototype.часть = String.prototype.substring
String.prototype.разбить = String.prototype.split


export function ключи(...объекты) {
    const массив = []
    for(const объ of объекты) {
        for(const значение of Object.keys(объ)) {
            массив.добавить(значение)
        }
    }
    return массив
}
export function значения(...объекты) {
    if(объекты.размер === 1) {
        return Object.values(объекты[0])
    }
    const массив = []
    for(const объ of объекты) {
        for(const значение of Object.values(объ)) {
            массив.добавить(значение)
        }
    }
    return массив
}
export function пары(...объекты) {
    const массив = []
    for(const объ of объекты) {
        for(const значение of Object.entries(объ)) {
            массив.добавить(значение)
        }
    }
    return массив
}

export const этоМассив = (объ) => Array.isArray(объ)
export const этоСтрока = (объ) => typeof объ === "string"
export const этоФункция = (объ) => typeof объ === "function"


export function вМассив(объ, параметр = неЗадан) {
    if(объ === неЗадан) return []
    if(этоМассив(объ)) return объ
    if(этоФункция(объ)) return объ(параметр)
    return [объ]
}

export function вСтроку(объ, параметр = неЗадан) {
    if(этоСтрока(объ)) return объ
    if(этоФункция(объ)) return объ(параметр)
    return ""
}

export function вЗначение(объ, параметр = неЗадан) {
    if(этоФункция(объ)) return объ(параметр)
    return объ
}


export function скрыт(объ) {
    for(const параметр of ["скрыт", "скрыта", "скрыто", "скрыты"]) {
        if(вЗначение(объ[параметр], объ) === да) return да
    }
    return нет
}

export function закрыт(объ) {
    for(const параметр of ["закрыт", "закрыта", "закрыто", "закрыты"]) {
        if(вЗначение(объ[параметр], объ) === да) return да
    }
    return нет
}