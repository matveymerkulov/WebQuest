// noinspection NonAsciiCharacters

import {выполнитьКоманду, обновитьКоманды, объект, Падеж, персонаж, просклонять, просклонятьНазвание} from "./main.js"
import {вЗначение, вСтроку, закрыт, скрыт, этоМассив} from "./functions.js"
import {инициализация} from "./init.js"
import {игрок} from "../examples/farm/main.js"

let x, y

let consoleElement, imageDiv, imageElement, descriptionElement, maxImageHeight


function applyOrientation() {
    const portrait = document.body.offsetHeight > document.body.offsetWidth
    const postfix = portrait ? "_p" : "_l"
    consoleElement = document.getElementById("console" + postfix)
    imageDiv = document.getElementById("image_div" + postfix)
    imageElement = document.getElementById("image" + postfix)
    descriptionElement = document.getElementById("description" + postfix)
    document.getElementById("landscape").style.visibility = portrait ? "hidden" : "visible"
    document.getElementById("portrait").style.visibility = !portrait ? "hidden" : "visible"
    maxImageHeight = portrait ? 0.3 : 0.5
}


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
            const scale = Math.min(imageDiv.offsetWidth / imageElement.naturalWidth
                , maxImageHeight * document.body.offsetHeight / imageElement.naturalHeight)
            imageElement.style.width = (scale * imageElement.naturalWidth) + "px"
            imageElement.style.height = (scale * imageElement.naturalHeight) + "px"
            imageDiv.style.backgroundImage = `url("${imageElement.src}")`
        }
        imageElement.src = "images/" + imageFile
    }

    for(const element of document.getElementsByClassName("link")) {
        element.addEventListener("click", event => {
            выполнитьКоманду(event.target.innerHTML)
        })
    }
}


const menuContainer = document.getElementById("menus")

export function показатьМеню(menuNode) {
    const layer = document.createElement("div")
    layer.className = "layer"
    layer.addEventListener("click", event => {
        menuContainer.removeChild(menuContainer.lastChild)
        menuContainer.removeChild(menuContainer.lastChild)
    })

    const menu = document.createElement("div")
    menu.className = "menu"
    menu.style.left = x + "px"
    menu.style.top = y + "px"
    for(const [key, value] of Object.entries(menuNode)) {
        const div = document.createElement("div")
        div.className = "menu_item"
        div.innerHTML = key
        div["menuNode"] = value
        div.addEventListener("click", event => {
            const menuNode = event.target["menuNode"]

            if(Array.isArray(menuNode)) {
                const command = menuNode[0].выполнение
                const obj = menuNode[1]
                if(typeof command === "string") {
                    написать(command)
                } else {
                    command(obj)
                }
                скрытьМеню()
                обновить()
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

export function очиститьКонсоль() {
    consoleElement.textContent = ""
}

export function написать(текст) {
    if(consoleElement.innerHTML.length > 0) consoleElement.innerHTML += "<p>"
    consoleElement.innerHTML += парситьТекст(текст)
}

export function конец(текст) {
    alert(текст)
    window.location.reload();
}