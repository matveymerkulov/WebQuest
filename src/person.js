import {write, update, clearConsole} from "./gui.js"
import {Obj} from "./object.js"
import {allObjects} from "./base.js"
import {removeFromArray} from "./functions.js"
import {clearContainerStack, containerStack} from "./main.js"


function addToPersonArray(person, array, item) {
    if(array.includes(item)) return
    if(item.container !== undefined) removeFromArray(item.container.objects, item)
    removeFromArray(person.location.objects, item)
    array.push(item)
}

function removeFromPersonArray(person, array, item, container) {
    if(!array.includes(item)) return
    removeFromArray(array, item)
    container.objects.push(item)
    item.container = container
}

export class Person extends Obj {
    inventory = []
    maxItems
    clothes = []
    location

    moveTo(location) {
        this.location = location
        clearContainerStack()
        clearConsole()
    }

    isIn(location) {
        return this.location === location
    }

    has(item) {
        function containerHasItem(container, item) {
            for (let childItem of container) {
                if(childItem === item) return true
                if(childItem.objects === undefined) continue
                const has = containerHasItem(childItem.objects, item)
                if(has) return true
            }
            return false
        }
        return containerHasItem(this.inventory, item)
    }

    take(item, container = undefined){
        removeFromArray(this.clothes, item)
        const max = this.maxItems
        if(max >= 0 && this.inventory.length >= max) {
            write("Вы не можете нести больше предметов.")
            return
        }
        addToPersonArray(this, container === undefined ? this.inventory : container.objects, item)
        item.container = container === undefined ? undefined : container
    }

    drop(item, container) {
        removeFromPersonArray(this, this.inventory, item, container)
    }

    wears(item) {
        return this.clothes.includes(item)
    }

    putOn(item){
        removeFromArray(this.inventory, item)
        addToPersonArray(this, this.clothes, item)
    }

    putOff(item, container) {
        removeFromPersonArray(this, this.clothes, item, container)
    }

    destroy(item) {
        removeFromArray(this.inventory, item)
        removeFromArray(this.clothes, item)
    }
}

export const player = new Person("игрок")