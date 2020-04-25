import { ColorTypeTheme } from "../api/pokemonts"

export const ucFirst = (str: string): string => {
    if (!str) return str
  
    return str[0].toUpperCase() + str.slice(1)
}

export const setCurrentPropert = <T extends {}>(isMobileWidth: boolean, deskProp: T, mobProp: T) => isMobileWidth ? mobProp : deskProp

export const setColorTypeTheme = (type: string): ColorTypeTheme => {
    switch(type) {
        case "normal": 
            return new ColorTypeTheme()

        case "fire": 
            return new ColorTypeTheme("#f42")

        case "water": 
            return new ColorTypeTheme("#f42")

        case "electric": 
            return new ColorTypeTheme("#fc3")

        case "grass": 
            return new ColorTypeTheme("#7c5")

        case "ice": 
            return new ColorTypeTheme("#6cf")

        case "fighting": 
            return new ColorTypeTheme("#b54")

        case "poison": 
            return new ColorTypeTheme("#a59")

        case "ground": 
            return new ColorTypeTheme("#db5")

        case "flying": 
            return new ColorTypeTheme("#89f")

        case "psychic": 
            return new ColorTypeTheme("#f59")

        case "bug": 
            return new ColorTypeTheme("#ab2")

        case "rock": 
            return new ColorTypeTheme("#ba6")

        case "ghost": 
            return new ColorTypeTheme("#66b")

        case "dragon": 
            return new ColorTypeTheme("#76e")

        case "dark": 
            return new ColorTypeTheme("#754")

        case "steel": 
            return new ColorTypeTheme("#aab")

        case "fairy": 
            return new ColorTypeTheme("#e9e")

        default:
            return new ColorTypeTheme()
    }
}