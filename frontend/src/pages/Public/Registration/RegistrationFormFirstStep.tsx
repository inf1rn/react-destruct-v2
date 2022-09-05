import classNames from 'classnames'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { setEmail, setPassword } from '../../../store/auth/registration/registration'
import * as Yup from "yup"
import { useTypedDispatch } from '../../../hooks/common'
import { Link } from 'react-router-dom'
import { EmailIcon } from '../../../components/Public/Auth/EmailIcon'
import { Bg } from '../../../components/Public/Auth/Bg'
import { PasswordIcon } from '../../../components/Public/Auth/PasswordIcon'
import { emailValidation, passwordValidation, repeatPasswordValidation } from '../../../validations/user'

interface IProps {
    onSubmit: () => void
}

const initialValues = {
    email: "",
    password: "",
    repeatPassword: ""
}

export const RegistrationFormFirstStep: React.FC<IProps> = ({ onSubmit }) => {
    const dispatch = useTypedDispatch()

    const submitHandler = (values: typeof initialValues) => {
        dispatch(setEmail({ email: values.email }))
        dispatch(setPassword({ password: values.password }))
        onSubmit()
    }

    const schema = Yup.object().shape({
        email: emailValidation,
        password: passwordValidation,
        repeatPassword: repeatPasswordValidation
    });

    return (
        <div className="login-page__cols">
            <div className="login-page__right">
                <Formik
                    initialValues={initialValues}
                    onSubmit={submitHandler}
                    validationSchema={schema}
                >
                    {({ handleChange, values, errors }) => (
                        <Form autoComplete="new-password">
                            <div className="login-form">
                                <div className="login-form__top">
                                    <h1 className="login-form__title">Регистрация</h1>
                                    <p className="login-form__text">Введите данные для регистрации в&nbsp;системе</p>
                                </div>
                                <div className="login-form__max">
                                    <div className="login-form__min-height">
                                        <div className="login-form__input-wrap input-wrap">
                                            <label className="input-icon" htmlFor="login-email">
                                                <EmailIcon />
                                            </label>
                                            <Field autoComplete="new-password" value={values.email} onChange={handleChange} className={classNames("text-input", "text-input_icon", "js-input-value", {
                                                active: values.email,
                                                error: errors.email
                                            })} id="login-email" type="email" name="email" />
                                            <label className="input-placeholder" htmlFor="login-email">Email</label>
                                        </div>
                                        <div className="login-form__input-wrap input-wrap">
                                            <label className="input-icon" htmlFor="login-password">
                                                <PasswordIcon />

                                            </label>
                                            <Field autoComplete="new-password" value={values.password} onChange={handleChange} className={classNames("text-input", "text-input_icon", "js-input-value", {
                                                active: values.password,
                                                error: errors.password
                                            })} id="login-password" type="password" name="password" />
                                            <label className="input-placeholder" htmlFor="login-password">Пароль</label>
                                        </div>
                                        <div className="login-form__input-wrap input-wrap">
                                            <label className="input-icon" htmlFor="login-password-repeat">
                                                <PasswordIcon />
                                            </label>
                                            <Field autoComplete="new-password" value={values.repeatPassword} onChange={handleChange} className={classNames("text-input", "text-input_icon", "js-input-value", {
                                                active: values.repeatPassword,
                                                error: errors.repeatPassword
                                            })} id="login-password-repeat" type="password" name="repeatPassword" />
                                            <label className="input-placeholder" htmlFor="login-password-repeat">Повторите пароль</label>
                                        </div>
                                        <div className="login-form__bottom">
                                            <button className="login-form__button button" type="submit">Далее</button>
                                        </div>
                                    </div>
                                    <div className="login-form__reg">
                                        <p className="login-form__reg-text">Уже есть аккаунт?</p>
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
