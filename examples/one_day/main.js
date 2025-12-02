import "./cloth.js"
import "./items.js"
import "./objects.js"
import "./locations.js"
import "./doors.js"
import {player} from "../../src/person.js"
import {getRussianSystemLocale, newLocale} from "../../src/localization.js"
import {allObjects} from "../../src/base.js"

newLocale("Русский", getRussianSystemLocale(), true)

player.location = allObjects.get("ванная")

