export class Stat {
    base_stat: number
    name: string

    constructor(base_stat: number, name: string) {
        this.base_stat = base_stat || 0
        this.name = name || "unknown"
    }
}

export class ColorTypeTheme {
    background: string
    border: string = "1px solid rgba(0,0,0,0.2)"

    constructor(background?: string) {
        this.background = background || "#aa9"
    }

}

export class PokemonInfo {
    id: string
    name: string
    img: string
    types: string[]
    height: number
    weight: number
    stats: Stat[]

    constructor(
        id: string,
        name: string,
        img: string,
        types: string[],
        height: number,
        weight: number,
        stats: Stat[]
    ) {
        this.id = id || new Date().getTime().toString()
        this.name = name || "unknown"
        this.img = img || "unknown"
        this.types = types || ["unknown"]
        this.height = height || 0
        this.weight = weight || 0
        this.stats = stats || []
    }
}