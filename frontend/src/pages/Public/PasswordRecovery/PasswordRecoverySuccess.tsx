import React from 'react'
import { Link } from 'react-router-dom'
import { Bg } from '../../../components/Public/Auth/Bg'

export const PasswordRecoverySuccess = () => {
    return (
        <div className="login-page__cols">
            <div className="login-page__right">
                <form>
                    <div className="login-form">
                        <div className="login-form__top login-form__top_restore">
                            <h1 className="login-form__title">Восстановление пароля</h1>
                        </div>
                        <div className="login-form__max">
                            <div className="login-restored">
                                <img className="login-restored__icon" src="img/svg/check.svg" alt="" />
                                <p className="login-restored__text">Пароль успешно восстановлен. <br />Войдите в систему используя новый пароль</p>
                            </div>
                            <div className="login-form__bottom">
                                <Link className="login-form__button button" to="/login">Войти</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Bg />
        </div>)
}
