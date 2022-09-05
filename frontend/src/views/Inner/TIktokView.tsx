import classNames from 'classnames'
import React, { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import { NavTab } from '../../components/Common/UI/NavTab'
import { tiktokInfographicsPath, tiktokPostsPath, tiktokUsersPath } from '../../constants/links'

export const TiktokView = () => {
    const location = useLocation()

    return (
        <>
            <div className="inner-page__top">
                <h1 className="inner-page__title inner-page__title_no-padding">TikTok</h1>
            </div>

            <div className="user-nav">
                <div className="user-nav__scroll js-user-scroll">
                    <ul className="user-nav__list">
                        <NavTab currentPath={location.pathname} path={tiktokUsersPath}>Пользователи</NavTab>
                        <NavTab currentPath={location.pathname} path={tiktokPostsPath}>Публикации</NavTab>
                        <NavTab currentPath={location.pathname} path={tiktokInfographicsPath}>Инфографика</NavTab>
                    </ul>
                </div>
            </div>
            <Suspense>
                <Outlet />
            </Suspense>
        </>

    )
}
