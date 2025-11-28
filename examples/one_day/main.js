import "./items.js"
import "./objects.js"
import "./locations.js"
import {player} from "../../src/person.js"
import {getRussianSystemLocale, newLocale} from "../../src/localization.js"
import {livingRoom} from "./locations.js"

newLocale("Русский", getRussianSystemLocale(), true)

player.maxItems = 2
player.location = livingRoom

