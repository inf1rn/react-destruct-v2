import classNames from 'classnames'
import React, { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import { NavTab } from '../../components/Common/UI/NavTab'
import { vkCommunitiesPath, vkComparePath, vkInfographicsPath, vkSearchPath, vkUsersPath } from '../../constants/links'
import { useGetCurrentUserPermissions } from '../../hooks/account'

export const VkView = () => {
    const location = useLocation()
    const permissions = useGetCurrentUserPermissions()

    return (
        <>
            <div className="inner-page__top">
                <h1 className="inner-page__title inner-page__title_no-padding">ВКонтакте</h1>
            </div>

            <div className="user-nav">
                <div className="user-nav__scroll js-user-scroll">
                    <ul className="user-nav__list">
                        <NavTab currentPath={location.pathname} path={vkCommunitiesPath}>Сообщества</NavTab>
                        <NavTab currentPath={location.pathname} path={vkUsersPath}>Пользователи</NavTab>
                        {permissions.includes("view_vk_compare") && <NavTab currentPath={location.pathname} path={vkComparePath}>Сравнение <br />подписчиков</NavTab>}
                        {permissions.includes("view_vk_search") && <NavTab currentPath={location.pathname} path={vkSearchPath}>Поиск <br />подписок</NavTab>}
                        <NavTab currentPath={location.pathname} path={vkInfographicsPath}>Инфографика</NavTab>
                    </ul>
                </div>
            </div>
            <Suspense>
                <Outlet />
            </Suspense>
        </>

    )
}
