import React from 'react'
import { Outlet, useLocation } from 'react-router'
import { NavTab } from '../../../components/Common/UI/NavTab'
import { parsersVkGroupsPath, parsersVkUsersPath } from '../../../constants/links'

export const ParsersVkView = () => {
    const location = useLocation()

    return (
        <>
            <div className="date-nav date-nav_padding">
                <div className="date-nav__scroll js-filters-scroll">
                    <ul className="date-nav__list">
                        <NavTab liClass="date-nav__item" linkClass="date-nav__button" path={parsersVkGroupsPath} currentPath={location.pathname}>Парсер сообществ</NavTab>
                        <NavTab liClass="date-nav__item" linkClass="date-nav__button" path={parsersVkUsersPath} currentPath={location.pathname}>Парсер пользователей</NavTab>
                    </ul>
                </div>
            </div>
            <Outlet />
        </>
    )
}
