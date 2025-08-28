// noinspection NonAsciiCharacters

import {локация, неЗадан, объект, предмет} from "./main.js"


Array.prototype.размер = Array.prototype.length
Array.prototype.содержит = Array.prototype.содержат = Array.prototype.includes
Array.prototype.добавить = Array.prototype.push
Array.prototype.удалить = function(...элемент) {
    const индекс = this.indexOf(элемент, 0);
    if (индекс > -1) {
        this.splice(индекс, 1);
    }
}


String.prototype.длина = String.prototype.length
String.prototype.символ = String.prototype.charAt
String.prototype.добавить = String.prototype.concat
String.prototype.часть = String.prototype.substring
String.prototype.разбить = String.prototype.split


export const значения = (...объ) => [].concat(...Object.values(...объ))
export const этоМассив = (объ) => Array.isArray(объ)


export function вМассив(объ) {
    if(объ === undefined) return []
    if(этоМассив(объ)) return объ
    return [объ]
}

export function вСтроку(строка, объ) {
    if(typeof строка === "string") return строка
    if(typeof строка === "function") return строка(объ)
    return ""
}