// noinspection NonAsciiCharacters

export const да = true, нет = false
export const неЗадан = undefined, неЗадана = undefined, неЗадано = undefined, неЗаданы = undefined

export const локация = {}, локацию = локация, локации = локация
export const предмет = {}
export const объект = {}
export const персонаж = {}


Array.prototype.размер = Array.prototype.length
Array.prototype.содержит = Array.prototype.содержат = Array.prototype.includes
Array.prototype.добавить = Array.prototype.push
Array.prototype.удалить = function(...элемент) {
    const индекс = this.indexOf(элемент, 0);
    if (индекс > -1) {
        this.splice(индекс, 1);
    }
}

String.prototype.длина = String.prototype.length
String.prototype.символ = String.prototype.charAt
String.prototype.добавить = String.prototype.concat
String.prototype.часть = String.prototype.substring


export const значения = (...объ) => [].concat(...Object.values(...объ))
export const этоМассив = (объ) => Array.isArray(объ)


export function вМассив(объ) {
    if(объ === undefined) return []
    if(этоМассив(объ)) return объ
    return [объ]
}

export function вСтроку(строка, объ) {
    if(typeof строка === "string") return строка
    if(typeof строка === "function") return строка(объ)
    return ""
}



export function написать(текст) {

}

export function конец(текст) {

}

let описаниеПоУмолчанию = ""
export function задатьОписаниеПоУмолчанию(текст) {
    описаниеПоУмолчанию = текст
}

let действияПеред = () => {}
export function задатьДействияПеред(функция) {
    действияПеред = функция
}



document.addEventListener("DOMContentLoaded", () => {
    for(let контейнер of значения(локация, объект, предмет)) {
        контейнер.объекты = вМассив(контейнер.объекты)

        контейнер.добавить = (...объ) => {
            this.объекты.добавить(...объ)
        }

        контейнер.удалить = (...объ) => {
            this.объекты.удалить(...объ)
        }

        контейнер.содержит = (объ) => {
            return this.объекты.содержат(объ)
        }
    }



    for(let лок of значения(локация)) {
        лок.команды = вМассив(лок.команды)
    }



    for(let предм of значения(предмет)) {
        предм.контейнер = неЗадан

        предм.переместитьВ = (конт) => {
            if(this.контейнер === конт) return
            if(this.контейнер) this.контейнер.объекты.удалить(this)
            конт.объекты.добавить(this)
            this.контейнер = конт
        }

        предм.переместитьНа = (конт) => {
            this.переместитьВ(конт)
        }

        предм.находитсяВ = (конт) => {
            return this.контейнер === конт
        }

        предм.скрыть = () => {
            this.контейнер = неЗадан
        }
    }



    for(let перс of значения(персонаж)) {
        перс.инвентарь ??= []
        перс.локация ??= неЗадана

        перс.взять = (предм) => {
            if(this.инвентарь.содержит(предм)) return
            this.локация.объекты.удалить(предм)
            this.инвентарь.добавить(предм)
        }

        перс.бросить = (предм) => {
            if(!this.инвентарь.содержит(предм)) return
            this.инвентарь.удалить(предм)
            this.локация.объекты.добавить(предм)
        }

        перс.имеет = (объ) => {
            return this.объекты.содержит(объ)
        }
    }

    update()
})



const consoleElement = document.getElementById("console")
const imageElement = document.getElementById("image")
const descriptionElement = document.getElementById("description")

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



function update() {
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



function выполнитьКоманду(текст) {
    const игрок = персонаж.игрок
    const лок = игрок.локация

    for(let команда of лок.команды) {

    }

    for(let выход of лок.выходы()) {
        if(выход[0] === текст) {
            игрок.локация = выход[1]
            update()
            return
        }
    }
}