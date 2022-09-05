import React from 'react'
import { Link } from 'react-router-dom'
import { loginPath, registrationPath, technicalSupportPath } from '../../constants/links'

interface IProps {
    isActive: boolean
    setIsActive: (isActive: boolean) => void
}

export const Sidebar: React.FC<IProps> = React.memo(({ isActive, setIsActive }) => {
    return (
        <>
            {
                isActive &&
                <div className="hide-mob">
                    <div className="hide-mob__bg">
                        <div className="hide-mob__top"></div>
                        <div className="hide-mob__scroll js-mob-scroll">
                            <div className="hide-mob__content wrapper">
                                <div className="mob-nav">
                                    <ul className="mob-nav__list">
                                        <li className="mob-nav__item">
                                            <Link
                                                onClick={() => setIsActive(false)}
                                                className="mob-nav__link" to={loginPath}>Войти</Link>
                                        </li>
                                        <li className="mob-nav__item">
                                            <Link
                                                onClick={() => setIsActive(false)}
                                                className="mob-nav__link" to={registrationPath}>Регистрация</Link>
                                        </li>
                                    </ul>
                                </div>
                                <Link onClick={() => setIsActive(false)}
                                    className="button button_grey" to={technicalSupportPath}>Техническая поддержка</Link>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setIsActive(false)} className="hide-mob__mask js-mob-close"></div>
                </div>
            }
        </>
    )
})
