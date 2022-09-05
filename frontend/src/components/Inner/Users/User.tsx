import React, { useCallback, useMemo } from 'react'
import { accountStorage } from '../../../constants/api'
import { selectorsLocation } from '../../../store/location/selectors'
import { IUser } from '../../../types/users'
import { locationAPI } from "../../../api/location"
import { formatDate } from '../../../utils/date'
import { accountAPI } from '../../../api/account'
import { useNavigate } from 'react-router'
import { usersPath } from '../../../constants/links'
import { MoreBtn } from '../../Common/UI/Table/MoreBtn'
import { SelectComponent } from '../../Common/UI/SelectComponent'
import { locationPipes } from '../../../pipes/location/location'
import { selectPipes } from '../../../pipes/select/select'

interface IProps {
    user: IUser
    currentUserPermissions: Array<string>
    isSelected: boolean
    onDelete: (id: number) => void
    onChangeStatus: (user: IUser, statusId: number) => void
    onChangeRole: (user: IUser, roleId: number) => void
    toggleSelectedUser: (id: number) => void
}

export const User: React.FC<IProps> = React.memo(({ user, isSelected, toggleSelectedUser, currentUserPermissions, onDelete, onChangeStatus, onChangeRole }) => {
    const { data: regions } = locationAPI.useGetAllQuery()
    const { data: statuses } = accountAPI.useGetStatusesQuery()
    const { data: roles } = accountAPI.useGetRolesQuery()

    const isCanBeChanged = React.useMemo(() => user.roles[0]?.requiredPermissionsToSet.some(requiredPermission => currentUserPermissions.includes(requiredPermission.name)), [currentUserPermissions, user])

    const { firstName, lastName, patronymic, city, district: regionId, imgUrl, email, workplace, lastVisit } = user
    const region = useMemo(() => {
        if (regions && regionId) {
            return selectorsLocation.district(regions, regionId)
        }
    }, [regions])
    const formatedLastVisit = useMemo(() => formatDate(lastVisit), [lastVisit])
    const navigate = useNavigate()

    const onDeleteHandler = useCallback(() => {
        onDelete(user.id)
    }, [])

    const onEditHandler = useCallback(() => {
        navigate(`${usersPath}/id${user.id}`)
    }, [])

    const actions = [
        { text: "Редактировать", callback: onEditHandler, isActive: isCanBeChanged },
        { text: "Удалить", class: "status-nav__link_red", callback: onDeleteHandler, isActive: isCanBeChanged }
    ]

    return (
        <div className="table__row">
            <div className="table__cell table__cell_top table__cell_check" regions-cell>
                <div className="table__checkbox checkbox">
                    <label className="checkbox__label">
                        <input checked={isSelected} onChange={() => toggleSelectedUser(user.id)} className="checkbox__input" type="checkbox" />
                        <span className="checkbox__icon"></span>
                    </label>
                </div>
                <div className="table-user">
                    <img className="table-user__photo" src={accountStorage + imgUrl} alt="" />
                    <span className="table-user__name">{lastName} {firstName} {patronymic}</span>
                </div>
            </div>
            <div className="table__cell table__cell_mob" regions-cell>
                <div className="table__mob-cols">
                    <span className="table__mob-desc">Email</span>
                    <span className="table__mob-text">{email}</span>
                </div>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Геоданные</span>
                    <span className="table__tablet-text">{locationPipes.location([region?.regionName, city])}</span>
                </div>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Место работы</span>
                    <span className="table__tablet-text">{workplace}</span>
                </div>
            </div>
            <div className="table__cell table__cell_mob" regions-cell>
                <div className="table__mob-cols">
                    <span className="table__mob-desc">Роль</span>
                    {/* <select value={user.roles[0]?.id} onChange={(e) => onChangeRole(user, +e.target.value)}>
                        {roles?.map((role) => <option
                            hidden={
                                !role.requiredPermissionsToSet.some(permission => currentUserPermissions.includes(permission.name))
                                || !isCanBeChanged
                            } value={role.id} key={role.id}>{role.rusName}</option>)}
                    </select> */}
                    <div className="table__tablet-text">
                        <div className="status js-nav active">
                            {!isCanBeChanged && user?.roles?.[0].rusName}
                            
                            {roles && isCanBeChanged && <SelectComponent currentValue={String(user.roles[0]?.id)} onChange={(e) => {
                                if (e) {
                                    onChangeRole(user, +e)
                                }
                            }} options={selectPipes.options(roles.filter(role => {
                                return (
                                    role.requiredPermissionsToSet.some(permission => currentUserPermissions.includes(permission.name))
                                    && isCanBeChanged
                                )
                            }), "rusName", "id")} />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="table__cell table__cell_mob" regions-cell>
                <div className="table__mob-cols">
                    <span className="table__mob-desc">Последняя <br />авторизация</span>
                    <span className="table__mob-text">{formatedLastVisit}</span>
                </div>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Статус</span>
                    <div className="table__tablet-text">
                        <div className="status js-nav active">
                        {!isCanBeChanged && user?.status.rusName}
                            {/* <select value={user.status.id} onChange={(e) => onChangeStatus(user, +e.target.value)}>
                                {statuses?.map((status) => <option value={status.id} key={status.id}>{status.rusName}</option>)}
                            </select> */}
                            {statuses && isCanBeChanged && <SelectComponent currentValue={String(user.status.id)} onChange={(e) => {
                                if (e) {
                                    onChangeStatus(user, +e)
                                }
                            }} options={selectPipes.options(statuses, "rusName", "id")} />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="table__cell table__cell_top" regions-cell>
                <div className="desktop-actions">
                    {
                        isCanBeChanged && <>
                            <div className="desktop-actions__col">
                                <div className="show-more js-show-more">
                                    <button onClick={() => navigate(usersPath + `/id${user.id}`)} className="action-button action-button_edit js-show-button" type="button"></button>
                                    <span className="show-more__tooltip js-show-tooltip">Редактировать</span>
                                </div>
                            </div>
                            <div className="desktop-actions__col">
                                <div className="show-more js-show-more">
                                    <button onClick={e => onDelete(user.id)} className="action-button action-button_remove js-show-button" type="button"></button>
                                    <span className="show-more__tooltip js-show-tooltip">Удалить</span>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <MoreBtn actions={actions} />

            </div>
        </div>
    )
})
