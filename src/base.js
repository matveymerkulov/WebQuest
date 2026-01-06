import {error, isArray} from "./functions.js"

export const allObjects = new Map()

export class BaseObject {
    constructor(name) {
        if(isArray(name)) {
            this.id = name[0]
            for(let i = 0; i < name.length; i++) {
                name[i] = removeNumber(name[i])
            }
            this.name = name
        } else {
            this.id = name
            this.name = removeNumber(name)
        }
        this.initialName = this.name

        if(allObjects.has(this.id)) {
            let number = 2
            while(allObjects.has(this.id + "#" + number)) {
                number++
            }
        } else {
            allObjects.set(this.id, this)
        }
    }

    getCommands() {
        return []
    }

    init() {
    }
}

export function removeNumber(name) {
    const i = name.indexOf("#")
    if(i >= 0) {
        return name.substring(0, i)
    }
    return name
}