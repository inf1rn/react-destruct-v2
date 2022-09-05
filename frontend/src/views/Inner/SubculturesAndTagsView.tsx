import React, { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'
import { NavTab } from '../../components/Common/UI/NavTab'
import { subculturesPath, tagsPath } from '../../constants/links'

export const SubculturesAndTagsView = () => {
    const location = useLocation()

    return (
        <>
            <div className="inner-page__top">
                <h1 className="inner-page__title inner-page__title_no-padding">Субкультуры и теги</h1>
            </div>

            <div className="user-nav">
                <div className="user-nav__scroll js-user-scroll">
                    <ul className="user-nav__list user-nav__list_center">
                        <NavTab currentPath={location.pathname} path={subculturesPath}>Субкультуры</NavTab>
                        <NavTab currentPath={location.pathname} path={tagsPath}>Теги</NavTab>
                    </ul>
                </div>
            </div>
            <Suspense>
                <Outlet />
            </Suspense>
        </>
    )
}
