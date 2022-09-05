import React from 'react'
import { Link } from 'react-router-dom'

import bg from "../../../assets/img/login-page-bg.png"
import bgTablet from "../../../assets/img/login-page-bg-tablet.png"

export const FormPasswordSuccess = () => {
    return (

        <div className="login-page__cols">
            <div className="login-page__right">
                <form>
                    <div className="login-form">
                        <div className="login-form__max">
                            <div className="login-form__min-height login-form__min-height_forgot">
                                <div className="login-form__top">
                                    <h1 className="login-form__title">Забыли пароль?</h1>
                                </div>
                                <p className="login-form__sended-text">На ваш адрес электронной почты будет отправлено письмо с дальнейшими инструкциями.</p>
                            </div>
                            <div className="login-form__reg">
                                <Link className="login-form__button button button_grey" to="/login">Войти</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <img className="login-page__bg login-page__bg_desktop" src={bg} alt="" />
            <img className="login-page__bg login-page__bg_tablet" src={bgTablet} alt="" />
        </div>
    )
}
