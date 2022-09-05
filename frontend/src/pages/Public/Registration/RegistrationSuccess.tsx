import { Link } from "react-router-dom"

export const RegistrationSuccess: React.FC = () => {

    return (

        <div className="login-page__content">
            <div className="login-page__top">
                <h1 className="login-page__title">Заявка на регистрацию отправлена</h1>
                <p className="login-page__text">После одобрения заявки администратором вам на почту придет&nbsp;письмо с инструкциями.</p>
            </div>
            <form>
                <div className="reg-form">
                    <div className="reg-form__sended">
                        <div className="reg-form__cols">
                            <div className="reg-form__col">
                                <Link to="/login" className="reg-form__button button">На главную</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
