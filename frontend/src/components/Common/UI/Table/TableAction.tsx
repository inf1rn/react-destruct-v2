import classNames from 'classnames'
import React from 'react'

interface IProps {
    text: string
    callback: () => void
    actionClass?: string
}

export const TableAction: React.FC<IProps> = React.memo(({ text, callback, actionClass}) => {
    return (
        <div className="status-nav__item" onClick={callback}>
            <span className={classNames("status-nav__link", actionClass)}>{text}</span>
        </div>
    )
})
