import React from 'react'
import { Link } from 'react-router-dom'
import iCheckIcon from "../../../assets/img/svg/check.svg"


export const TechnicalSupportSuccess = () => {
    return (
        <div className="login-page__content">
            <div className="login-page__top login-page__top_support">
                <h1 className="login-page__title">Обращение в техническу поддержку</h1>
            </div>
            <form>
                <div className="reg-form">
                    <div className="message-sended">
                        <img className="message-sended__icon" src={iCheckIcon} alt="" />
                        <p className="message-sended__text">Обращение успешно отправлено. С вами свяжутся по указанному email.</p>
                    </div>
                    <div className="reg-form__cols">
                        <div className="reg-form__col">
                            <Link to={"/"} className="reg-form__button button">На главную</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
