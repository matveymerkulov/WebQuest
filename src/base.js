import {isArray} from "./functions.js"

export const allObjects = new Map()

export class BaseObject {
    constructor(name) {
        if(isArray(name)) {
            this.id = name[0]
            for(let i = 0; i < name.length; i++) {
                name[i] = removeBrackets(name[i])
            }
            this.name = name
        } else {
            this.id = name
            this.name = removeBrackets(name)
        }
        allObjects.set(this.id, this)
        this.initialName = this.name
    }

    getCommands() {
        return []
    }

    init() {
    }
}

export function removeBrackets(name) {
    const i = name.indexOf("[")
    if(i >= 0) {
        return name.substring(0, i).trim()
    }
    return name
}