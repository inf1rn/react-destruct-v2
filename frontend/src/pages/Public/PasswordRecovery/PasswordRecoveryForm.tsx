import classNames from 'classnames'
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as Yup from "yup"
import { authAPI } from '../../../api/auth'
import { Bg } from '../../../components/Public/Auth/Bg'

import { PasswordIcon } from '../../../components/Public/Auth/PasswordIcon'
import { passwordValidation, repeatPasswordValidation } from '../../../validations/user'

interface IProps {
    onSubmit: () => void
}

export const PasswordRecoveryForm: React.FC<IProps> = ({ onSubmit }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const [passwordRecovery, { isSuccess }] = authAPI.usePasswordRecoveryMutation()

    useEffect(() => {
        if (!searchParams.get("token")) {
            navigate("/login")
        }
    }, [])

    useEffect(() => {
        if (isSuccess) {
            onSubmit()
        }
    }, [isSuccess])

    const schema = Yup.object().shape({
        password: passwordValidation,
        repeatPassword: repeatPasswordValidation
    });

    return (
        <div className="login-page__cols">
            <div className="login-page__right">
                <Formik
                    initialValues={{
                        password: "",
                        repeatPassword: ""
                    }}
                    validationSchema={schema}
                    onSubmit={(values) => {
                        const token = searchParams.get("token")

                        if (!token) {
                            return
                        }

                        passwordRecovery({
                            password: values.password,
                            token
                        })
                    }}
                >
                    {
                        ({ values, handleChange, errors }) => (
                            <Form>
                                <div className="login-form">
                                    <div className="login-form__top login-form__top_restore">
                                        <h1 className="login-form__title">Восстановление пароля</h1>
                                        <p className="login-form__text">Введите новый пароль. Пароль должен содержать минимум 8 символов: заглавные и строчные буквы, цифры</p>
                                    </div>
                                    <div className="login-form__max">
                                        <div className="login-form__input-wrap input-wrap">
                                            <label className="input-icon" htmlFor="password">
                                                <PasswordIcon />
                                            </label>
                                            <Field value={values.password} name="password" onChange={handleChange} className={classNames("text-input", "text-input_icon", "js-input-value", {
                                                active: values.password,
                                                error: errors.password
                                            })} id="password" type="password" />
                                            <label className="input-placeholder" htmlFor="password">Новый пароль</label>
                                        </div>
                                        <div className="login-form__input-wrap input-wrap">
                                            <label className="input-icon" htmlFor="repeatPassword">
                                                <PasswordIcon />
                                            </label>
                                            <Field value={values.repeatPassword} name="repeatPassword" onChange={handleChange} className={classNames("text-input", "text-input_icon", "js-input-value", {
                                                active: values.repeatPassword,
                                                error: errors.repeatPassword
                                            })} id="repeatPassword" type="password" />
                                            <label className="input-placeholder" htmlFor="repeatPassword">Повторите новый пароль</label>
                                        </div>
                                        <div className="login-form__bottom">
                                            <button className="login-form__button button" type="submit">Сохранить</button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
            <Bg />
        </div>)
}
