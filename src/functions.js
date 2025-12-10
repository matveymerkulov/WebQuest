import {Container} from "./container.js"

export const isArray = (object) => Array.isArray(object)
export const isString = (object) => typeof object === "string"
export const isFunction = (object) => typeof object === "function"


export function isContainer(object) {
    if(object === undefined) return false
    return object.constructor === Container
}

export function toArray(object, parent = undefined) {
    if(object === undefined) return []
    if(isArray(object)) return object
    if(isFunction(object)) return object.call(undefined, parent)
    return [object]
}

export function toString(object, parent = undefined) {
    if(isString(object)) return object
    if(isFunction(object)) return object.call(undefined, parent)
    return ""
}

export function toValue(object, parent = undefined) {
    if(isFunction(object)) return object.call(undefined, parent)
    return object
}


export function combine(...parts) {
    const object = Object.assign(...parts)
    const commands = []
    for(let i = 1; i < parts.length; i++){
        const part = parts[i]
        if(!isArray(part.commands)) continue
        commands.push(...part.commands)
    }
    object.commands = commands
    return object
}


export function isHidden(object) {
    return toValue(object.isHidden, object)
}

export function isClosed(object) {
    return toValue(object.isClosed, object)
}



export function removeFromArray(array, element) {
    const index = array.indexOf(element, 0);
    if (index > -1) {
        array.splice(index, 1);
    }
}


export function rndi(from, to) {
    return Math.floor(Math.random() * (to - from) + from)
}


export function error(text) {
    console.error(text)
}