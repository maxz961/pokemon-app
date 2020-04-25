import React, { useContext } from "react"
import { observer } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/core/styles'
import { MainStoreContext } from "../store/store"
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(() => ({
    select: {
        paddingLeft: "10px"
    }
}))

const SearchInput: React.FC = observer(() => {
    const storeContext = useContext(MainStoreContext)
    const classes = useStyles()

    return (
        <div className="header__wrapper">
            <input 
                placeholder="Search field"
                className={"search__input"}
                value={storeContext.filter}
                onChange={e => storeContext.setFilter(e.target.value)}
            />

        <Select
            native
            className={"count__select"}
            classes={classes}
            value={storeContext.countPageItems}
            onChange={e => storeContext.setCountPageItems(e)}
        >
            <option value={20}>20</option>
            <option value={40}>40</option>
            <option value={60}>60</option>
        </Select>
        </div>
    )
})

export default SearchInput