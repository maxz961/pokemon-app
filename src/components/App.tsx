import React, { useEffect, useContext } from "react"
import { observer } from 'mobx-react-lite'
import CircularProgress from '@material-ui/core/CircularProgress'
import { PokemonInfo, Stat } from "../api/pokemonts"
import { MainStoreContext } from "../store/store"
import SearchInput from "./SearchInput"
import PagePagination from "./PagePagination"
import AllTypesList from "./AllTypesList"
import ListPokemon from "./ListPokemon"

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const baseUrl = "https://pokeapi.co/api/v2"

const fetchThisPokemon = async (url: string): Promise<PokemonInfo> => {
    const response = await fetch(url)
        .then(res => res.json())
        .catch(err => console.log(err))
    
    const stats = response.stats.map((v: any) => new Stat(v.base_stat, v.stat.name))
    const types = response.types.map((v: any) => v.type.name)
    const height = response.height * 10
    const weight = response.weight / 10

    return new PokemonInfo(
        response.id,
        response.name,
        response.sprites.back_default,
        types,
        height,
        weight,
        stats
    )
}

const App: React.FC = observer(() => {
    const storeContext = useContext(MainStoreContext)
    
    useEffect(() => { 
        async function fetchPokemontsRequest() {
            storeContext.setLoading(true)
            const response = fetch(`${baseUrl}/pokemon`)
                .then(res => res.json())
                .then(res => fetch(`${baseUrl}/pokemon?limit=${res.count}`))
                .then(res => res.json())
                .then(res => res.results)
                .catch(err => console.log(err))

            const typeResponts = fetch(`${baseUrl}/type`)
                .then(res => res.json())
                .then(res => res.results.map((type: any) => type.name))
                .catch(err => console.log(err))

            const [awaitResponse, awaitTypeResponts] = await Promise.all([response, typeResponts])
            
            const allPokemontsResponse = await Promise.all([...awaitResponse.map((v: any) => fetchThisPokemon(v.url))])
            storeContext.setLoading(false)
            storeContext.setNewPokemonts(allPokemontsResponse, awaitTypeResponts)
        }
            
        fetchPokemontsRequest()
     }, [storeContext])

      

    return (
        <>
            {
                !storeContext.loading 
                    ? <div className={"App"}>
                            <div className={"wrappContent"}>
                                <SearchInput />
                                <ListPokemon />
                                <PagePagination />
                                <AllTypesList />
                            </div>
                        </div>
                    : <div className={"spinn__wrapper"}>
                          <CircularProgress />
                      </div>

            }
        </>
        
    )
})
    


export default App