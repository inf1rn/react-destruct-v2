import { editorAPI } from '../../api/editor'
import { useEffect } from 'react'
import { accountAPI } from '../../api/account'
import { accountSelectors } from '../../store/account/selectors'
import { useSelector } from 'react-redux'
import { UserCard } from '../../components/Inner/Users/UserCard'
import { Helmet } from 'react-helmet'

export const Profile = () => {
    const [updateUser, { isSuccess: isSuccessUpdateUser }] = editorAPI.useUpdateUserMutation()
    const [uploadImage, { isSuccess: isSuccessUploadImage }] = accountAPI.useUploadImageMutation()
    const jwt = useSelector(accountSelectors.jwt)
    const { data: user, refetch } = accountAPI.useGetCurrentQuery({ jwt })
    useEffect(() => {
        if (isSuccessUpdateUser || isSuccessUploadImage) {
            refetch()
        }

    }, [isSuccessUploadImage, isSuccessUpdateUser])

    return (
        <>
            {user && <Helmet>
                <title>{user?.firstName} {user?.lastName} {user?.patronymic}</title>
            </Helmet>}
            <div className="inner-page__top inner-page__top_hide-tablet">
                <h1 className="inner-page__title">Мой профиль</h1>
            </div>
            {user && <UserCard withRole={false} user={user} onSubmitUserData={updateUser} onSubmitUserImage={uploadImage} />}
        </>
    )
}
