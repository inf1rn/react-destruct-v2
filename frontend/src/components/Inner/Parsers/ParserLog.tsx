import React from 'react'
import { IParserLog } from '../../../types/parsers'
import { formatDate } from '../../../utils/date'

interface IProps {
    log: IParserLog
}

export const ParserLog: React.FC<IProps> = React.memo(({ log }) => {
    return (
        <div className="table__row">
            <div className="table__cell table__cell_top table__mob-50" data-cell>
                <span className="table__text">{formatDate(log.date)}</span>
            </div>
            <div className="table__cell table__cell_top table__mob-50" data-cell>
                <span className="table__text">{new Date(log.date).getHours()}:{new Date(log.date).getMinutes()}</span>
            </div>
            <div className="table__cell table__cell_mob" data-cell>
                <div className="table__mob-cols">
                    <span className="table__mob-desc">Описание</span>
                    <span className="table__mob-text">{log.message}</span>
                </div>
            </div>
        </div>
    )
})
