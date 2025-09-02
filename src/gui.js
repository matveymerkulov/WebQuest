// noinspection NonAsciiCharacters

import {выполнитьКоманду, обновитьКоманды, Падеж, персонаж, просклонять} from "./main.js"
import {вСтроку, этоМассив} from "./functions.js"
import {инициализация} from "./init.js"

let x, y


document.addEventListener("DOMContentLoaded", () => {
    инициализация()

    document.body.addEventListener("mousemove", event => {
        x = event.clientX
        y = event.clientY
    })
})



function парситьТекст(текст) {
    let начало = 0, ссылка = false, новыйТекст = ""
    for(let индекс = 0; индекс < текст.length; индекс++) {
        const символ = текст.charAt(индекс)
        if(символ === "*") {
            if(ссылка) {
                новыйТекст = новыйТекст.добавить('<span class="link">' + текст.часть(начало, индекс) + '</span>')
            } else {
                новыйТекст = новыйТекст.добавить(текст.часть(начало, индекс))
            }
            начало = индекс + 1
            ссылка = !ссылка
        } else if(символ === "\n") {
            новыйТекст = новыйТекст.добавить(текст.часть(начало, индекс), "<p>")
            начало = индекс + 1
        }
    }
    новыйТекст = новыйТекст.добавить(текст.часть(начало))
    return новыйТекст
}



const consoleElement = document.getElementById("console")
const imageElement = document.getElementById("image")
const descriptionElement = document.getElementById("description")

export function обновить() {
    const лок = персонаж.игрок.локация

    let текст = ""

    for(let объ of лок.объекты) {
        if(объ.скрыт) continue
        текст += `${текст === "" ? "" : ", "}<span class="link">${просклонять(объ.название, Падеж.винительный)}</span>`
    }

    if(текст !== "") текст = "<p>Вы видите " + текст

    descriptionElement.innerHTML = парситьТекст(вСтроку(лок.описание, лок)) + текст

    const imageFile = вСтроку(лок.изображение, лок)
    if(imageElement) {
        if(imageFile === "") {
            imageElement.hidden = true
        } else {
            imageElement.hidden = false
            imageElement.src = "images/" + imageFile
        }
    }

    for(const element of document.getElementsByClassName("link")) {
        element.addEventListener("click", event => {
            выполнитьКоманду(event.target.innerHTML)
        })
    }

    обновитьКоманды()
}


const menuContainer = document.getElementById("menus")

export function показатьМеню(menuNode) {
    const layer = document.createElement("div")
    layer.className = "layer"
    layer.addEventListener("click", event => {
        menuContainer.removeChild(document.body.lastChild)
        menuContainer.removeChild(document.body.lastChild)
    })

    const menu = document.createElement("div")
    menu.className = "menu"
    menu.style.left = x + "px"
    menu.style.top = y + "px"
    for(const [key, value] of Object.entries(menuNode)) {
        const div = document.createElement("div")
        div.className = "menu_item"
        div.innerHTML = key
        div.menuNode = value
        div.addEventListener("click", event => {
            const menuNode = event.target.menuNode
            if(Array.isArray(menuNode)) {
                menuNode[0].выполнение(menuNode[1])
                скрытьМеню()
            } else {
                показатьМеню(menuNode)
            }
        })
        menu.appendChild(div)
    }
    menuContainer.appendChild(layer)
    menuContainer.appendChild(menu)
}

function скрытьМеню() {
    menuContainer.textContent = ""
}

export function написать(текст) {
    if(consoleElement.innerHTML.length > 0) consoleElement.innerHTML += "<p>"
    consoleElement.innerHTML += парситьТекст(текст)
}

export function конец(текст) {

}