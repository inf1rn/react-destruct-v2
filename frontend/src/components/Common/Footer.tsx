import React from 'react'
import { Link } from 'react-router-dom'
import { technicalSupportPath } from '../../constants/links'

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__main wrapper">
                <div className="footer__cols">
                    <div className="footer__col footer__col_hide-mob">
                        <Link to={technicalSupportPath} className="footer__link">Написать в техподдержку</Link>
                    </div>
                    <div className="footer__col">&copy; Все права защищены</div>
                </div>
            </div>
        </footer>
    )
}
