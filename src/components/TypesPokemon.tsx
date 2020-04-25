import React from "react"
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import {PokemonInfo} from "../api/pokemonts"
import { setColorTypeTheme } from "../utils/utils"

const useStyles = makeStyles(() => ({
    chip: {
        margin: "0 5px",
        color: "white",
        fontSize: 16,
        textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
    },
}))

interface IBoundProps {
    pokemon: PokemonInfo
}

const TypesPokemon: React.FC<IBoundProps> = ({pokemon}) => {
    const classes = useStyles()
    return (
        <div>
            {
                pokemon.types.map((type: string) => 
                    <Chip 
                        className={classes.chip}
                        style={setColorTypeTheme(type)}
                        key={type} 
                        label={type}
                    /> 
                )
            }
        </div>
    )
    
}


export default TypesPokemon