import React from 'react'
import { ITiktokPost } from '../../../../types/tiktok'
import { TiktokPost } from '../TiktokPost'

interface IProps {
  posts: Array<ITiktokPost>
  selectedPosts: Array<number>
  isAllToggled: boolean
  currentUserPermissions: Array<string>
  setIsAllToggledHandler: () => void
  toggleSelectedPostHandler: (id: number) => void
  onDelete: (id: number) => void
  onCheck: (id: number) => void
}

export const TiktokPostsTable: React.FC<IProps> = React.memo((props) => {
  const {
    posts, selectedPosts, isAllToggled, currentUserPermissions,
    setIsAllToggledHandler, toggleSelectedPostHandler, onDelete, onCheck
  } = props

  return (
    <div className="table table_tiktok">
      <div className="table__main">
        <div className="table__head">

          <div className="table__head-row">
            <div className="table__head-cell table__head-cell_51 table__head-cell_mob-top table__head-cell_check" data-head>
              <div className="table__checkbox checkbox">
                <label className="checkbox__label">
                  <input checked={isAllToggled} onChange={setIsAllToggledHandler} className="checkbox__input" type="checkbox" />
                  <span className="checkbox__icon"></span>
                </label>
              </div>
              <span className="table__label">Публикация</span>
            </div>
            <div className="table__head-cell table__head-cell_52 table__head-cell_hide-tablet">
              <span className="table__label">Описание</span>
            </div>
            <div className="table__head-cell table__head-cell_53 table__head-cell_hide-tablet">
              <span className="table__label">Автор</span>
            </div>
            <div className="table__head-cell table__head-cell_54 table__head-cell_icon" data-head>
              <span className="table-icon table-icon_views"></span>
            </div>
            <div className="table__head-cell table__head-cell_55 table__head-cell_icon" data-head>
              <span className="table-icon table-icon_reactions"></span>
            </div>
            <div className="table__head-cell table__head-cell_56 table__head-cell_icon" data-head>
              <span className="table-icon table-icon_comments"></span>
            </div>
            <div className="table__head-cell table__head-cell_57 table__head-cell_icon" data-head>
              <span className="table-icon table-icon_reposts"></span>
            </div>
            <div className="table__head-cell table__head-cell_58" data-head>
              <span className="table__label">Дата <br />публикации</span>
            </div>
            <div className="table__head-cell table__head-cell_59 table__head-cell_hide-tablet">
              <span className="table__label">Теги</span>
            </div>
            <div className="table__head-cell table__head-cell_60 table__head-cell_hide-tablet">
              <span className="table__label">Субкультуры</span>
            </div>
            <div className="table__head-cell table__head-cell_50 table__head-cell_mob-top" data-head>
              <span className="table__label">Действия</span>
            </div>
          </div>

        </div>
        <div className="table__body">
          {posts?.map((post) => post.id && <TiktokPost 
          isSelected={selectedPosts.find((id: number) => id === post.id) !== undefined ? true : false} 
          toggleSelectedPost={toggleSelectedPostHandler} currentUserPermissions={currentUserPermissions} 
          onDelete={onDelete} post={post} onCheck={onCheck} key={post.id} />)}

        </div>
      </div>
    </div>
  )
})
