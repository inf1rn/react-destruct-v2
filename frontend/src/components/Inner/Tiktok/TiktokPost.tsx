import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { tiktokBaseUrl, tiktokPostsStorage } from '../../../constants/api'
import { tiktokPostsPath } from '../../../constants/links'
import { checkTiktokPostPermission, deleteTiktokPostPermission } from '../../../constants/permissions'
import { subculturesPipes } from '../../../pipes/subculturesAndTags/subcultures'
import { tagsPipes } from '../../../pipes/subculturesAndTags/tags'
import { ITiktokPost } from '../../../types/tiktok'
import { formatDate } from '../../../utils/date'
import { MoreBtn } from '../../Common/UI/Table/MoreBtn'

interface IProps {
    currentUserPermissions: Array<string>
    post: ITiktokPost
    isSelected: boolean
    onDelete: (id: number) => void
    toggleSelectedPost: (id: number) => void
    onCheck: (id: number) => void

}

export const TiktokPost: React.FC<IProps> = React.memo(({ isSelected, onCheck, toggleSelectedPost, post, onDelete, currentUserPermissions }) => {
    const navigate = useNavigate()

    const onDeleteHandler = useCallback(() => {
        onDelete(post.id)
    }, [])

    const onGetDetailedHandler = useCallback(() => {
        navigate(`${tiktokPostsPath}/${post.id}`)
    }, [])

    const onCheckHandler = useCallback(() => {
        onCheck(post.id)
    }, [])

    const actions = [
        { text: "Подробнее", callback: onGetDetailedHandler },
        { text: "Добавить", callback: onCheckHandler, requiredPermission: checkTiktokPostPermission },
        { text: "Удалить", class: "status-nav__link_red", callback: onDeleteHandler, requiredPermission: deleteTiktokPostPermission }
    ]

    return (
        <div className="table__row">
            <div className="table__cell table__cell_top table__cell_check" data-cell>
                <div className="table__checkbox checkbox">
                    <label className="checkbox__label">
                        <input checked={isSelected} onChange={() => toggleSelectedPost(post.id)} className="checkbox__input" type="checkbox" />
                        <span className="checkbox__icon"></span>
                    </label>
                </div>
                <a style={{ textDecoration: "none" }} href={tiktokBaseUrl + "/@" + post?.user?.userId + "/video/" + post.postId} target="_blank">
                    <div className="table-user">
                        <img className="table-user__photo table-user__photo_no-radius" src={tiktokPostsStorage + post.imgUrl} alt="" />
                        <span className="table-user__name"></span>
                    </div>
                </a>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Описание</span>
                    <span className="table__tablet-text">{post.description}</span>
                </div>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Автор</span>
                    <span className="table__tablet-text">
                        <span className="table-user">
                            <span className="table-user__name">{post.user?.username}<span className="table-user__text">@{post.user?.id}</span></span>
                        </span>
                    </span>
                </div>
            </div>
            <div className="table__cell table__cell_icon" data-cell>
                <span className="table-icon table-icon_views table-icon_mob"></span>
                <span className="table__text blue-text">{post.totalViews}</span>
            </div>
            <div className="table__cell table__cell_icon" data-cell>
                <span className="table-icon table-icon_reactions table-icon_mob"></span>
                <span className="table__text green-light-text">{post.totalLikes}</span>
            </div>
            <div className="table__cell table__cell_icon" data-cell>
                <span className="table-icon table-icon_comments table-icon_mob"></span>
                <span className="table__text orange-text">{post.totalComments}</span>
            </div>
            <div className="table__cell table__cell_icon" data-cell>
                <span className="table-icon table-icon_reposts table-icon_mob">{post.shareGrowth}</span>
                <span className="table__text purple-text">{post.totalShare}</span>
            </div>
            <div className="table__cell table__cell_mob" data-cell>
                <div className="table__mob-cols">
                    <span className="table__mob-desc">Последняя<br />публикация</span>
                    <span className="table__mob-text">{formatDate(post.createTime)}</span>
                </div>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Теги</span>
                    <span className="table__tablet-text">
                        <span className="table__tag">{post.tags && tagsPipes.names(post.tags).join(", ")}</span>
                    </span>
                </div>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Субкультуры</span>
                    <span className="table__tablet-text">
                        <span className="table__category">{post.tags && subculturesPipes.names(post.tags).join(", ")}</span>
                    </span>
                </div>
            </div>
            <div className="table__cell table__cell_top" data-cell>
                <div className="desktop-actions desktop-actions_admin desktop-actions_visible-mob">
                    {
                        !post.isChecked && currentUserPermissions.includes(checkTiktokPostPermission) && <div className="desktop-actions__col" onClick={onCheckHandler}>
                            <div className="show-more js-show-more">
                                <button className="action-button action-button_accept" type="button"></button>
                                <span className="show-more__tooltip js-show-tooltip">Добавить</span>
                            </div>
                        </div>
                    }
                    {
                        currentUserPermissions.includes(deleteTiktokPostPermission) && <div className="desktop-actions__col">
                            <div className="show-more js-show-more">
                                <button onClick={() => onDelete(post.id)} className="action-button action-button_remove js-show-button" type="button"></button>
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
