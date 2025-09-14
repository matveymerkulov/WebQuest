import {error} from "./functions.js"

export function getRussianSystemLocale() {
    return {
        commandExists: 'В меню уже есть команда "',
        object: 'Объект "',
        isNotFound: '" не найден!',
        youHave: "У вас с собой ",
        youWear: "На вас надет ",
        youSee: "Вы видите ",
        location: 'Локация "',
        isNotFoundW: " не найдена!",
        locString: 'Локализационная строка "',

        take: "взять",
        drop: "положить",
        putOff: "снять",
        putOn: "надеть",
    }
}

export function getEnglishSystemLocale() {
    return {
        commandExists: 'Menu already has command "',
        object: 'Object "',
        isNotFound: '" not found!',
        youHave: "You have ",
        youWear: "You wear ",
        youSee: "You see ",
        location: 'Location "',
        isNotFoundW: " not found!",
        locString: 'Localization string "',

        take: "take",
        drop: "drop",
        putOff: "put off",
        putOn: "put on",
    }
}


let locale = {}, localesList = [], currentLocale = 0
export let currentLocaleIndex = 0
export function setLocale(name, strings, setAsCurrent) {
    if(setAsCurrent) {
        currentLocale = strings
        currentLocaleIndex = localesList.length
    }
    locale[name] = strings
    localesList.push(strings)
}

export function loc(string) {
    if(!currentLocale.hasOwnProperty(string)) {
        error(loc('locString') + string + loc('isNotFound'))
        return ""
    }
    return currentLocale[string]
}

export function tran(text) {
    const parts = text.split("~")
    return parts[parts.length <= currentLocaleIndex ? 0 : currentLocaleIndex]
}