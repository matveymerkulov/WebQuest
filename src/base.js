export const allObjects = new Map()

export class BaseObject {
    constructor(name) {
        allObjects.set(name, this)
        const i = name.indexOf("[")
        if(i >= 0) {
            name = name.substring(0, i).trim()
        }
        this.name = name
    }

    init() {
    }
}