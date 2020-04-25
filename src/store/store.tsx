import { observable, action, computed } from "mobx"
import { createContext } from "React"
import { PokemonInfo } from "../api/pokemonts"

const showCurrentPageItems = (countPageItems: number, currentPage: number): number[] => {
    const firstItemIndexPage = ( countPageItems * currentPage ) - countPageItems
    const lastItemIndexPage = countPageItems * currentPage

    return [firstItemIndexPage, lastItemIndexPage]
}

const currentCountPokemonAfterFilter = (pokemon: any, filter: string, filterTypePokemon: string[]): number => {
    const matchesFilter = new RegExp(filter, "i")

    return pokemon
        .filter((value: any) => 
            (!filter || matchesFilter.test(value.name)) && value.types.filter((type: string) => {
                if(filterTypePokemon.length === 0) return true
                return filterTypePokemon.includes(type)
            }).length > 0
        ).length
}



class MainStore {
    @observable pokemonts: PokemonInfo[] = []
    @observable filter: string = ""
    @observable countPageItems: number = 20
    @observable currentPage: number = 1
    @observable prevPage: number = 1
    @observable allTypePokemon: string[] = []
    @observable filterTypePokemon: string[] = []
    @observable loading: boolean = true

    @action
    setNewPokemonts(data: PokemonInfo[], typePokemon: string[]) {
        this.allTypePokemon = typePokemon
        this.pokemonts = data
    }

    @action
    setFilter(value: string): void {
        this.currentPage = 1
        this.filter = value
    }

    @action
    setCurrentPage(value: number): void {
        this.prevPage = this.currentPage
        this.currentPage = value
    }

    @action
    setTypeFilter(type: string): void {
        this.currentPage = 1
        this.filterTypePokemon = this.filterTypePokemon.includes(type) 
            ?  this.filterTypePokemon.filter(v => v !== type)
            : [...this.filterTypePokemon, type]
            
    }

    @action
    setCountPageItems(evt: React.ChangeEvent<{ name?: string; value: unknown; }>) {
        this.currentPage = 1
        this.countPageItems = parseInt(evt.target.value as string)
    }

    @action
    setLoading(isLoading: boolean) {
        this.loading = isLoading
    }


    @computed
    get filteredPokemonts(): PokemonInfo[] {
        const matchesFilter = new RegExp(this.filter, "i")
        return this.pokemonts
            .filter(pokemon => 
                (!this.filter || matchesFilter.test(pokemon.name)) && pokemon.types.filter((type: string) => {
                    if(this.filterTypePokemon.length === 0) return true
                    return this.filterTypePokemon.includes(type)
                }).length > 0
            ).slice(...showCurrentPageItems(this.countPageItems, this.currentPage))
    }

    @computed
    get lengthPageList(): number {
        return Math.ceil(currentCountPokemonAfterFilter(this.pokemonts, this.filter, this.filterTypePokemon) / this.countPageItems)
    }

    
}

export const MainStoreContext = createContext(new MainStore())