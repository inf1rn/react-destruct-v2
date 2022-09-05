import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { telegramChannelsStorage } from '../../../constants/api'
import { telegramChannelsPath } from '../../../constants/links'
import { checkTelegramChannelPermission, deleteTelegramChannelPermission } from '../../../constants/permissions'
import { subculturesPipes } from '../../../pipes/subculturesAndTags/subcultures'
import { tagsPipes } from '../../../pipes/subculturesAndTags/tags'
import { ITelegramChannel } from '../../../types/telegram'
import { formatDate } from '../../../utils/date'
import { DynamicSpan } from '../../Common/UI/Table/DynamicSpan'
import { MoreBtn } from '../../Common/UI/Table/MoreBtn'

interface IProps {
    channel: ITelegramChannel
    currentUserPermissions: Array<string>
    isSelected: boolean
    onDelete: (id: number) => void
    toggleSelectedChannel: (id: number) => void
    onCheck: (id: number) => void
}

export const TelegramChannel: React.FC<IProps> = React.memo(({ isSelected, onCheck, toggleSelectedChannel, channel, onDelete, currentUserPermissions }) => {
    const navigate = useNavigate()

    const onDeleteHandler = useCallback(() => {
        onDelete(channel.channelId)
    }, [])

    const onCheckHandler = useCallback(() => {
        onCheck(channel.channelId)
    }, [])

    const onGetDetailedHandler = useCallback(() => {
        navigate(`${telegramChannelsPath}/${channel.channelId}`)
    }, [])

    const actions = [
        { text: "Подробнее", callback: onGetDetailedHandler },
        { text: "Добавить", callback: onCheckHandler, requiredPermission: checkTelegramChannelPermission },
        { text: "Удалить", class: "status-nav__link_red", callback: onDeleteHandler, requiredPermission: deleteTelegramChannelPermission }
    ]

    return (
        <div className="table__row">
            <div className="table__cell table__cell_top table__cell_check" data-cell>
                <div className="table-user">
                    <img className="table-user__photo" src={telegramChannelsStorage + channel.imgUrl} alt="" />
                    <span className="table-user__name">{channel.channelName}</span>
                </div>
                <div className="table__checkbox checkbox">
                    <label className="checkbox__label">
                        <input checked={isSelected} onChange={() => toggleSelectedChannel(channel.channelId)} className="checkbox__input" type="checkbox" />
                        <span className="checkbox__icon"></span>
                    </label>
                </div>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Описание</span>
                    <span className="table__tablet-text">{channel.description}</span>
                </div>
            </div>
            <div className="table__cell table__cell_stats" data-cell>
                <span className="table__stats-desc">Подписчики<br />месяц (всего)</span>
                <DynamicSpan value={channel.subscribersGrowth} />
                <span className="table__stats-text">{channel.totalSubscribers}</span>
            </div>
            <div className="table__cell table__cell_stats" data-cell>
                <span className="table__stats-desc">Публикации<br />месяц (всего)</span>
                <DynamicSpan value={channel.postsGrowth} />
                <span className="table__stats-text">{channel.totalPosts}</span>
            </div>
            <div className="table__cell table__cell_stats" data-cell>
                <span className="table__stats-desc">Просмотры<br />месяц (всего)</span>
                <DynamicSpan value={channel.viewsGrowth} />
                <span className="table__stats-text">{channel.totalViews}</span>
            </div>
            <div className="table__cell table__cell_stats" data-cell>
                <span className="table__stats-desc">Реакции<br />месяц (всего)</span>
                <DynamicSpan value={channel.reactionsGrowth} />
                <span className="table__stats-text">{channel.totalReactions}</span>
            </div>
            <div className="table__cell table__cell_mob" data-cell>
                <div className="table__mob-cols">
                    <span className="table__mob-desc">Последняя<br />публикация</span>
                    <span className="table__mob-text">{formatDate(channel.lastPostDate)}</span>
                </div>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Теги</span>
                    <span className="table__tablet-text">
                        <span className="table__tag">{tagsPipes.names(channel.tags).join(", ")}</span>
                    </span>
                </div>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Субкультуры</span>
                    <span className="table__tablet-text">
                        <span className="table__category">{subculturesPipes.names(channel.tags).join(", ")}</span>
                    </span>
                </div>
            </div>
            <div className="table__cell table__cell_top" data-cell>
                <div className="desktop-actions desktop-actions_admin desktop-actions_visible-mob">
                    <div className="desktop-actions__col" data-cell onClick={() => onGetDetailedHandler()}>
                        <div className="show-more js-show-more">
                            <a className="show-more__button js-show-button" href="#"></a>
                            <span className="show-more__tooltip js-show-tooltip">Подробнее</span>
                        </div>
                    </div>
                    {
                        !channel.isChecked && currentUserPermissions.includes(checkTelegramChannelPermission) && <div className="desktop-actions__col" onClick={onCheckHandler}>
                            <div className="show-more js-show-more">
                                <button className="action-button action-button_accept" type="button"></button>
                                <span className="show-more__tooltip js-show-tooltip">Добавить</span>
                            </div>
                        </div>
                    }
                    {currentUserPermissions.includes(deleteTelegramChannelPermission) && <div className="desktop-actions__col">
                        <div className="show-more js-show-more">
                            <button onClick={() => onDelete(channel.channelId)} className="action-button action-button_remove js-show-button" type="button"></button>
                            <span className="show-more__tooltip js-show-tooltip">Удалить</span>
                        </div>
                    </div>}
                </div>

                <MoreBtn actions={actions} />

            </div>
        </div>
    )
})
