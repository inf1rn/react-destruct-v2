import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { telegramPostsStorage } from '../../../constants/api'
import { telegramPostsPath } from '../../../constants/links'
import { checkTelegramPostPermission, deleteTelegramPostPermission } from '../../../constants/permissions'
import { subculturesPipes } from '../../../pipes/subculturesAndTags/subcultures'
import { tagsPipes } from '../../../pipes/subculturesAndTags/tags'
import { ITelegramPost } from '../../../types/telegram'
import { formatDate } from '../../../utils/date'
import { MoreBtn } from '../../Common/UI/Table/MoreBtn'

interface IProps {
    post: ITelegramPost
    currentUserPermissions: Array<string>
    isSelected: boolean
    onDelete: (id: number) => void
    toggleSelectedPost: (id: number) => void
    onCheck: (id: number) => void
}

export const TelegramPost: React.FC<IProps> = React.memo(({ isSelected, onCheck, toggleSelectedPost, post, onDelete, currentUserPermissions }) => {
    const navigate = useNavigate()

    const onDeleteHandler = useCallback(() => {
        onDelete(post.id)
    }, [])

    const onCheckHandler = useCallback(() => {
        onCheck(post.id)
    }, [])

    const onGetDetailedHandler = useCallback(() => {
        navigate(`${telegramPostsPath}/${post.id}`)
    }, [])

    const actions = [
        { text: "Подробнее", callback: onGetDetailedHandler },
        { text: "Добавить", callback: onCheckHandler, requiredPermission: checkTelegramPostPermission },
        { text: "Удалить", class: "status-nav__link_red", callback: onDeleteHandler, requiredPermission: deleteTelegramPostPermission }
    ]

    return (
        <div className="table__row">
            <div className="table__cell table__cell_top table__cell_check">
                <div className="table__checkbox checkbox">
                    <label className="checkbox__label">
                        <input checked={isSelected} onChange={() => toggleSelectedPost(post.id)} className="checkbox__input" type="checkbox" />
                        <span className="checkbox__icon"></span>
                    </label>
                </div>

                <div className="table-user">
                    {post.photos.length !== 0 && <img className="table-user__photo table-user__photo_no-radius" src={telegramPostsStorage + post.photos[0]} alt="" />}
                    <span className="table-user__name">{post.photos.length} фото</span>
                </div>
            </div>
            <div className="table__cell table__cell_tablet table__cell_padding-left">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Текст</span>
                    <span className="table__tablet-text">{post.postContent}</span>
                </div>
            </div>
            <div className="table__cell table__cell_mob">
                <div className="table__mob-cols">
                    <span className="table__mob-desc">Канал</span>
                    <span className="table__mob-text">{post.channelName}</span>
                </div>
            </div>
            <div className="table__cell table__cell_icon">
                <span className="table-icon table-icon_views table-icon_mob"></span>
                <span className="table__text blue-text">{post.postViews}</span>
            </div>
            <div className="table__cell table__cell_icon">
                <span className="table-icon table-icon_reactions table-icon_mob"></span>
                <span className="table__text green-light-text">{post.totalComments}</span>
            </div>
            <div className="table__cell table__cell_icon">
                <span className="table-icon table-icon_comments table-icon_mob"></span>
                <span className="table__text orange-text">{post.totalReactions}</span>
            </div>
            <div className="table__cell table__cell_stats table__cell_left">
                <span className="table__stats-desc">Дата</span>
                <span className="table__stats-text">{formatDate(post.createTime)}</span>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Теги</span>
                    <span className="table__tablet-text">
                        <span className="table__tag">{tagsPipes.names(post.tags).join(", ")}</span>
                    </span>
                </div>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Субкультуры</span>
                    <span className="table__tablet-text">
                        <span className="table__category">{subculturesPipes.names(post.tags).join(", ")}</span>
                    </span>
                </div>
            </div>
            <div className="table__cell table__cell_top">
                <div className="desktop-actions desktop-actions_admin desktop-actions_visible-mob">
                    {
                        !post.isChecked && currentUserPermissions.includes(checkTelegramPostPermission) && <div className="desktop-actions__col" onClick={onCheckHandler}>
                            <div className="show-more js-show-more">
                                <button className="action-button action-button_accept" type="button"></button>
                                <span className="show-more__tooltip js-show-tooltip">Добавить</span>
                            </div>
                        </div>
                    }
                    {currentUserPermissions.includes(deleteTelegramPostPermission) && <div className="desktop-actions__col">
                        <div className="show-more js-show-more">
                            <button onClick={() => onDelete(post.id)} className="action-button action-button_remove js-show-button" type="button"></button>
                            <span className="show-more__tooltip js-show-tooltip">Удалить</span>
                        </div>
                    </div>
                    }
                </div>
                <MoreBtn actions={actions} />

            </div>
        </div>)
})
