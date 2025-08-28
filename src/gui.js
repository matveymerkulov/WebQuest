// noinspection NonAsciiCharacters

import {выполнитьКоманду, персонаж} from "./main.js"
import {вСтроку} from "./functions.js"

function parseText(text) {
    let begin = 0, link = false, newText = ""
    for(let index = 0; index < text.length; index++) {
        const symbol = text.charAt(index)
        if(symbol === "*") {
            if(link) {
                newText = newText.concat('<span class="link">' + text.substring(begin, index) + '</span>')
            } else {
                newText = newText.concat(text.substring(begin, index))
            }
            begin = index + 1
            link = !link
        } else if(symbol === "\n") {
            newText = newText.concat(text.substring(begin, index), "<p>")
            begin = index + 1
        }
    }
    newText = newText.concat(text.substring(begin))
    return newText
}



const consoleElement = document.getElementById("console")
const imageElement = document.getElementById("image")
const descriptionElement = document.getElementById("description")

export function update() {
    const лок = персонаж.игрок.локация

    descriptionElement.innerHTML = parseText(вСтроку(лок.описание, лок))
    const imageFile = вСтроку(лок.изображение, лок)
    imageElement.hidden = imageFile === ""
    imageElement.src = imageFile

    for(const element of document.getElementsByClassName("link")) {
        element.addEventListener("click", event => {
            выполнитьКоманду(event.target.innerHTML)
        })
    }
}