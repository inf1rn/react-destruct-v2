import classNames from 'classnames'
import React from 'react'

interface IPropsPagination {
    count: number
    page?: number
    perPage?: number
    onChangePage: (page: number) => void
}

interface IPropsPaginationButton {
    onClick: (page: number) => void
    active?: boolean
    value: number
}

const PaginationButton: React.FC<IPropsPaginationButton> = React.memo(({ onClick, value, active }) => {
    return (
        <li className={classNames("page-nav__item", {
            active
        })} onClick={() => onClick(value)} >
            <a className="page-nav__link" onClick={(e) => e.preventDefault()} href="">{value}</a>
        </li >
    )
})

export const Pagination: React.FC<IPropsPagination> = React.memo(({ count, page = 0, perPage = 10, onChangePage }) => {
    const firstItem = React.useMemo(() => (page - 1) * perPage + 1, [page, perPage])
    const lastItem = React.useMemo(() => (page * perPage > count ? firstItem + (count - firstItem) : page * perPage), [page, perPage, count])

    const lastPage = React.useMemo(() => Math.ceil(count / perPage), [count, perPage])

    return (
        <div className="page-nav page-nav_right">
            <div className="page-nav__col">{firstItem}-{lastItem} из {count}</div>
            <div className="page-nav__col">
                <button onClick={() => page != 1 && onChangePage(page - 1)} className="page-nav__button arrow-button arrow-button_prev"></button>
            </div>
            <div className="page-nav__col">
                <ul className="page-nav__list">
                    {page != 1 && <PaginationButton onClick={onChangePage} value={1} />}
                    {
                        page - 2 > 1 &&
                        <>
                            <li className="page-nav__item">...</li>
                            <PaginationButton onClick={onChangePage} value={page - 2} />
                        </>
                    }
                    {page > 2 && <PaginationButton onClick={onChangePage} value={page - 1} />}
                    <PaginationButton active={true} onClick={onChangePage} value={page} />
                    {page + 1 <= lastPage && <PaginationButton onClick={onChangePage} value={page + 1} />}
                    {page + 2 <= lastPage && <PaginationButton onClick={onChangePage} value={page + 2} />}
                    {
                        page + 3 < lastPage &&
                        <>
                            <li className="page-nav__item">...</li>

                            <PaginationButton onClick={onChangePage} value={lastPage} />

                        </>

                    }
                </ul>
            </div>
            <div className="page-nav__col">
                <button onClick={() => page != lastPage && onChangePage(page + 1)} className="page-nav__button arrow-button arrow-button_next"></button>
            </div>
        </div >
    )
})
