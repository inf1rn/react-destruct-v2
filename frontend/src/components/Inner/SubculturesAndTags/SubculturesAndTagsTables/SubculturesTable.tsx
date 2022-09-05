import React from 'react'
import { ISubcultureFullInfo, IUpdateSubcultureBody } from '../../../../types/subcultures'
import { Subculture } from '../Subculture'

interface IProps {
  subculturesFullInfo: Array<ISubcultureFullInfo>
  currentUserPermissions: Array<string>
  onDelete: (id: number) => void
  onChange: (dto: IUpdateSubcultureBody) => void
}

export const SubculturesTable: React.FC<IProps> = React.memo((props) => {
  const {
    subculturesFullInfo, onChange, onDelete, currentUserPermissions
  } = props

  return (
    <div className="table table_data">
      <div className="table__main">
        <div className="table__head">

          <div className="table__head-row">
            <div className="table__head-cell table__head-cell_64 table__head-cell_mob-top" data-head>
              <span className="table__label">Субкультура</span>
            </div>
            <div className="table__head-cell table__head-cell_65 table__head-cell_hide-tablet">
              <span className="table__label">Описание</span>
            </div>
            <div className="table__head-cell table__head-cell_66 table__head-cell_center" data-head>
              <span className="table__label">#теги</span>
            </div>
            <div className="table__head-cell table__head-cell_67 table__head-cell_center" data-head>
              <span className="table__label">Публикации <br />Вконтакте</span>
            </div>
            <div className="table__head-cell table__head-cell_68 table__head-cell_center" data-head>
              <span className="table__label">Публикации <br />Telegram</span>
            </div>
            <div className="table__head-cell table__head-cell_69 table__head-cell_center" data-head>
              <span className="table__label">Публикации <br />TikTok</span>
            </div>
            <div className="table__head-cell table__head-cell_70 table__head-cell_mob-top" data-head>
              <span className="table__label">Действия</span>
            </div>
          </div>

        </div>
        <div className="table__body">

          {subculturesFullInfo?.map((subcultureFullInfo) => (
            <Subculture
              currentUserPermissions={currentUserPermissions} onChange={onChange}
              subcultureFullInfo={subcultureFullInfo} onDelete={onDelete} key={subcultureFullInfo.subculture.id} />)
          )}

        </div>
      </div>
    </div>
  )
})
