import {isArray} from "./functions.js"

export const allObjects = new Map()

export class BaseObject {
    constructor(name) {
        if(isArray(name)) {
            allObjects.set(name[0], this)
            for(let i = 0; i < name.length; i++) {
                name[i] = removeBrackets(name[i])
            }
            this.name = name
        } else {
            allObjects.set(name, this)
            this.name = removeBrackets(name)
        }
        this.initialName = this.name
    }

    init() {
    }
}

function removeBrackets(name) {
    const i = name.indexOf("[")
    if(i >= 0) {
        return name.substring(0, i).trim()
    }
    return name
}