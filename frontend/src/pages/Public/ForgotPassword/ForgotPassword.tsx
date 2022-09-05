import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { FormPasswordSuccess } from './FormPasswordSuccess'

export const ForgotPassword = () => {
    const [isVisibleForm, setIsVisibleForm] = useState<boolean>(true)
    const [isVisibleSuccess, setIsVisibleSuccess] = useState<boolean>(false)
    return (
        <>
            <Helmet>
                <title>Восстановление пароля</title>
            </Helmet>
            {isVisibleForm && <ForgotPasswordForm onSubmit={() => {
                setIsVisibleForm(false)
                setIsVisibleSuccess(true)
            }} />}
            {isVisibleSuccess && <FormPasswordSuccess />}
        </>
    )
}
