import React from 'react'
import { IVkGroup } from '../../../../types/vk'
import { VkGroup } from '../VkGroup'

interface IProps {
  groups: Array<IVkGroup>
  selectedGroups: Array<number>
  isAllToggled: boolean
  currentUserPermissions: Array<string>
  setIsAllToggledHandler: () => void
  toggleSelectedGroupHandler: (id: number) => void
  onDelete: (id: number) => void
  onCheck: (id: number) => void
}

export const VkGroupsTable: React.FC<IProps> = React.memo((props) => {
  const {
    groups, selectedGroups, isAllToggled, currentUserPermissions,
    setIsAllToggledHandler, toggleSelectedGroupHandler, onDelete, onCheck
  } = props
  return (
    <div className="table">
      <div className="table__main">
        <div className="table__head">

          <div className="table__head-row">
            <div className="table__head-cell table__head-cell_1 table__head-cell_mob-top table__head-cell_check" data-head>
              <div className="table__checkbox checkbox">
                <label className="checkbox__label">
                  <input checked={isAllToggled} onChange={setIsAllToggledHandler} className="checkbox__input" type="checkbox" />
                  <span className="checkbox__icon"></span>
                </label>
              </div>
              <span className="table__label">Название сообщества</span>
            </div>
            <div className="table__head-cell table__head-cell_2" data-head>
              <span className="table__label">Кол&#8209;во<br />подписчиков</span>
            </div>
            <div className="table__head-cell table__head-cell_3 table__head-cell_icon" data-head>
              <span className="table-icon table-icon_views"></span>
            </div>
            <div className="table__head-cell table__head-cell_4 table__head-cell_icon" data-head>
              <span className="table-icon table-icon_likes"></span>
            </div>
            <div className="table__head-cell table__head-cell_5 table__head-cell_icon" data-head>
              <span className="table-icon table-icon_comments"></span>
            </div>
            <div className="table__head-cell table__head-cell_6 table__head-cell_padding-left table__head-cell_hide-tablet">
              <span className="table__label">Описание</span>
            </div>
            <div className="table__head-cell table__head-cell_7" data-head>
              <span className="table__label">Геоданные сообщества</span>
            </div>
            <div className="table__head-cell table__head-cell_8" data-head>
              <span className="table__label">Дата <br />активности</span>
            </div>
            <div className="table__head-cell table__head-cell_9 table__head-cell_hide-tablet">
              <span className="table__label">Админы</span>
            </div>
            <div className="table__head-cell table__head-cell_10 table__head-cell_hide-tablet">
              <span className="table__label">Теги</span>
            </div>
            <div className="table__head-cell table__head-cell_11 table__head-cell_hide-tablet">
              <span className="table__label">Субкультуры</span>
            </div>
            <div className="table__head-cell table__head-cell_12 table__head-cell_mob-top" data-head>
              <span className="table__label">Действия</span>
            </div>
          </div>

        </div>
        <div className="table__body">
          {groups?.map((group) => <VkGroup
            isSelected={selectedGroups.find((id: number) => id === group.id) !== undefined ? true : false}
            toggleSelectedGroup={toggleSelectedGroupHandler} currentUserPermissions={currentUserPermissions}
            onDelete={onDelete} group={group} onCheck={onCheck} key={group.id} />)}
        </div>
      </div>
    </div>
  )
})
