import React, { useContext } from "react"
import { observer } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/core/styles'
import { MainStoreContext } from "../store/store"
import List from '@material-ui/core/List'
import windowSize, { WindowSizeProps } from 'react-window-size'
import ListPokemonItem from "./ListPokemonItem"
import { setCurrentPropert } from "../utils/utils"

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      height: "70vh",
      overflow: "auto"
    },
}))

const ListPokemon: React.FC<WindowSizeProps> = observer(({windowWidth}) => {
    const storeContext = useContext(MainStoreContext)
    const classes = useStyles()

    const isMobileWidth = windowWidth <= 430

    return (
        <List dense className={classes.root} style={{height: setCurrentPropert(isMobileWidth, "75vh", "60vh")}}>
            {storeContext.filteredPokemonts.map(pokemon => 
                <ListPokemonItem key={pokemon.id} pokemon={pokemon} />
            )}
        </List>
    )
})

export default windowSize(ListPokemon)