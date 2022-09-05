import React from 'react'
import { IVkUser } from '../../../../types/vk'
import { VkUser } from '../VkUser'

interface IProps {
  users: Array<IVkUser>
  selectedUsers: Array<number>
  isAllToggled: boolean
  currentUserPermissions: Array<string>
  setIsAllToggledHandler: () => void
  toggleSelectedUserHandler: (id: number) => void
  onDelete: (id: number) => void
  onCheck: (id: number) => void
}

export const VkUsersTable: React.FC<IProps> = React.memo((props) => {
  const {
    users, selectedUsers, isAllToggled, currentUserPermissions,
    setIsAllToggledHandler, toggleSelectedUserHandler, onDelete, onCheck
  } = props

  return (
    <div className="table table_users">
      <div className="table__main">
        <div className="table__head">

          <div className="table__head-row">
            <div className="table__head-cell table__head-cell_13 table__head-cell_mob-top table__head-cell_check" data-head>
              <div className="table__checkbox checkbox">
                <label className="checkbox__label">
                  <input checked={isAllToggled} onChange={setIsAllToggledHandler} className="checkbox__input" type="checkbox" />
                  <span className="checkbox__icon"></span>
                </label>
              </div>
              <span className="table__label">ФИО</span>
            </div>
            <div className="table__head-cell table__head-cell_14" data-head>
              <span className="table__label">Пол</span>
            </div>
            <div className="table__head-cell table__head-cell_15" data-head>
              <span className="table__label">Возраст</span>
            </div>
            <div className="table__head-cell table__head-cell_16" data-head>
              <span className="table__label">Геоданные пользователя</span>
            </div>
            <div className="table__head-cell table__head-cell_17" data-head>
              <span className="table__label">Дата <br />активности</span>
            </div>
            <div className="table__head-cell table__head-cell_18" data-head>
              <span className="table__label">Статус</span>
            </div>
            <div className="table__head-cell table__head-cell_19 table__head-cell_hide-tablet">
              <span className="table__label">Деструктивные <br />сообщества</span>
            </div>
            <div className="table__head-cell table__head-cell_20 table__head-cell_hide-tablet">
              <span className="table__label">Субкультуры</span>
            </div>
            <div className="table__head-cell table__head-cell_21 table__head-cell_mob-top" data-head>
              <span className="table__label">Действия</span>
            </div>
          </div>

        </div>
        <div className="table__body">
          {users?.map((user) => <VkUser
            key={user.id} isSelected={selectedUsers.find((id: number) => id === user.id) !== undefined ? true : false}
            toggleSelectedUser={toggleSelectedUserHandler} currentUserPermissions={currentUserPermissions} onDelete={onDelete}
            user={user} onCheck={onCheck} />)}
        </div>
      </div>
    </div>
  )
})