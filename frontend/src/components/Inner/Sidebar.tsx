import classNames from 'classnames'
import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { accountStorage } from '../../constants/api'
import { parsersPath, profilePath, subculturesAndTagsPath, technicalSupportPath, telegramPath, tiktokPath, usersPath, vkPath } from '../../constants/links'
import { useGetCurrentUser, useGetCurrentUserPermissions, useLogout } from '../../hooks/account'

interface ISidebarProps {
    isActive: boolean
    setIsActive: (isActive: boolean) => void
}

interface ISidebarButtonProps extends React.PropsWithChildren {
    path: string
    iconClass: string
    onClick: () => void
}

const SidebarButton: React.FC<ISidebarButtonProps> = React.memo(({ children, path, iconClass, onClick }) => {
    return (
        <li className="inner-nav__item">
            <Link onClick={onClick} className="inner-nav__link" to={path}>
                <span className={classNames("inner-nav__icon", iconClass)}></span>
                <span className="inner-nav__cell">
                    <span className="inner-nav__text">{children}</span>
                </span>
            </Link>
        </li>
    )
})

export const Sidebar: React.FC<ISidebarProps> = React.memo(({ isActive, setIsActive }) => {
    const logout = useLogout()
    const { data: user } = useGetCurrentUser()
    const permissions = useGetCurrentUserPermissions()

    const closeSidebar = useCallback(() => {
        setIsActive(false)
    }, [])

    return (
        <>
            {
                isActive &&
                <div className="hide-mob">
                    <div className="hide-mob__bg">
                        <div className="hide-mob__top">
                            <span className="hide-mob__title">Меню</span>
                        </div>
                        <div className="hide-mob__scroll js-mob-scroll">
                            <div className="inner-mob">
                                <span className="inner-mob__title">Меню</span>
                                <div className="inner-user">
                                    <div className="inner-user__col">
                                        <img className="inner-user__photo" src={accountStorage + user?.imgUrl} alt="" />
                                    </div>
                                    <div className="inner-user__col">
                                        <span className="inner-user__name">{user?.lastName} {user?.firstName} {user?.patronymic}</span>
                                        <Link onClick={closeSidebar} className="inner-user__link" to={profilePath}>Посмотреть свой профиль</Link>
                                    </div>
                                </div>
                                <nav className="inner-nav">
                                    <ul className="inner-nav__list">
                                        <SidebarButton onClick={closeSidebar} path={vkPath} iconClass="inner-nav__icon_vk">ВКонтакте</SidebarButton>
                                        <SidebarButton onClick={closeSidebar} path={telegramPath} iconClass="inner-nav__icon_telegram">Telegram</SidebarButton>
                                        <SidebarButton onClick={closeSidebar} path={tiktokPath} iconClass="inner-nav__icon_tiktok">Tiktok</SidebarButton>
                                        <SidebarButton onClick={closeSidebar} path={""} iconClass="inner-nav__icon_stats">Статистика</SidebarButton>
                                        {permissions.includes("view_users") &&
                                            <SidebarButton onClick={closeSidebar} path={usersPath} iconClass="inner-nav__icon_users">Пользователи</SidebarButton>}
                                        {permissions.includes("view_subcultures") && permissions.includes("view_tags") &&
                                            <SidebarButton onClick={closeSidebar} path={subculturesAndTagsPath} iconClass="inner-nav__icon_tags">Субкультуры <br />и теги</SidebarButton>}
                                        {permissions.includes("view_parsers") && <SidebarButton onClick={closeSidebar} path={parsersPath} iconClass="inner-nav__icon_parsers">Парсеры</SidebarButton>}
                                        <li className="inner-nav__item inner-nav__item_support">
                                            <Link onClick={() => {
                                                closeSidebar()
                                            }} className="inner-nav__button button button_grey" to={technicalSupportPath}>Техническая поддержка</Link>
                                        </li>
                                        <li onClick={() => {
                                            logout()
                                            closeSidebar()
                                        }} className="inner-nav__item inner-nav__item_logout">
                                            <a className="inner-nav__link" href="#">
                                                <span className="inner-nav__icon inner-nav__icon_logout"></span>
                                                <span className="inner-nav__cell">
                                                    <span className="inner-nav__text">Выйти</span>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setIsActive(false)} className="hide-mob__mask js-mob-close"></div>
                </div>
            }
        </>
    )
})
