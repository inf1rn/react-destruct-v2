import classNames from 'classnames'
import { Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { authAPI } from '../../../api/auth'
import * as Yup from "yup"

import { passwordRecoveryPath } from '../../../constants/links'
import { Bg } from '../../../components/Public/Auth/Bg'
import { EmailIcon } from '../../../components/Public/Auth/EmailIcon'
import { emailValidation } from '../../../validations/user'

interface IProps {
    onSubmit: () => void
}

export const ForgotPasswordForm: React.FC<IProps> = ({ onSubmit }) => {
    const [passwordRecoveryEmail, { isSuccess }] = authAPI.usePasswordRecoveryEmailMutation()

    const schema = Yup.object().shape({
        email: emailValidation
    });

    useEffect(() => {
        if (isSuccess) {
            onSubmit()
        }
    }, [isSuccess])

    return (

        <div className="login-page__cols">
            <div className="login-page__right">
                <Formik
                    initialValues={{
                        email: ""
                    }}
                    validationSchema={schema}
                    onSubmit={(values) => {
                        passwordRecoveryEmail({
                            email: values.email,
                            link: window.location.origin + passwordRecoveryPath
                        })
                        onSubmit()
                    }}
                >
                    {
                        ({ values, handleChange, errors }) => (
                            <Form>
                                <div className="login-form">
                                    <div className="login-form__max">
                                        <div className="login-form__min-height login-form__min-height_forgot">
                                            <div className="login-form__top">
                                                <h1 className="login-form__title">Забыли пароль?</h1>
                                                <p className="login-form__text">Введите свой адрес электронной почты для восстановления пароля</p>
                                            </div>
                                            <div className="login-form__input-wrap input-wrap">
                                                <label className="input-icon" htmlFor="login-email">
                                                    <EmailIcon />
                                                </label>
                                                <input value={values.email} onChange={handleChange} name="email" className={classNames("text-input", "text-input_icon", "js-input-value", {
                                                    active: values.email,
                                                    error: errors.email
                                                })} id="login-email" type="email" />
                                                <label className="input-placeholder" htmlFor="login-email">Email</label>
                                            </div>
                                            <div className="login-form__bottom">
                                                <button className="login-form__button button" type="submit">Отправить</button>
                                            </div>
                                        </div>
                                        <div className="login-form__reg">
                                            <Link className="login-form__button button button_grey" to="/login">Войти</Link>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                </Formik>
            </div>
            <Bg />
        </div>
    )
}
