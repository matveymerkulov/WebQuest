import {clearConsole, executeMenuItem, showMenu, update, write} from "./gui.js"
import {error, isArray, isClosed, isContainer, isFunction, isHidden, toArray, toString} from "./functions.js"
import {player} from "./person.js"
import {allObjects} from "./base.js"
import {loc, tran} from "./localization.js"
import {Container} from "./container.js"

export const yes = true, no = false

export const Pad = Object.freeze({
    imen: 0,
    rod: 1,
    dat: 2,
    vin: 3,
    tvor: 4,
    pred: 5
})



let actionsBefore = () => {}
export function setActionsBefore(func) {
    actionsBefore = func
}



export function declineName(object, pad = Pad.imen) {
    if(object.name === undefined || object.name === "") error(loc("NoName"))
    return decline(isFunction(object.name) ? object.name(object) : object.name, pad)
}

export function decline(text, pad = Pad.imen) {
    if(!isArray(text)) return tran(text)
    if(text.length === 2) return tran(text[pad === Pad.vin ? 1 : 0])
    return tran(text[pad] ?? text[0])
}



let menu

function operateCommand(command, parameter, prefix = "") {
    if(command.condition && !command.condition(parameter)) return
    const nodes = (prefix + toString(command.text)).split("/")
    let level = menu
    for(let i = 0; i < nodes.length; i++) {
        const node = tran(nodes[i])
        if(i === nodes.length - 1) {
            if(level[node] !== undefined) {
                error(loc("commandExists") + nodes + '".')
            }
            level[node] = [command, parameter]
        } else {
            if(level[node] === undefined) {
                level[node] = {}
            }
            level = level[node]
        }
    }
}


export const objectsStack = []
export function currentContainer() {
    if(objectsStack.length > 0) return objectsStack[objectsStack.length - 1]
    return player.location
}

function operateCommands(object, prefix = "") {
    if(isHidden(object)) return

    if(object.inspect !== undefined) {
        operateCommand({
            text: "осмотреть~inspect",
            execution: (object) => {
                write(toString(object.inspect))
            }
        }, object, prefix)
    }

    if(object.getCommands) {
        for(let command of object.getCommands()) {
            operateCommand(command, object, prefix)
        }
    }

    for(let command of toArray(object.commands)) {
        operateCommand(command, object, prefix)
    }

    if(isClosed(object)) return

    if(object.inspectable) {
        operateCommand({
            text: "осмотреть~inspect",
            execution: (object) => {
                objectsStack.push(object)
            }
        }, object, prefix)
    }

    if(object.objects) {
        for(let childObject of object.objects) {
            operateCommands(childObject, declineName(childObject, Pad.vin) + "/")
        }
    }
}



export function updateCommands() {
    actionsBefore()

    const location = player.location

    menu = {}

    operateCommand({
        text: "вернуться",
        execution: () => {
            objectsStack.pop()
        }
    }, undefined)

    operateCommands(location)

    for(let object of player.inventory) {
        operateCommands(object, declineName(object) + "/")
    }
    for(let object of player.clothes) {
        operateCommands(object, declineName(object, Pad.vin) + "/")
    }
}

export function executeCommand(text) {
    for(const [item, node] of Object.entries(menu)) {
        if(text === item) {
            if(isArray(node)) {
                executeMenuItem(node)
                return
            }
            showMenu(node)
            return
        }
    }
}

export function movePlayerTo(exit) {
    player.location = allObjects.get(exit)
    objectsStack.clear()
    clearConsole()
    update()
}



export function parseText(text) {
    let begin = 0, link = false, newText = "", locale = 0
    text = tran(text)
    for(let index = 0; index < text.length; index++) {
        const symbol = text.charAt(index)
        if(symbol === "*") {
            if(link) {
                const part = text.substring(begin, index).split("=")
                let exit = ""
                if(part.length > 1) {
                    exit = part[1]
                    if(exit === "") exit = part[0]
                    exit = ` exit="${exit}"`
                }
                newText += `<span class="link"${exit}>${part[0]}</span>`
            } else {
                newText += text.substring(begin, index)
            }
            begin = index + 1
            link = !link
        } else if(symbol === "\n") {
            newText += text.substring(begin, index) + "<p>"
            begin = index + 1
        } else if(symbol === "~") {
            locale++
        }
    }
    newText = newText.concat(text.substring(begin))
    return newText
}



export function objectsText(object) {
    if(object.objects === undefined) return ""
    let text = ""
    for(let childObject of object.objects) {
        if(isHidden(childObject)) continue
        if(childObject.constructor !== Container) {
            let container = childObject.container
            let inside = container?.inside
            if(isContainer(container)) inside = container.name
            inside = inside === undefined ? "" : ` (${tran(inside)})`
            text += `, <span class="link">${declineName(childObject, Pad.vin)}</span>${inside}`
        }
        if(isClosed(childObject)) continue
        if(childObject.inspectable) continue
        text += objectsText(childObject)
    }
    return text
}



export function personInfoText(array, prefix, pad = Pad.imen) {
    let text = ""
    for(let object of array) {
        text += `${text === "" ? "" : ", "}<span class="link">${declineName(object, pad)}</span>`
    }
    return text === "" ? "" : prefix + text
}