import React from 'react'
import { getMonthName } from '../../../utils/date'

interface IProps {
    dateAt: Date | null
    dateTo: Date | null
    className: string
}

export const FilterRangeSpan: React.FC<IProps> = React.memo(({ dateAt, dateTo, className }) => {
    const text = React.useMemo(() => (
        dateAt && dateTo ?
            (
                dateAt.getDate() + " " + getMonthName(dateAt.getMonth()) + " " + dateAt.getFullYear() +
                " " + "–" + " " +
                dateTo.getDate() + " " + getMonthName(dateTo.getMonth()) + " " + dateTo.getFullYear()
            )
            : "За все время"
    ), [dateAt, dateTo])
    return (
        <>
            {/* <span className="filter-icon__text">{text}</span> */}
            <span className={className}>{text}</span>
        </>
    )
})
