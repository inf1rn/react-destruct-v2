import classNames from 'classnames'
import React from 'react'

interface IProps {
    value: number
}

export const DynamicSpan: React.FC<IProps> = React.memo(({ value }) => {
    return (
        <span className={classNames("table__stats-text", {
            "green-text": value > 0,
            "red-text": value < 0
        })}> {value}</span >
    )
})
