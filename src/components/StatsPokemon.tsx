import React from "react"
import { Stat } from "../api/pokemonts"
import { ucFirst } from "../utils/utils"

const oneHundredPercent = 100

interface IBoundProps {
    stats: Stat[]
}

const setDynamicStatsLine = (stat: number): string => {
    const leftSide = stat / 2
    const rightSide = oneHundredPercent - leftSide
    return `linear-gradient(to right, #dc3545 0% ${leftSide}%, #17a2b8 ${leftSide}% ${rightSide}%)`
}

const StatsPokemon: React.FC<IBoundProps> = ({stats}) => {
    return (
        <>
            {
                stats.map(stat => 
                <>
                    <p key={stat.name}>{ucFirst(stat.name)}:
                        
                    </p>
                    <div style={{
                        width: "100%",
                        padding: "2px 5px",
                        textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: 4,
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        background: setDynamicStatsLine(stat.base_stat)
                    }}>{stat.base_stat} / 200</div>
                </>
                )
            }
        </>
    )
}

export default StatsPokemon