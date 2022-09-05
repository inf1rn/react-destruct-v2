import React from 'react'
import { IParser } from '../../../types/parsers'
import { formatDate } from '../../../utils/date'
import { ParserPeriodicity } from './ParserPeriodicity'
import { ParserStatus } from './ParserStatus'

interface IProps {
    onStartParser: () => void
    parser: IParser
}

export const ParsersSettings: React.FC<IProps> = React.memo(({ onStartParser, parser }) => {
    return (
        <div className="inner-page__line inner-page__line_hide-mob">
            <div className="parsers">
                <section className="parsers__col">
                    <div className="parsers__bg">
                        <ParserStatus parser={parser} onStartParser={onStartParser} />
                    </div>
                </section>
                <section className="parsers__col">
                    {/* <div className="parsers__bg"> */}
                        <ParserPeriodicity />
                    {/* </div> */}
                </section>
            </div>
        </div>
    )
})
