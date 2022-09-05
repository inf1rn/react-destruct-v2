import React from 'react'
import { Outlet, useLocation } from 'react-router'
import { NavTab } from '../../../components/Common/UI/NavTab'
import { parsersTelegramChannelsPath, parsersTelegramPostsPath } from '../../../constants/links'

export const ParsersTelegramView = () => {
    const location = useLocation()

    return (
        <>
            <div className="date-nav date-nav_padding">
                <div className="date-nav__scroll js-filters-scroll">
                    <ul className="date-nav__list">
                        <NavTab liClass="date-nav__item" linkClass="date-nav__button" path={parsersTelegramChannelsPath} currentPath={location.pathname}>Парсер каналов</NavTab>
                        <NavTab liClass="date-nav__item" linkClass="date-nav__button" path={parsersTelegramPostsPath} currentPath={location.pathname}>Парсер записей</NavTab>
                    </ul>
                </div>
            </div>
            <Outlet />
        </>
    )
}
