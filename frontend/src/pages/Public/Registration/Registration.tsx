import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { RegistrationFormFirstStep } from './RegistrationFormFirstStep'
import { RegistrationFormSecondStep } from './RegistrationFormSecondStep'
import { RegistrationSuccess } from './RegistrationSuccess'

export const Registration = () => {
    const [isVisibleFormFirstStep, setIsVisibleFormFirstStep] = useState<boolean>(true)
    const [isVisibleFormSecondStep, setIsVisibleFormSecondStep] = useState<boolean>(false)
    const [isVisibleSuccess, setIsVisibleSuccess] = useState<boolean>(false)


    const handlerOnSubmitFormFirstStep = () => {
        setIsVisibleFormFirstStep(false)
        setIsVisibleFormSecondStep(true)
    }

    const handlerOnSubmitFormSecondStep = () => {
        setIsVisibleFormSecondStep(false)
        setIsVisibleSuccess(true)
    }

    return (
        <>
            <Helmet>
                <title>Регистрация</title>
            </Helmet>
            {isVisibleFormFirstStep && <RegistrationFormFirstStep onSubmit={handlerOnSubmitFormFirstStep} />}
            {isVisibleFormSecondStep && <RegistrationFormSecondStep onSubmit={handlerOnSubmitFormSecondStep} />}
            {isVisibleSuccess && <RegistrationSuccess />}
        </>
    )
}
