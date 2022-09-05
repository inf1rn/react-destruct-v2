import { Field, Form, Formik } from 'formik'
import React from 'react'
import { technicalSupportAPI } from '../../../api/techniaclSupport'
import { ITechnicalSupportMessage } from '../../../types/technicalSupport'
import * as Yup from "yup"
import { emailValidation } from '../../../validations/user'
import { messageValidation } from '../../../validations/technicalSupport'
import classNames from 'classnames'
import { checkboxValidation } from '../../../validations/common'

interface IProps {
    onSubmit: (values: ITechnicalSupportMessage) => void
}

const schema = Yup.object().shape({
    email: emailValidation,
    message: messageValidation,
    isAccept: checkboxValidation
})

export const TechnicalSupportForm: React.FC<IProps> = ({ onSubmit }) => {
    return (
        <div className="login-page__content">
            <div className="login-page__top login-page__top_support">
                <h1 className="login-page__title">Обращение в техническу поддержку</h1>
                <p className="login-page__text">Заполните поля, чтобы отправить обращение в теххподдержку.</p>
            </div>
            <Formik initialValues={{
                email: "",
                message: "",
                isAccept: false
            }} onSubmit={(values) => { onSubmit(values) }} validationSchema={schema}>
                {({ values, handleChange, errors }) => (
                    <Form>
                        <div className="reg-form">
                            <div className="reg-form__support">
                                <div className="reg-form__cols">
                                    <div className="reg-form__col">
                                        <div className="reg-form__input-wrap reg-form__input-wrap_support input-wrap input-wrap_small-mob">
                                            <Field value={values.email} onChange={handleChange} name="email" className={classNames("text-input", {
                                                active: values.email,
                                                error: errors.email
                                            })} type="email" id="support-email" />
                                            <label className="input-placeholder" htmlFor="support-email">Ваш Email</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="reg-form__cols">
                                    <div className="reg-form__col">
                                        <div className="reg-form__input-wrap reg-form__input-wrap_support input-wrap input-wrap_small-mob">
                                            <Field as="textarea" value={values.message} onChange={handleChange} name="message" className={classNames("textarea", {
                                                active: values.message,
                                                error: errors.message
                                            })} id="support-text" />
                                            <label className="input-placeholder" htmlFor="support-text">Ваше обращение</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="reg-form__checkbox checkbox">
                                    <label className="checkbox__label">
                                        <Field name="isAccept" onChange={handleChange} checked={values.isAccept} className="checkbox__input" type="checkbox" />
                                        <span className="checkbox__icon"></span>
                                        <span className="checkbox__text">Согласен на обработку персональных данных</span>
                                    </label>
                                </div>
                                <div className="reg-form__cols">
                                    <div className="reg-form__col">
                                        <button className="reg-form__button button" type="submit">Отправить</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )
                }
            </Formik>
        </div>


    )
}
