import React from 'react'
import { Helmet } from 'react-helmet'
import { Outlet, useLocation } from 'react-router'
import { NavTab } from '../../../components/Common/UI/NavTab'
import { parsersTelegramPath, parsersTiktokPath, parsersVkPath } from '../../../constants/links'

export const ParsersView = () => {
  const location = useLocation()

  return (
    <>
      <Helmet>
        <title>Парсеры</title>
      </Helmet>
      <div className="inner-page__top">
        <h1 className="inner-page__title inner-page__title_no-padding">Парсеры</h1>
      </div>

      <div className="user-nav user-nav_parsers">
        <div className="user-nav__scroll js-user-scroll">
          <ul className="user-nav__list">
            <NavTab currentPath={location.pathname} path={parsersVkPath}>ВКонтакте</NavTab>
            <NavTab currentPath={location.pathname} path={parsersTelegramPath}>Телеграм</NavTab>
            <NavTab currentPath={location.pathname} path={parsersTiktokPath}>Тикток</NavTab>

          </ul>
        </div>
      </div>
      <Outlet />
    </>
  )
}
