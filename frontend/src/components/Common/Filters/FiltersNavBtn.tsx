import classNames from 'classnames'
import React from 'react'

interface IProps extends React.PropsWithChildren {
    isActive: boolean
    onClick: () => void
    className?: string
}

export const FiltersNavBtn: React.FC<IProps> = ({ children, onClick, className, isActive }) => {
    return (
        <button onClick={onClick} className={classNames("filters__button", "filter-icon", className, {
            selected: isActive,
            active: isActive
        })}>
            {children}
        </button>
    )
}
