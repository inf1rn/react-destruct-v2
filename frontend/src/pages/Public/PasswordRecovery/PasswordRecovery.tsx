import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { PasswordRecoveryForm } from './PasswordRecoveryForm'
import { PasswordRecoverySuccess } from './PasswordRecoverySuccess'

export const PasswordRecovery = () => {
    const [isVisibleForm, setIsVisibleForm] = useState<boolean>(true)
    const [isVisibleSuccess, setIsVisibleSuccess] = useState<boolean>(false)


    const handlerOnSubmitForm = () => {
        setIsVisibleForm(false)
        setIsVisibleSuccess(true)
    }

    return (
        <>
            <Helmet>
                <title>Восстановление пароля</title>
            </Helmet>
            {isVisibleForm && <PasswordRecoveryForm onSubmit={handlerOnSubmitForm} />}
            {isVisibleSuccess && <PasswordRecoverySuccess />}
        </>
    )
}
