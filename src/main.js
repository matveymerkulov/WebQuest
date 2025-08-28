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


export const значения = (...объ) => [].concat(...Object.values(объ))
export const этоМассив = (объ) => Array.isArray(объ)


export function вМассив(объ) {
    if(объ === undefined) return []
    if(этоМассив(объ.объекты)) return объ
    return [объ.объекты]
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

    обновить()
})



const консоль = document.getElementById("консоль")
const изображение = document.getElementById("изображение")
const описание = document.getElementById("описание")

function парситьТекст(текст) {
    let начало = 0, ссылка = нет, новыйТекст = ""
    for(let индекс = 0; индекс < текст.length; индекс++) {
        const символ = текст.символ(индекс)
        if(символ === "*") {
            if(ссылка) {
                новыйТекст = новыйТекст.добавить(`<a>${текст.часть(начало, индекс)}</a>`)
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

function обновить() {
    const игрок = персонаж.игрок
    const лок = игрок.локация

    описание.innerHTML = парситьТекст(вСтроку(лок.описание, лок))
    const файлИзображения = вСтроку(лок.изображение, лок)
    изображение.hidden = файлИзображения === ""
    изображение.src = файлИзображения

    for(let команда of лок.команды) {

    }
}