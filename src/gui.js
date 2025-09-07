// noinspection NonAsciiCharacters

import {выполнитьКоманду, обновитьКоманды, объект, Падеж, персонаж, просклонять, просклонятьНазвание} from "./main.js"
import {вЗначение, вСтроку, закрыт, скрыт, этоМассив} from "./functions.js"
import {инициализация} from "./init.js"
import {игрок} from "../examples/farm/main.js"

let portrait
const mainElement = document.getElementById("main")
const descriptionElement = document.getElementById("description")
const columnElement = document.getElementById("column")
const imageDiv1 = document.getElementById("image_div_1")
const imageDiv3 = document.getElementById("image_div_3")
const imageElement = new Image()
const consoleElement = document.getElementById("console")

function applyOrientation() {
    portrait = document.body.offsetWidth / document.body.offsetHeight < 1
    if(portrait) {
        columnElement.insertBefore(descriptionElement, consoleElement)
    } else {
        mainElement.insertBefore(descriptionElement, columnElement)
    }
}


let x, y

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("mousemove", event => {
        x = event.clientX
        y = event.clientY
    })

    document.body.onresize = function() {
        applyOrientation()
        обновить()
    }

    applyOrientation()
    инициализация()
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



function текстОбъектов(объ) {
    let объекты = ""
    for(let вложенныйОбъект of объ.объекты) {
        if(скрыт(вложенныйОбъект)) continue
        объекты += `, <span class="link">${просклонятьНазвание(вложенныйОбъект, Падеж.винительный)}</span>`
        if(закрыт(вложенныйОбъект)) continue
        объекты += текстОбъектов(вложенныйОбъект)
    }
    return объекты
}


export function обновить() {
    обновитьКоманды()

    const лок = персонаж.игрок.локация

    let объекты = текстОбъектов(лок)
    if(объекты !== "") объекты = "<p>Вы видите " + объекты.часть(2)

    let инвентарь = ""
    for(let объ of игрок.инвентарь) {
        инвентарь += `${инвентарь === "" ? "" : ", "}<span class="link">${просклонятьНазвание(объ)}</span>`
    }
    if(инвентарь !== "") инвентарь = "<p>У вас с собой " + инвентарь

    descriptionElement.innerHTML = парситьТекст(вСтроку(лок.описание, лок)) + объекты + инвентарь

    const imageFile = вСтроку(лок.изображение, лок)
    if(imageFile === "") {
        imageElement.hidden = true
    } else {
        imageElement.hidden = false
        imageElement.onload = function() {
            const maxWidth = portrait ? document.body.offsetWidth - 32
                : 0.5 * (document.body.offsetWidth - 48)
            const maxHeight = portrait ? 0.3 * (document.body.offsetHeight - 48)
                : 0.5 * (document.body.offsetHeight - 32)
            const scale = Math.min(maxWidth / imageElement.naturalWidth
                , maxHeight / imageElement.naturalHeight)
            imageDiv1.style.height = (scale * imageElement.naturalHeight) + "px"
        }
        imageElement.src = "images/" + imageFile
        imageDiv1.style.backgroundImage = `url("${imageElement.src}")`
        imageDiv3.style.backgroundImage = `url("${imageElement.src}")`
    }


    for(const element of document.getElementsByClassName("link")) {
        element.addEventListener("click", event => {
            выполнитьКоманду(event.target.innerHTML)
        })
    }
}


const menuContainer = document.getElementById("menus")

export function выполнитьПунктМеню(menuNode) {
    const command = menuNode[0].выполнение
    const obj = menuNode[1]
    if(typeof command === "string") {
        написать(command)
    } else {
        command(obj)
    }
    скрытьМеню()
    обновить()
}

export function показатьМеню(menuNode) {
    const layer = document.createElement("div")
    layer.className = "layer"
    layer.addEventListener("click", event => {
        menuContainer.removeChild(menuContainer.lastChild)
        menuContainer.removeChild(menuContainer.lastChild)
    })

    const menu = document.createElement("div")
    menu.className = "menu"
    for(const [key, value] of Object.entries(menuNode)) {
        const div = document.createElement("div")
        div.className = "menu_item"
        div.innerHTML = key
        div["menuNode"] = value
        div.addEventListener("click", event => {
            const menuNode = event.target["menuNode"]
            if(Array.isArray(menuNode)) {
                выполнитьПунктМеню(menuNode)
            } else {
                показатьМеню(menuNode)
            }
        })
        menu.appendChild(div)
    }

    menu.style.visibility = "hidden"
    menu.style.left = "0px"
    menu.style.top = "0px"

    menuContainer.appendChild(layer)
    menuContainer.appendChild(menu)

    menu.style.left = Math.max(8, Math.min(x, window.innerWidth - menu.offsetWidth - 8)) + "px"
    menu.style.top = Math.max(8, Math.min(y + 6, window.innerHeight - menu.offsetHeight - 8)) + "px"
    menu.style.visibility = "visible"
}

function скрытьМеню() {
    menuContainer.textContent = ""
}

export function очиститьКонсоль() {
    consoleElement.textContent = ""
}

export function написать(текст) {
    if(consoleElement.innerHTML.length > 0) consoleElement.innerHTML += "<p>"
    consoleElement.innerHTML += парситьТекст(текст)
}

export function сброс() {
    window.location.reload();
}