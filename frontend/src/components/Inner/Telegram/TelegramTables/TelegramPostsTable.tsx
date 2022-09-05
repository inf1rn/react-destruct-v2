import React from 'react'
import { ITelegramPost } from '../../../../types/telegram'
import { TelegramPost } from '../TelegramPost'

interface IProps {
  posts: Array<ITelegramPost>
  selectedPosts: Array<number>
  isAllToggled: boolean
  currentUserPermissions: Array<string>
  setIsAllToggledHandler: () => void
  toggleSelectedPostHandler: (id: number) => void
  onDelete: (id: number) => void
  onCheck: (id: number) => void
}

export const TelegramPostsTable: React.FC<IProps> = React.memo((props) => {
  const {
    posts, selectedPosts, isAllToggled, currentUserPermissions,
    setIsAllToggledHandler, toggleSelectedPostHandler, onDelete, onCheck
  } = props

  return (
    <div className="table table_telegram">
      <div className="table__main">
        <div className="table__head">

          <div className="table__head-row">
            <div className="table__head-cell table__head-cell_32 table__head-cell_mob-top table__head-cell_check" data-head>
              <div className="table__checkbox checkbox">
                <label className="checkbox__label">
                  <input checked={isAllToggled} onChange={setIsAllToggledHandler} className="checkbox__input" type="checkbox" />
                  <span className="checkbox__icon"></span>
                </label>
              </div>
              <span className="table__label">Запись</span>
            </div>
            <div className="table__head-cell table__head-cell_33 table__head-cell_hide-tablet">
              <span className="table__label">Текст</span>
            </div>
            <div className="table__head-cell table__head-cell_34" data-head>
              <span className="table__label">Канал</span>
            </div>
            <div className="table__head-cell table__head-cell_35 table__head-cell_icon" data-head>
              <span className="table-icon table-icon_views"></span>
            </div>
            <div className="table__head-cell table__head-cell_36 table__head-cell_icon" data-head>
              <span className="table-icon table-icon_reactions"></span>
            </div>
            <div className="table__head-cell table__head-cell_37 table__head-cell_icon" data-head>
              <span className="table-icon table-icon_comments"></span>
            </div>
            <div className="table__head-cell table__head-cell_38" data-head>
              <span className="table__label">Дата <br />публикации</span>
            </div>
            <div className="table__head-cell table__head-cell_39 table__head-cell_hide-tablet">
              <span className="table__label">Теги</span>
            </div>
            <div className="table__head-cell table__head-cell_40 table__head-cell_hide-tablet">
              <span className="table__label">Субкультуры</span>
            </div>
            <div className="table__head-cell table__head-cell_31 table__head-cell_mob-top" data-head>
              <span className="table__label">Действия</span>
            </div>
          </div>
        </div>

      </div>
      <div className="table__body">
        {posts?.map((post) => <TelegramPost
          isSelected={selectedPosts.find((id: number) => id === post.id) !== undefined ? true : false}
          toggleSelectedPost={toggleSelectedPostHandler} currentUserPermissions={currentUserPermissions}
          onDelete={onDelete} post={post} onCheck={onCheck} key={post.id}/>)}
      </div>
    </div>
  )
})
