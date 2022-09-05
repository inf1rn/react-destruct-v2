import React from 'react'
import { Outlet, useLocation } from 'react-router'
import { NavTab } from '../../../components/Common/UI/NavTab'
import { parsersTiktokPostsPath, parsersTiktokUsersPath } from '../../../constants/links'

export const ParsersTiktokView = () => {
    const location = useLocation()

    return (
        <>
            <div className="date-nav date-nav_padding">
                <div className="date-nav__scroll js-filters-scroll">
                    <ul className="date-nav__list">
                        <NavTab liClass="date-nav__item" linkClass="date-nav__button" path={parsersTiktokUsersPath} currentPath={location.pathname}>Парсер пользователей</NavTab>
                        <NavTab liClass="date-nav__item" linkClass="date-nav__button" path={parsersTiktokPostsPath} currentPath={location.pathname}>Парсер записей</NavTab>
                    </ul>
                </div>
            </div>
            <Outlet />
        </>
    )
}
