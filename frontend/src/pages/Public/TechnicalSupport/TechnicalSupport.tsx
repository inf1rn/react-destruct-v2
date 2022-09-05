import React from 'react'
import { Helmet } from 'react-helmet'
import { technicalSupportAPI } from '../../../api/techniaclSupport'
import { TechnicalSupportForm } from './TechnicalSupportForm'
import { TechnicalSupportSuccess } from './TechnicalSupportSuccess'

export const TechnicalSupport = () => {
    const [sendMessage, { isSuccess }] = technicalSupportAPI.useSendMessageMutation()

    return (
        <>
            <Helmet>
                <title>Тех. поддержка</title>
            </Helmet>
            {
                !isSuccess ?

                    <TechnicalSupportForm onSubmit={sendMessage} />
                    :
                    <TechnicalSupportSuccess />
            }
        </>
    )
}
