import classNames from "classnames"
import { Link, useLocation } from "react-router-dom"
import { parsersPath, profilePath, statisticsPath, subculturesAndTagsPath, telegramPath, tiktokPath, usersPath, vkPath } from "../../constants/links"
import { useGetCurrentUser, useGetCurrentUserPermissions, useLogout } from "../../hooks/account"
import React, { useCallback, useState } from "react"
import { viewParsersPermission, viewSubculturesPermission, viewTagsPermission, viewUsersPermission } from "../../constants/permissions"
import { Sidebar } from "./Sidebar"
import iconHeader from "../../assets/img/svg/logo-2.svg"
import { useDispatch, useSelector } from "react-redux"
import { appSelectors } from "../../store/app/selectors"
import { setModerate } from "../../store/app/app"
import { setFiltersIsChecked as setFiltersIsCheckedVkCompare } from "../../store/vk/groups/compare/reducer"
import { setFiltersIsChecked as setFiltersIsCheckedVkUsers } from "../../store/vk/users/reducer"
import { setFiltersIsChecked as setFiltersIsCheckedVkGroups } from "../../store/vk/groups/reducer"
import { setFiltersIsChecked as setFiltersIsCheckedTelegramChannels } from "../../store/telegram/channels/reducer"
import { setFiltersIsChecked as setFiltersIsCheckedTelegramPosts } from "../../store/telegram/posts/reducer"
import { setFiltersIsChecked as setFiltersIsCheckedTiktokUsers } from "../../store/tiktok/users/reducer"
import { setFiltersIsChecked as setFiltersIsCheckedTiktokPosts } from "../../store/tiktok/posts/reducer"


interface IHeaderTabProps extends React.PropsWithChildren {
  path: string
  iconClass: string
}

const HeaderTab: React.FC<IHeaderTabProps> = React.memo(({ path, iconClass, children }) => {
  const location = useLocation()

  return (
    <li className={classNames("header-nav__item", {
      active: location.pathname.startsWith(path)
    })}>
      <Link to={path} className="header-nav__link">
        <span className={classNames("header-nav__icon", iconClass)}></span>
        <span className="header-nav__cell">
          <span className="header-nav__text">{children}</span>
        </span>
      </Link>
    </li>
  )
})

interface IHeaderProps {
}

export const Header: React.FC<IHeaderProps> = React.memo(() => {

  const { data: user } = useGetCurrentUser()
  const permissions = useGetCurrentUserPermissions()
  const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false)
  const dispatch = useDispatch()

  const moderate = useSelector(appSelectors.moderate)

  const setIsSidebarActiveHandler = useCallback((isActive: boolean) => {
    setIsSidebarActive(isActive)
  }, [])

  const toggleModerate = () => {
    dispatch(setFiltersIsCheckedVkCompare({isChecked: !moderate}))
    dispatch(setFiltersIsCheckedVkGroups({isChecked: !moderate}))
    dispatch(setFiltersIsCheckedVkUsers({isChecked: !moderate}))
    dispatch(setFiltersIsCheckedTelegramChannels({isChecked: !moderate}))
    dispatch(setFiltersIsCheckedTelegramPosts({isChecked: !moderate}))
    dispatch(setFiltersIsCheckedTiktokPosts({isChecked: !moderate}))
    dispatch(setFiltersIsCheckedTiktokUsers({isChecked: !moderate}))

    dispatch(setModerate({ moderate: !moderate }))
  }

  const logout = useLogout()

  return (
    <>
      <header className="header header_inner">
        <div className="header__main inner-wrapper">
          <div className="header__cols">
            <div className="header__col">
              <div className="header-logo header-logo_inner">
                <img className="header-logo__image" alt="" src={iconHeader} />
              </div>
            </div>
            <div className="header__col header__col_desktop">
              <nav className="header-nav">
                <ul className="header-nav__list">
                  <HeaderTab path={vkPath} iconClass={"header-nav__icon_vk"}>ВКонтакте</HeaderTab>
                  <HeaderTab path={telegramPath} iconClass={"header-nav__icon_telegram"}>Telegram</HeaderTab>
                  <HeaderTab path={tiktokPath} iconClass={"header-nav__icon_tiktok"}>Tiktok</HeaderTab>
                  <HeaderTab path={statisticsPath} iconClass={"header-nav__icon_stats"}>Статистика</HeaderTab>

                  {permissions.includes(viewUsersPermission) && <HeaderTab path={usersPath} iconClass={"header-nav__icon_users"}>Пользователи</HeaderTab>}
                  {
                    permissions.includes(viewSubculturesPermission) && permissions.includes(viewTagsPermission) &&
                    <HeaderTab path={subculturesAndTagsPath} iconClass={"header-nav__icon_tags"}>Субкультуры <br />и теги</HeaderTab>
                  }
                  {permissions.includes(viewParsersPermission) && <HeaderTab path={parsersPath} iconClass={"header-nav__icon_parsers"}>Парсеры</HeaderTab>}
                </ul>
              </nav>
            </div>
            <div className="header__col header__col_desktop header__col_desktop-padding">
              <nav className="header-nav header-nav_right">
                <ul className="header-nav__list">
                  <li className="header-nav__item">
                    <div className="header-nav__link">
                      <label className="switch">
                        <input checked={moderate} onChange={() => toggleModerate()} type="checkbox" />
                        <span className="slider round"></span>
                      </label>
                      <span className="header-nav__cell header-nav__cell-cell">
                        <span className="header-nav__text">модерация</span>
                      </span>
                    </div>
                  </li>
                  <HeaderTab path={profilePath} iconClass={"header-nav__icon_profile"}>{user?.lastName} {user?.firstName[0]}.{user?.lastName[0]}.</HeaderTab>
                  <li onClick={() => logout()} className="header-nav__item">
                    <a className="header-nav__link" href="#">
                      <span className="header-nav__icon header-nav__icon_logout"></span>
                      <span className="header-nav__cell">
                        <span className="header-nav__text">Выйти</span>
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="header__col header__col_tablet">
              <button onClick={() => setIsSidebarActiveHandler(!isSidebarActive)} className={classNames("mob-button",
                {
                  active: isSidebarActive
                })} type="button">
                <span className="mob-button__icon"></span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <Sidebar isActive={isSidebarActive} setIsActive={setIsSidebarActiveHandler} />
    </>
  )
})
