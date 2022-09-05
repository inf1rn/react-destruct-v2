import classNames from 'classnames'
import React, { useState } from 'react'
import logo from "../../assets/img/svg/logo-1.svg"
import { Sidebar } from './Sidebar'

export const Header = React.memo(() => {
    const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false)


    return (
        <>
            <header className="header">
                <div className="header__main wrapper">
                    <div className="header__cols">
                        <div className="header__col">
                            <div className="header-logo">
                                <img className="header-logo__image" src={logo} alt="" />
                            </div>
                        </div>
                        <div className="header__col header__col_mob">
                            <button onClick={() => setIsSidebarActive(!isSidebarActive)} className={classNames("mob-button",
                                {
                                    active: isSidebarActive
                                })} type="button">
                                <span className="mob-button__icon"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <Sidebar isActive={isSidebarActive} setIsActive={setIsSidebarActive} />
        </>
    )
})
