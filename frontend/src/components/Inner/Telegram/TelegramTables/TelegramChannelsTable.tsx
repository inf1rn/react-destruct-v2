import React from 'react'
import { ITelegramChannel } from '../../../../types/telegram'
import { TelegramChannel } from '../TelegramChannel'

interface IProps {
  channels: Array<ITelegramChannel>
  selectedChannels: Array<number>
  isAllToggled: boolean
  currentUserPermissions: Array<string>
  setIsAllToggledHandler: () => void
  toggleSelectedChannelHandler: (id: number) => void
  onDelete: (id: number) => void
  onCheck: (id: number) => void
}

export const TelegramChannelsTable: React.FC<IProps> = React.memo((props) => {
  const {
    channels, selectedChannels, isAllToggled, currentUserPermissions,
    setIsAllToggledHandler, toggleSelectedChannelHandler, onDelete, onCheck
  } = props

  return (
    <div className="table table_telegram">
      <div className="table__main">
        <div className="table__head">

          <div className="table__head-row">
            <div className="table__head-cell table__head-cell_22 table__head-cell_mob-top table__head-cell_check" data-head>
              <div className="table__checkbox checkbox">
                <label className="checkbox__label">
                  <input checked={isAllToggled} onChange={setIsAllToggledHandler} className="checkbox__input" type="checkbox" />
                  <span className="checkbox__icon"></span>
                </label>
              </div>
              <span className="table__label">Название сообщества</span>
            </div>
            <div className="table__head-cell table__head-cell_23 table__head-cell_hide-tablet">
              <span className="table__label">Описание</span>
            </div>
            <div className="table__head-cell table__head-cell_24 table__head-cell_center" data-head>
              <span className="table__label">Подписчики<br />месяц (всего)</span>
            </div>
            <div className="table__head-cell table__head-cell_25 table__head-cell_center" data-head>
              <span className="table__label">Публикации<br />месяц (всего)</span>
            </div>
            <div className="table__head-cell table__head-cell_26 table__head-cell_center" data-head>
              <span className="table__label">Просмотры<br />месяц (всего)</span>
            </div>
            <div className="table__head-cell table__head-cell_27 table__head-cell_center" data-head>
              <span className="table__label">Реакции<br />месяц (всего)</span>
            </div>
            <div className="table__head-cell table__head-cell_28" data-head>
              <span className="table__label">Последняя<br />публикация</span>
            </div>
            <div className="table__head-cell table__head-cell_29 table__head-cell_hide-tablet">
              <span className="table__label">Теги</span>
            </div>
            <div className="table__head-cell table__head-cell_30 table__head-cell_hide-tablet">
              <span className="table__label">Субкультуры</span>
            </div>
            <div className="table__head-cell table__head-cell_31 table__head-cell_mob-top" data-head>
              <span className="table__label">Действия</span>
            </div>
          </div>

        </div>
        <div className="table__body">
          {channels?.map((channel) => <TelegramChannel
          isSelected={selectedChannels.find((id: number) => id === channel.channelId) !== undefined ? true : false} 
          toggleSelectedChannel={toggleSelectedChannelHandler} currentUserPermissions={currentUserPermissions} 
          onDelete={onDelete} channel={channel} key={channel.channelId} onCheck={onCheck}/>)}

        </div>
      </div>
    </div>
  )
})
