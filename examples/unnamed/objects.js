import {combine} from "../../src/functions.js"
import {Container} from "../../src/container.js"

export function createTable() {
    const onTable = combine(new Container("на столе"), {
        put: "на шкафчик"
    })
}

export function createWorkspace() {

}