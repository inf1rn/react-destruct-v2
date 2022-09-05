import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

interface IProps extends React.PropsWithChildren {
    path: string
    currentPath: string
    liClass?: string
    linkClass?: string
}

export const NavTab: React.FC<IProps> = React.memo(({ path, children, currentPath, liClass = "user-nav__item", linkClass = "user-nav__link" }) => {

    return (
        <li className={classNames(liClass, "js-user-item", {
            active: currentPath.startsWith(path)
        })}>
            <Link to={path} className={linkClass}>{children}</Link>
        </li>
    )
})
