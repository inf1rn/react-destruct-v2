import React from 'react'
import { IUser } from '../../../types/users'
import { User } from './User'

interface IProps {
  users: Array<IUser>
  selectedUsers: Array<number>
  isAllToggled: boolean
  currentUserPermissions: Array<string>
  setIsAllToggledHandler: () => void
  toggleSelectedUserHandler: (id: number) => void
  onDelete: (id: number) => void
  onChangeUserRole: (user: IUser, roleId: number) => void
  onChangeUserStatus: (user: IUser, statusId: number) => void
}

export const UsersTable: React.FC<IProps> = React.memo((props) => {
  const {
    users, selectedUsers, isAllToggled, currentUserPermissions,
    setIsAllToggledHandler, toggleSelectedUserHandler, onDelete,
    onChangeUserRole, onChangeUserStatus
  } = props

  return (
    <div className="table table_users">
      <div className="table__main">
        <div className="table__head">

          <div className="table__head-row">
            <div className="table__head-cell table__head-cell_77 table__head-cell_top table__head-cell_check" data-head>
              <div className="table__checkbox checkbox">
                <label className="checkbox__label">
                  <input checked={isAllToggled} onChange={setIsAllToggledHandler} className="checkbox__input" type="checkbox" />
                  <span className="checkbox__icon"></span>
                </label>
              </div>
              <span className="table__label">Пользователь</span>
            </div>
            <div className="table__head-cell table__head-cell_78" data-head>
              <span className="table__label">Email</span>
            </div>
            <div className="table__head-cell table__head-cell_79 table__head-cell_hide-tablet">
              <span className="table__label">Геоданные</span>
            </div>
            <div className="table__head-cell table__head-cell_80 table__head-cell_hide-tablet">
              <span className="table__label">Место работы</span>
            </div>
            <div className="table__head-cell table__head-cell_81" data-head>
              <span className="table__label">Роль</span>
            </div>
            <div className="table__head-cell table__head-cell_82" data-head>
              <span className="table__label">Последняя <br />авторизация</span>
            </div>
            <div className="table__head-cell table__head-cell_83 table__head-cell_hide-tablet">
              <span className="table__label">Статус</span>
            </div>
            <div className="table__head-cell table__head-cell_84 table__head-cell_mob-top" data-head>
              <span className="table__label">Действия</span>
            </div>
          </div>

        </div>
        <div className="table__body">
          {users?.map((user) => <User
            isSelected={selectedUsers.find((id: number) => id === user.id) !== undefined ? true : false}
            toggleSelectedUser={toggleSelectedUserHandler} key={user.id}
            currentUserPermissions={currentUserPermissions} onChangeRole={onChangeUserRole} onChangeStatus={onChangeUserStatus}
            onDelete={onDelete} user={user} />)}
        </div>
      </div>
    </div>
  )
})
