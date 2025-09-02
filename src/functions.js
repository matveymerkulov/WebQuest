// noinspection NonAsciiCharacters

import {локация, неЗадан, объект, предмет} from "./main.js"

Object.defineProperty(Array.prototype, "размер", {
    get: function myProperty() {
        return this.length
    }
})
Array.prototype.содержит = Array.prototype.содержат = Array.prototype.includes

Array.prototype.добавить = Array.prototype.push
Array.prototype.удалить = function(...элемент) {
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


export const ключи = (...объ) => [].concat(...Object.keys(...объ))
export const значения = (...объ) => [].concat(...Object.values(...объ))
export const пары = (...объ) => [].concat(...Object.entries(...объ))

export const этоМассив = (объ) => Array.isArray(объ)
export const этоСтрока = (объ) => typeof объ === "string"
export const этоФункция = (объ) => typeof объ === "function"


export function вМассив(объ, параметр = неЗадан) {
    if(объ === неЗадан) return []
    if(этоМассив(объ)) return объ
    if(этоФункция(объ)) return объ(параметр)
    return [объ]
}

export function вСтроку(объ, параметр) {
    if(этоСтрока(объ)) return объ
    if(этоФункция(объ)) return объ(параметр)
    return ""
}