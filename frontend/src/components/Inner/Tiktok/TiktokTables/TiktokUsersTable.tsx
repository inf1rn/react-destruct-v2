import React from 'react'
import { ITiktokUser } from '../../../../types/tiktok'
import { TiktokUser } from '../TiktokUser'

interface IProps {
  users: Array<ITiktokUser>
  selectedUsers: Array<number>
  isAllToggled: boolean
  currentUserPermissions: Array<string>
  setIsAllToggledHandler: () => void
  toggleSelectedUserHandler: (id: number) => void
  onDelete: (id: number) => void
  onCheck: (id: number) => void
}

export const TiktokUsersTable: React.FC<IProps> = React.memo((props) => {
  const {
    users, selectedUsers, isAllToggled, currentUserPermissions,
    setIsAllToggledHandler, toggleSelectedUserHandler, onDelete, onCheck
  } = props

  return (
    <div className="table table_tiktok">
      <div className="table__main">
        <div className="table__head">
          <div className="table__head-row">
            <div className="table__head-cell table__head-cell_41 table__head-cell_mob-top table__head-cell_check" data-head>
              <div className="table__checkbox checkbox">
                <label className="checkbox__label">
                  <input checked={isAllToggled} onChange={setIsAllToggledHandler} className="checkbox__input" type="checkbox" />
                  <span className="checkbox__icon"></span>
                </label>
              </div>
              <span className="table__label">Пользователь</span>
            </div>
            <div className="table__head-cell table__head-cell_42 table__head-cell_hide-tablet">
              <span className="table__label">Описание</span>
            </div>
            <div className="table__head-cell table__head-cell_43 table__head-cell_center" data-head>
              <span className="table__label">Подписчики<br />месяц (всего)</span>
            </div>
            <div className="table__head-cell table__head-cell_44 table__head-cell_center" data-head>
              <span className="table__label">Подписки<br />месяц (всего)</span>
            </div>
            <div className="table__head-cell table__head-cell_45 table__head-cell_center" data-head>
              <span className="table__label">Публикации<br />месяц (всего)</span>
            </div>
            <div className="table__head-cell table__head-cell_46 table__head-cell_center" data-head>
              <span className="table__label">Лайки<br />месяц (всего)</span>
            </div>
            <div className="table__head-cell table__head-cell_47" data-head>
              <span className="table__label">Последняя<br />публикация</span>
            </div>
            <div className="table__head-cell table__head-cell_48 table__head-cell_hide-tablet">
              <span className="table__label">Теги</span>
            </div>
            <div className="table__head-cell table__head-cell_49 table__head-cell_hide-tablet">
              <span className="table__label">Субкультуры</span>
            </div>
            <div className="table__head-cell table__head-cell_50 table__head-cell_mob-top" data-head>
              <span className="table__label">Действия</span>
            </div>
          </div>

        </div>
        <div className="table__body">
          {users.map((user) => <TiktokUser
            isSelected={selectedUsers.find((id: number) => id === user.id) !== undefined ? true : false} 
            toggleSelectedUser={toggleSelectedUserHandler} currentUserPermissions={currentUserPermissions}
            onDelete={onDelete} user={user} onCheck={onCheck} key={user.id}/>)}
        </div>
      </div>
    </div>
  )
})
