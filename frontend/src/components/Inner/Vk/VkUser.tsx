import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { vkUsersPath } from '../../../constants/links'
import { checkVkUserPermission, deleteVkUserPermission } from '../../../constants/permissions'
import { locationPipes } from '../../../pipes/location/location'
import { subculturesPipes } from '../../../pipes/subculturesAndTags/subcultures'
import { IVkUser } from '../../../types/vk'
import { formatDate } from '../../../utils/date'
import { MoreBtn } from '../../Common/UI/Table/MoreBtn'

interface IProps {
    currentUserPermissions: Array<string>
    user: IVkUser
    isSelected: boolean
    toggleSelectedUser: (id: number) => void
    onDelete: (id: number) => void
    onCheck: (id: number) => void
}

export const VkUser: React.FC<IProps> = React.memo(({ isSelected, onCheck, toggleSelectedUser, currentUserPermissions, user, onDelete }) => {
    const navigate = useNavigate()

    const onDeleteHandler = useCallback(() => {
        onDelete(user.id)
    }, [])

    const onCheckHandler = useCallback(() => {
        onCheck(user.id)
    }, [])

    const onGetDetailedHandler = useCallback(() => {
        navigate(`${vkUsersPath}/${user.id}`)
    }, [])

    const actions = [
        { text: "Подробнее", callback: onGetDetailedHandler },
        { text: "Добавить", callback: onCheckHandler, requiredPermission: checkVkUserPermission },
        { text: "Удалить", class: "status-nav__link_red", callback: onDeleteHandler, requiredPermission: deleteVkUserPermission }]

    return (
        <div className="table__row">
            <div className="table__cell table__cell_top table__cell_check" data-cell>
                <div className="table__checkbox checkbox">
                    <label className="checkbox__label">
                        <input checked={isSelected} onChange={() => toggleSelectedUser(user.id)} className="checkbox__input" type="checkbox" />
                        <span className="checkbox__icon"></span>
                    </label>
                </div>
                <div className="table-user">
                    <img className="table-user__photo" src={user.imgUrl} alt="" />
                    <span className="table-user__name">{user.lastName} {user.firstName} {user.thirdName}</span>
                </div>
            </div>
            <div className="table__cell table__cell_mob" data-cell>
                <div className="table__mob-cols">
                    <span className="table__mob-desc">Пол</span>
                    <span className="table__mob-text">{user.sex ? "муж" : "жен"}</span>
                </div>
            </div>
            <div className="table__cell table__cell_mob" data-cell>
                <div className="table__mob-cols">
                    <span className="table__mob-desc">Возраст</span>
                    <span className="table__mob-text">{user.age || "-"}</span>
                </div>
            </div>
            <div className="table__cell table__cell_mob" data-cell>
                <div className="table__mob-cols">
                    <span className="table__mob-desc">Геоданные</span>
                    <span className="table__mob-text">{locationPipes.location([user.countryName, user.regionName])}</span>
                </div>
            </div>
            <div className="table__cell table__cell_mob" data-cell>
                <div className="table__mob-cols">
                    <span className="table__mob-desc">Дата <br />активности</span>
                    <span className="table__mob-text">{formatDate(new Date(+(new Date(user.lastActive).getTime())))}</span>
                </div>
            </div>
            <div className="table__cell table__cell_mob" data-cell>
                <div className="table__mob-cols">
                    <span className="table__mob-desc">Статус</span>
                    <span className="table__mob-text">{user.closed ? "закрытый" : "открытый"}</span>
                </div>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Деструктивные <br />сообщества</span>
                    <span className="table__tablet-text">
                        {<span className="table__category">{user.groups.map((group) => group.id)}</span>}
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
                    <div className="desktop-actions__col" onClick={onGetDetailedHandler}>
                        <div className="show-more js-show-more">
                            <a className="show-more__button js-show-button" href="#"></a>
                            <span className="show-more__tooltip js-show-tooltip">Подробнее</span>
                        </div>
                    </div>
                    {
                        !user.isChecked && currentUserPermissions.includes(checkVkUserPermission) && <div className="desktop-actions__col" onClick={onCheckHandler}>
                            <div className="show-more js-show-more">
                                <button className="action-button action-button_accept" type="button"></button>
                                <span className="show-more__tooltip js-show-tooltip">Добавить</span>
                            </div>
                        </div>
                    }
                    {
                        currentUserPermissions.includes(deleteVkUserPermission) && <div className="desktop-actions__col">
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
