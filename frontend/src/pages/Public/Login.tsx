import { Field, Form, Formik } from "formik"
import classNames from "classnames"
import { authAPI } from "../../api/auth"
import { Link } from "react-router-dom"
import { Bg } from "../../components/Public/Auth/Bg"
import { PasswordIcon } from "../../components/Public/Auth/PasswordIcon"
import { EmailIcon } from "../../components/Public/Auth/EmailIcon"
import { useEffect } from "react"
import { setJwt } from "../../store/account/account"
import { useTypedDispatch } from "../../hooks/common"
import { Helmet } from "react-helmet"

export const Login = () => {
  const [login, { data }] = authAPI.useLoginMutation()
  const dispatch = useTypedDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setJwt(data))
    }
  }, [data])

  return (
    <div className="login-page__cols">
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <div className="login-page__right">
        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          onSubmit={(values) => { login(values) }}
          validateOnBlur={true}
          isInitialValid={false}
        >
          {
            ({ handleChange, values }) => (
              <Form>
                <div className="login-form">
                  <div className="login-form__top">
                    <h1 className="login-form__title">Добро пожаловать!</h1>
                    <p className="login-form__text">Введите данные для входа в систему</p>
                  </div>
                  <div className="login-form__max">
                    <div className="login-form__min-height">
                      <div className="login-form__input-wrap input-wrap">
                        <label className="input-icon" htmlFor="login-email">
                          <EmailIcon />
                        </label>
                        <Field value={values.username} onChange={handleChange} name="username" className={classNames("text-input", "text-input_icon", "js-input-value", {
                          active: true
                        })} id="login-email" type="email" />
                        <label className="input-placeholder" htmlFor="login-email">Email</label>
                      </div>
                      <div className="login-form__input-wrap input-wrap">
                        <label className="input-icon" htmlFor="login-password">
                          <PasswordIcon />
                        </label>
                        <Field value={values.password} onChange={handleChange} name="password" className={classNames("text-input", "text-input_icon", "js-input-value", {
                          active: true
                        })} id="login-password" type="password" />
                        <label className="input-placeholder" htmlFor="login-password">Пароль</label>
                      </div>
                      <div className="checkbox">
                        <label className="checkbox__label">
                          <input className="checkbox__input" type="checkbox" />
                          <span className="checkbox__icon"></span>
                          <span className="checkbox__text">Запомнить email и пароль</span>
                        </label>
                      </div>
                      <div className="login-form__bottom">
                        <button className="login-form__button button" type="submit">Войти</button>
                        <Link className="login-form__link" to="/forgot-password">Забыли пароль?</Link>
                      </div>
                    </div>
                    <div className="login-form__reg">
                      <p className="login-form__reg-text">Нет аккаунта?</p>
                      <Link className="login-form__button button button_grey" to="/registration">Регистрация</Link>
                    </div>
                  </div>
                </div>
              </Form>
            )
          }
        </Formik>
      </div>
      <Bg />
    </div>
  )
}
