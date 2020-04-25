import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Avatar from '@material-ui/core/Avatar'
import windowSize, { WindowSizeProps } from 'react-window-size'
import TypesPokemon from './TypesPokemon'
import { PokemonInfo } from "../api/pokemonts"
import { setCurrentPropert } from "../utils/utils"
import StatsPokemon from "./StatsPokemon"

const useStyles = makeStyles(() => ({
    paper: {
        minWidth: "300px"
    }
}))

interface IBoundProps {
    pokemon: PokemonInfo,
    handleClose(): void
}

const DialogPokemonInfo: React.FC<IBoundProps & WindowSizeProps> = ({
    pokemon,
    handleClose,
    windowWidth
}) => {
    const isMobileWidth = windowWidth <= 430
    const classes = useStyles()
    return (
        <div>
            <Dialog
                open={true}
                onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                classes={classes}
            >
                <div className="dialog">
                    <Avatar
                        alt={"avatar pokemonts"}
                        src={pokemon.img}
                        style={{width: 200, height: 200}}
                    />
                    <DialogTitle id="simple-dialog-title"><h3>{pokemon.name}</h3></DialogTitle>
                    <div className="pokemon__card" style={{overflowY: setCurrentPropert(isMobileWidth, "visible", "auto")}}>
                        <p>Types:</p>
                        <TypesPokemon pokemon={pokemon} /> 
                        <p>Height: {`${pokemon.height} cm`}</p>
                        <p>Weight: {`${pokemon.weight} kg`}</p>
                        <StatsPokemon stats={pokemon.stats} />
                    </div>
                    
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Закрыть
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )
}
    

export default windowSize(DialogPokemonInfo)
