import { skipToken } from '@reduxjs/toolkit/dist/query'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router'
import { accountAPI } from '../../../api/account'
import { editorAPI } from '../../../api/editor'
import { UserCard } from '../../../components/Inner/Users/UserCard'
import { usersPath } from '../../../constants/links'
import { useGetCurrentUserPermissions } from '../../../hooks/account'
import { IUser } from '../../../types/users'

import warningIcon from "../../../assets/img/svg/warning.svg"
import { Link } from 'react-router-dom'

export const CurrentUser = () => {
  const [isRequestSelectActive, setIsRequestSelectActive] = useState<boolean>(false)
  const permissions = useGetCurrentUserPermissions()

  const { id } = useParams()
  const navigate = useNavigate()

  const { data: user } = editorAPI.useGetUserQuery((id && +id) || skipToken)
  const isCanBeChanged = React.useMemo(() => user?.roles[0]?.requiredPermissionsToSet.some(requiredPermission => permissions.includes(requiredPermission.name)), [permissions, user])

  useEffect(() => {
    if (user && !user.roles[0]?.requiredPermissionsToSet.some(requiredPermission => permissions.includes(requiredPermission.name))) {
      navigate(usersPath)
    }
  }, [user, permissions])

  const [updateUser] = editorAPI.useUpdateUserMutation()
  const [uploadImage] = accountAPI.useUploadImageMutation()

  const { data: roles } = accountAPI.useGetRolesQuery()
  const { data: statuses } = accountAPI.useGetStatusesQuery()



  return (
    <section className="inner-page inner-wrapper">
      {user && <Helmet>
        <title>{user?.firstName} {user?.lastName} {user?.patronymic}</title>
      </Helmet>}
      <div className="inner-page__border">
        <div className="inner-page__back">
          <Link className="back-button" to={usersPath}></Link>
        </div>
        <h1 className="inner-page__title">Редактирование пользователя</h1>
      </div>

      {
        user?.status.name === "waiting" && <div className="request-block">
          <div className="request-block__bg">
            <div className="request-block__left">
              <div className="request">
                <img className="request__icon" src={warningIcon} alt="" />
                <h2 className="request__title">Заявка на регистрацию:</h2>
                <p className="request__text"><a className="request__link" href="#">{user?.lastName} {user?.firstName} {user?.patronymic}</a></p>
              </div>
            </div>
            <div className="request-block__right">
              <div className="request-block__cols">
                <div className="request-block__col">
                  <div className="request-block__status status js-nav active"
                    onMouseEnter={() => setIsRequestSelectActive(true)}
                    onMouseLeave={() => setIsRequestSelectActive(false)}>
                    <button className={classNames("request-block__button", "button", "button_small",
                      { active: isRequestSelectActive })} type="button">
                      <span className="button__select">Принять</span>
                    </button>
                    <div className="status-nav" style={{ display: isRequestSelectActive ? "block" : "none" }}>

                      {
                        roles?.map(role => (role.requiredPermissionsToSet.some(permission => permissions.includes(permission.name)) && isCanBeChanged) && (
                          <div key={role.id} onClick={() => {
                            if (!(statuses && roles)) {
                              return
                            }

                            const editableUser = { ...user } as Partial<IUser>

                            delete editableUser.status
                            delete editableUser.roles

                            const statusId = statuses.find(status => status.name === "accepted")?.id

                            if (!statusId) {
                              return
                            }

                            editableUser.statusId = statusId
                            editableUser.roleId = role.id

                            updateUser(editableUser)
                          }} className="status-nav__item ">
                            <span className="status-nav__link">{role.rusName}</span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className="request-block__col">
                  <button onClick={() => {
                    const editableUser = { ...user } as Partial<IUser>

                    delete editableUser.status
                    delete editableUser.roles

                    const statusId = statuses?.find(status => status.name === "declined")?.id
                    if (!statusId) {
                      return
                    }

                    editableUser.statusId = statusId
                    updateUser(editableUser)
                  }} className="request-block__button button button_small button_grey button_grey-text" type="button">Отклонить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {user && <UserCard user={user} onSubmitUserData={updateUser} onSubmitUserImage={uploadImage} />}
    </section >
  )
}
