import React, { useCallback, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { accountAPI } from '../../../api/account'
import { authAPI } from '../../../api/auth'
import { UserCard } from '../../../components/Inner/Users/UserCard'
import { usersPath } from '../../../constants/links'
import { useGetCurrentUserPermissions } from '../../../hooks/account'
import { setImageFile } from '../../../store/users/new/reducer'
import { newUserSelectors } from '../../../store/users/new/selectors'
import { IRegistrationBody } from '../../../types/auth'
import { IUser } from '../../../types/users'

const newUser = {
  city: "",
  district: null,
  email: "",
  firstName: "",
  lastName: "",
  patronymic: "",
  workplace: "",
  position: "",
  imgUrl: "",
  roles: [],
}

export const NewUser = () => {
  const [registration, { isSuccess: isSuccessRegistration }] = authAPI.useRegistrationMutation()
  const [uploadImage, { isSuccess: isSuccessUploadImage }] = accountAPI.useUploadImageMutation()

  const image = useSelector(newUserSelectors.image)
  const dispatch = useDispatch()

  const onSubmitCreateUser = useCallback((user: Partial<IRegistrationBody>) => {
    registration(user)
  }, [])

  const onChangeImage = useCallback((file: File | null) => {
    dispatch(setImageFile({ file }))
  }, [])

  useEffect(() => {
    uploadImage(image)
  }, [isSuccessRegistration])


  return (
    <>
      <Helmet>
        <title>Новый пользователь</title>
      </Helmet>
      <div className="inner-page__border">
        <div className="inner-page__back">
          <Link className="back-button" to={usersPath}></Link>
        </div>
        <h1 className="inner-page__title">Создать пользователя</h1>
      </div>
      <UserCard
        onSubmitUserData={onSubmitCreateUser}
        onSubmitUserImage={(values) => onChangeImage(values.file)}
        user={newUser}
      />
    </>
  )
}
