import React from 'react'
import { ITagFullInfo, IUpdateTagBody } from '../../../../types/tags'
import { Tag } from '../Tag'

interface IProps {
  tagsFullInfo: Array<ITagFullInfo>
  currentUserPermissions: Array<string>
  onDelete: (id: number) => void
  onChange: (dto: IUpdateTagBody) => void
}

export const TagsTable: React.FC<IProps> = React.memo((props) => {
  const {
    tagsFullInfo, onChange, onDelete, currentUserPermissions
  } = props
  return (
    <div className="table table_data">
      <div className="table__main">
        <div className="table__head">

          <div className="table__head-row">
            <div className="table__head-cell table__head-cell_71 table__head-cell_mob-top table__mob-40" data-head>
              <span className="table__label">Тег</span>
            </div>
            <div className="table__head-cell table__head-cell_72 table__head-cell_mob-top table__mob-40" data-head>
              <span className="table__label">Субкультура</span>
            </div>
            <div className="table__head-cell table__head-cell_73 table__head-cell_center" data-head>
              <span className="table__label">Публикации <br />Вконтакте</span>
            </div>
            <div className="table__head-cell table__head-cell_74 table__head-cell_center" data-head>
              <span className="table__label">Публикации <br />Telegram</span>
            </div>
            <div className="table__head-cell table__head-cell_75 table__head-cell_center" data-head>
              <span className="table__label">Публикации <br />TikTok</span>
            </div>
            <div className="table__head-cell table__head-cell_76 table__head-cell_mob-top table__mob-20" data-head>
              <span className="table__label">Действия</span>
            </div>
          </div>

        </div>
        <div className="table__body">
          {tagsFullInfo?.map(tagFullInfo => (
            <Tag 
            currentUserPermissions={currentUserPermissions} tagFullInfo={tagFullInfo} 
            onChange={onChange} onDelete={onDelete} key={tagFullInfo.tag.id} />
          ))}
        </div>
      </div>
    </div>
  )
})
