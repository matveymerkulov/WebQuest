// noinspection NonAsciiCharacters

import {выполнитьКоманду, обновитьКоманды, Падеж, просклонять, просклонятьНазвание} from "./main.js"
import {вЗначение, вСтроку, закрыт, скрыт, этоМассив} from "./functions.js"
import {игрок, инициализация} from "./person.js"

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
    let текст = ""
    for(let вложенныйОбъект of объ.объекты) {
        if(скрыт(вложенныйОбъект)) continue
        текст += `, <span class="link">${просклонятьНазвание(вложенныйОбъект, Падеж.винительный)}</span>`
        if(закрыт(вложенныйОбъект)) continue
        текст += текстОбъектов(вложенныйОбъект)
    }
    return текст
}


function текстИнфоПерсонажа(массив, префикс, падеж = Падеж.именительный) {
    let текст = ""
    for(let объ of массив) {
        текст += `${текст === "" ? "" : ", "}<span class="link">${просклонятьНазвание(объ, падеж)}</span>`
    }
    return текст === "" ? "" : префикс + текст
}


export function обновить() {
    обновитьКоманды()

    const лок = игрок.локация
    let текст = текстОбъектов(лок)
    if(текст !== "") текст = "<p>Вы видите " + текст.часть(2)

    descriptionElement.innerHTML =
        парситьТекст(вСтроку(лок.описание, лок))
        + текст
        + текстИнфоПерсонажа(игрок.инвентарь, "<p>У вас с собой ")
        + текстИнфоПерсонажа(игрок.одежда, "<p>На вас надет ", Падеж.винительный)

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
    consoleElement.scrollTop = consoleElement.scrollHeight;
}

export function сброс() {
    window.location.reload();
}