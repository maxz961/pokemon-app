import React, { useContext } from "react"
import { observer } from 'mobx-react-lite'
import { MainStoreContext } from "../store/store"
import ReactPaginate from 'react-paginate'
import PaginationBtnElement from "./PaginationBtnElement"
import windowSize, { WindowSizeProps } from 'react-window-size'
import { setCurrentPropert } from "../utils/utils"

const PagePagination: React.FC<WindowSizeProps> = observer(({windowWidth}) => {
    const storeContext = useContext(MainStoreContext)
    const isMobileWidth = windowWidth <= 430

    return (
        <div className={"pagination__wrapper"}>
            <ReactPaginate
                initialPage={0}
                previousLabel={<PaginationBtnElement label={"<"} align={"left"} />}
                nextLabel={<PaginationBtnElement label={">"} align={"right"} />}
                breakLabel={<PaginationBtnElement label={"..."} align={"center"} />}
                breakClassName={'break-me'}
                pageCount={storeContext.lengthPageList}
                marginPagesDisplayed={setCurrentPropert(isMobileWidth, 2, 1)}
                pageRangeDisplayed={setCurrentPropert(isMobileWidth, 5, 2)}
                onPageChange={e => storeContext.setCurrentPage(e.selected + 1)}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={"page-link"}
                activeClassName={'active'}
            />
        </div>
    )
})

export default windowSize(PagePagination)