import React, { useContext } from "react"
import { observer } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import { MainStoreContext } from "../store/store"
import { setColorTypeTheme } from "../utils/utils"

const useStyles = makeStyles(() => ({
    root: {
      margin: "0px 5px",
      borderRadius: 4,
      color: "white",
      fontSize: 16,
      textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
      transition: ".3s",
      '&:hover': {
        opacity: .75,
      },
      
    },
}))

const isActiveType = (types: string[], type: string) => ({boxShadow: types.includes(type) ? "rgb(96, 7, 255) 0px 7px 4px" : ""})

const AllTypesList: React.FC = observer(() => {
    const classes = useStyles()
    const storeContext = useContext(MainStoreContext)
    return (
        <div className={"types__wrapper"}>
            {
                storeContext.allTypePokemon.map(type => 
                    <Chip 
                        classes={classes}
                        className={"type"}
                        onClick={e => storeContext.setTypeFilter(type)} 
                        style={{...isActiveType(storeContext.filterTypePokemon, type), ...setColorTypeTheme(type)}} 
                        key={type} 
                        label={type}
                    /> 
                )
            }
        </div>
    )
})

export default AllTypesList