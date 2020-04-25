import React from "react"
import * as ReactDOM from "react-dom"
import { PokemonInfo } from "../api/pokemonts"
import ListItem from '@material-ui/core/ListItem'
import { withStyles, WithStyles  } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import windowSize, { WindowSizeProps } from 'react-window-size'
import { setCurrentPropert } from "../utils/utils"
import DialogPokemonInfo from "./DialogPokemonInfo"
import TypesPokemon from "./TypesPokemon"

const styles = () => ({
    img: {
        width: 80,
        height: 80
    },

})

interface IBoundProps extends WithStyles<typeof styles> {
    pokemon: PokemonInfo
}

interface IState {
    isOpen: boolean
}

type IProps = IBoundProps & WindowSizeProps

class ListPokemonItem extends React.Component<IProps, IState> {
    state = {
        isOpen: false
    }

    handleDialogOpen = () => {
        this.setState(prevState => ({
            isOpen: true
        }))
    }

    handleClose = () => {
        this.setState(prevState => ({
            isOpen: false
        }))
    }
 
    render() {
        const { pokemon, windowWidth, classes } = this.props
        const isMobileWidth = windowWidth <= 430
        const property = setCurrentPropert(isMobileWidth, "row", "column")

        return (
            <>
            <ListItem 
                onClick={this.handleDialogOpen}
                button
            >
                <ListItemAvatar>
                    <Avatar
                        alt={"avatar pokemonts"}
                        src={pokemon.img}
                        className={classes.img}
                    />
                </ListItemAvatar>
                    
                <div 
                    style={{ 
                        display: "flex",
                        flexDirection: property,
                        alignItems: "center"
                    }}
                >
                    <ListItemText 
                        disableTypography
                        style={{
                            width: 100,
                        }}
                        id={pokemon.id} 
                        primary={
                            <Typography style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                textAlign: "center"
                            }}>
                                {pokemon.name}
                            </Typography>
                        } 
                    />
                    <div 
                        style={{
                            minWidth: 200,
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <TypesPokemon pokemon={pokemon} />
                    </div>
                </div>
                
                
            </ListItem>
            {
                this.state.isOpen 
                    ? ReactDOM.createPortal(
                        <DialogPokemonInfo 
                            handleClose={this.handleClose}
                            pokemon={pokemon}
                        />,  
                        document.getElementById("dialog")
                    ) 
                    : null 
            }
            </>
        )
    }
    
    
}


export default withStyles(styles)(windowSize(ListPokemonItem))