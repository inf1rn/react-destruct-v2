import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { tiktokBaseUrl, tiktokUsersStorage } from '../../../constants/api'
import { tiktokUsersPath } from '../../../constants/links'
import { checkTiktokUserPermission, deleteTiktokUserPermission } from '../../../constants/permissions'
import { subculturesPipes } from '../../../pipes/subculturesAndTags/subcultures'
import { tagsPipes } from '../../../pipes/subculturesAndTags/tags'
import { ITiktokUser } from '../../../types/tiktok'
import { formatDate } from "../../../utils/date"
import { DynamicSpan } from '../../Common/UI/Table/DynamicSpan'
import { MoreBtn } from '../../Common/UI/Table/MoreBtn'

interface IProps {
    currentUserPermissions: Array<string>
    user: ITiktokUser
    isSelected: boolean
    onDelete: (id: number) => void
    toggleSelectedUser: (id: number) => void
    onCheck: (id: number) => void
}

export const TiktokUser: React.FC<IProps> = React.memo(({ isSelected, onCheck, toggleSelectedUser, user, onDelete, currentUserPermissions }) => {
    const navigate = useNavigate()

    const onDeleteHandler = useCallback(() => {
        onDelete(user.id)
    }, [])

    const onCheckHandler = useCallback(() => {
        onCheck(user.id)
    }, [])

    const onGetDetailedHandler = useCallback(() => {
        navigate(`${tiktokUsersPath}/${user.id}`)
    }, [])

    const actions = [
        { text: "Подробнее", callback: onGetDetailedHandler },
        { text: "Добавить", callback: onCheckHandler, requiredPermission: checkTiktokUserPermission },
        { text: "Удалить", class: "status-nav__link_red", callback: onDeleteHandler, requiredPermission: deleteTiktokUserPermission }
    ]

    return (
        <div className="table__row">
            <div className="table__cell table__cell_top table__cell_check" data-cell>
                <div className="table__checkbox checkbox">
                    <label className="checkbox__label">
                        <input checked={isSelected} onChange={() => toggleSelectedUser(user.id)} className="checkbox__input" type="checkbox" />
                        <span className="checkbox__icon"></span>
                    </label>
                </div>
                <a href={tiktokBaseUrl + "/@" + user.userId} style={{ textDecoration: "none" }} target="_blank">
                    <div className="table-user">
                        <img className="table-user__photo" src={tiktokUsersStorage + user.imgUrl} alt="" />
                        <span className="table-user__name">{user.username}<span className="table-user__text">@{user.id}</span></span>
                    </div>
                </a>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Описание</span>
                    <span className="table__tablet-text">{user.description}</span>
                </div>
            </div>
            <div className="table__cell table__cell_stats">
                <span className="table__stats-desc">Подписчики<br />месяц (всего)</span>
                <DynamicSpan value={user.subscribersGrowth} />
                <span className="table__stats-text">{user.totalSubscribers}</span>
            </div>
            <div className="table__cell table__cell_stats">
                <span className="table__stats-desc">Подписки<br />месяц (всего)</span>
                <DynamicSpan value={user.followingGrowth} />
                <span className="table__stats-text">{user.totalFollowing}</span>
            </div>
            <div className="table__cell table__cell_stats">
                <span className="table__stats-desc">Публикации<br />месяц (всего)</span>
                <DynamicSpan value={user.postsGrowth} />
                <span className="table__stats-text">{user.totalPosts}</span>
            </div>
            <div className="table__cell table__cell_stats">
                <span className="table__stats-desc">Лайки <br />месяц (всего)</span>
                <DynamicSpan value={user.likesGrowth} />
                <span className="table__stats-text">{user.totalLikes}</span>
            </div>
            <div className="table__cell table__cell_mob" data-cell>
                <div className="table__mob-cols">
                    <span className="table__mob-desc">Последняя<br />публикация</span>
                    <span className="table__mob-text">{formatDate(user.lastPublication)}</span>
                </div>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Теги</span>
                    <span className="table__tablet-text">
                        <span className="table__tag">{tagsPipes.names(user.tags).join(", ")}</span>
                    </span>
                </div>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Субкультуры</span>
                    <span className="table__tablet-text">
                        <span className="table__category">{subculturesPipes.names(user.tags).join(", ")}</span>
                    </span>
                </div>
            </div>
            <div className="table__cell table__cell_top" data-cell>
                <div className="desktop-actions desktop-actions_admin">
                    <div className="desktop-actions__col" onClick={() => onGetDetailedHandler()}>
                        <div className="show-more js-show-more">
                            <a className="show-more__button js-show-button" href="#"></a>
                            <span className="show-more__tooltip js-show-tooltip">Подробнее</span>
                        </div>
                    </div>
                    {
                        !user.isChecked && currentUserPermissions.includes(checkTiktokUserPermission) && <div className="desktop-actions__col" onClick={onCheckHandler}>
                            <div className="show-more js-show-more">
                                <button className="action-button action-button_accept" type="button"></button>
                                <span className="show-more__tooltip js-show-tooltip">Добавить</span>
                            </div>
                        </div>
                    }
                    {
                        currentUserPermissions.includes(deleteTiktokUserPermission) && <div className="desktop-actions__col">
                            <div className="show-more js-show-more">
                                <button onClick={() => onDelete(user.id)} className="action-button action-button_remove js-show-button" type="button"></button>
                                <span className="show-more__tooltip js-show-tooltip">Удалить</span>
                            </div>
                        </div>
                    }
                </div>
                <MoreBtn actions={actions} />

            </div>
        </div>
    )
})
