import React from "react"
import CSS from 'csstype'


interface IBoundProps {
    label: string;
    align: string;
}

const setStyle = (align: string): CSS.Properties => {
    switch(align) {
        case "left": 
            return {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0
            }
        case "right": 
            return {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0
            }

        case "center": 
            return {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0
            }
        default:
            return {
                borderTopLeftRadius: ".25rem",
                borderBottomLeftRadius: ".25rem",
                borderTopRightRadius: ".25rem",
                borderBottomRightRadius: ".25rem"
            }
    }

}

const PaginationBtnElement: React.FC<IBoundProps> = ({label, align}) => {

    return (
        <div className="page-item" >
            <div className="page-link" style={setStyle(align)}>
                {label}
            </div>
        </div>
    )
}

export default PaginationBtnElement