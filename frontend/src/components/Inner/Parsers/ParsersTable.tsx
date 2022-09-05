import React from 'react'
import { IParserLog } from '../../../types/parsers'
import { ParserLog } from './ParserLog'

interface IProps {
  logs: Array<IParserLog>
}

export const ParsersTable: React.FC<IProps> = React.memo((props) => {
  const { logs } = props

  return (
    <div className="table table_data">
      <div className="table__main">
        <div className="table__head">

          <div className="table__head-row">
            <div className="table__head-cell table__head-cell_61 table__head-cell_mob-top table__mob-50" data-head>
              <span className="table__label">Дата</span>
            </div>
            <div className="table__head-cell table__head-cell_62 table__head-cell_mob-top table__mob-50" data-head>
              <span className="table__label">Время</span>
            </div>
            <div className="table__head-cell table__head-cell_63" data-head>
              <span className="table__label">Описание</span>
            </div>
          </div>

        </div>
        <div className="table__body">
          {logs?.map(log => <ParserLog log={log} key={log.id} />)}
        </div>
      </div>
    </div>
  )
})
