import {getRussianSystemLocale, newLocale} from "../../src/localization.js"
import {allObjects} from "../../src/base.js"
import {player} from "../../src/person.js"

newLocale("Русский", getRussianSystemLocale(), true)

player.location = allObjects.get("ванная")

