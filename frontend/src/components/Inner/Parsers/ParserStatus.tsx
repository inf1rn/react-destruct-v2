import React from 'react'
import { IParser } from '../../../types/parsers'
import { formatDate } from '../../../utils/date'

interface IProps {
    parser: IParser
    onStartParser: () => void
}

export const ParserStatus: React.FC<IProps> = React.memo(({ parser, onStartParser }) => {
    return (
        <div className="parsers__inner-cols">
            <div className="parsers__inner-col">
                <h2 className="parsers__title">Статус парсера</h2>
                <span className="parsers__status" style={
                    {
                        background: parser.isActive ? "#DBF7E6" : "#A52A2A",
                        color: parser.isActive ? "#63E396" : "#ffffff"
                    }
                }>{parser.isActive ? "Активен" : "Выключен"}</span>
            </div>
            <div className="parsers__inner-col">
                <button onClick={onStartParser} className="parsers__button button button_small button_inline" type="button">
                    <span className="button__update">Перезапустить парсер</span>
                </button>
                <span className="parsers__date">Последнее обновление <span>{formatDate(new Date(parser.lastActive))} {new Date(parser.lastActive).getHours()}:{new Date(parser.lastActive).getMinutes()}</span></span>
            </div>
        </div>
    )
})
