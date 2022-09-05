import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { vkCommunitiesPath } from '../../../constants/links'
import { checkVkGroupPermission, deleteVkGroupPermission } from '../../../constants/permissions'
import { locationPipes } from '../../../pipes/location/location'
import { subculturesPipes } from '../../../pipes/subculturesAndTags/subcultures'
import { tagsPipes } from '../../../pipes/subculturesAndTags/tags'
import { IVkGroup } from '../../../types/vk'
import { formatDate } from '../../../utils/date'
import { MoreBtn } from '../../Common/UI/Table/MoreBtn'

interface IProps {
    currentUserPermissions: Array<string>
    group: IVkGroup
    isSelected: boolean
    onDelete: (id: number) => void
    toggleSelectedGroup: (id: number) => void
    onCheck: (id: number) => void
}

export const VkGroup: React.FC<IProps> = React.memo(({ isSelected, onCheck, toggleSelectedGroup, currentUserPermissions, group, onDelete }) => {
    const navigate = useNavigate()

    const onDeleteHandler = useCallback(() => {
        onDelete(group.id)
    }, [])

    const onGetDetailedHandler = useCallback(() => {
        navigate(`${vkCommunitiesPath}/${group.id}`)
    }, [])

    const onCheckHandler = useCallback(() => {
        onCheck(group.id)
    }, [])

    const actions = [
        { text: "Подробнее", callback: onGetDetailedHandler },
        { text: "Добавить", callback: onCheckHandler, requiredPermission: checkVkGroupPermission },
        { text: "Удалить", class: "status-nav__link_red", callback: onDeleteHandler, requiredPermission: deleteVkGroupPermission }
    ]

    return (
        <div className="table__row">
            <div className="table__cell table__cell_top table__cell_check" data-cell>
                <div className="table__checkbox checkbox">
                    <label className="checkbox__label">
                        <input checked={isSelected} onChange={() => toggleSelectedGroup(group.id)} className="checkbox__input" type="checkbox" />
                        <span className="checkbox__icon"></span>
                    </label>
                </div>
                <div className="table-user">
                    <img className="table-user__photo" src={group.img} alt="" />
                    <span className="table-user__name">{group.name}</span>
                </div>
            </div>
            <div className="table__cell table__cell_subscribers table__cell_icon" data-cell>
                <span className="table-icon table-icon_subscribers table-icon_mob"></span>
                <span className="table__text green-mob-text">{group.membersCount}</span>
            </div>
            <div className="table__cell table__cell_icon" data-cell>
                <span className="table-icon table-icon_views table-icon_mob"></span>
                <span className="table__text blue-text">{group.totalViews}</span>
            </div>
            <div className="table__cell table__cell_icon" data-cell>
                <span className="table-icon table-icon_likes table-icon_mob"></span>
                <span className="table__text purple-text">{group.totalLikes}</span>
            </div>
            <div className="table__cell table__cell_icon" data-cell>
                <span className="table-icon table-icon_comments table-icon_mob"></span>
                <span className="table__text orange-text">{group.totalComments}</span>
            </div>
            <div className="table__cell table__cell_padding-left table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Описание</span>
                    <span className="table__tablet-text">{group.description}</span>
                </div>
            </div>
            <div className="table__cell table__cell_mob" data-cell>
                <div className="table__mob-cols">
                    <span className="table__mob-desc">Геоданные</span>
                    <span className="table__mob-text">{locationPipes.location([group.countryName, group.regionName])}</span>
                </div>
            </div>
            <div className="table__cell table__cell_mob" data-cell>
                <div className="table__mob-cols">
                    <span className="table__mob-desc">Дата активности</span>
                    <span className="table__mob-text">{formatDate(new Date(+(new Date(group.lastActive).getTime())))}</span>
                </div>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Админы</span>
                    <span className="table__tablet-text">{group.contacts}</span>
                </div>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Теги</span>
                    <span className="table__tablet-text">
                        <span className="table__tag">{tagsPipes.names(group.tags).join(", ")}</span>
                    </span>
                </div>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Субкультуры</span>
                    <span className="table__tablet-text">
                        <span className="table__category">{subculturesPipes.names(group.tags).join(", ")}</span>
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
                        !group.isChecked && currentUserPermissions.includes(checkVkGroupPermission) && <div className="desktop-actions__col" onClick={onCheckHandler}>
                            <div className="show-more js-show-more">
                                <button className="action-button action-button_accept" type="button"></button>
                                <span className="show-more__tooltip js-show-tooltip">Добавить</span>
                            </div>
                        </div>
                    }
                    {currentUserPermissions.includes(deleteVkGroupPermission) && <div className="desktop-actions__col">
                        <div className="show-more js-show-more">
                            <button onClick={() => onDelete(group.id)} className="action-button action-button_remove js-show-button" type="button"></button>
                            <span className="show-more__tooltip js-show-tooltip">Удалить</span>
                        </div>
                    </div>
                    }
                </div>
                <MoreBtn actions={actions} />
            </div>
        </div>)
})
