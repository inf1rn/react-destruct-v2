import React from 'react'
import iconPopupSuccess from "../../../assets/img/svg/popup-success.svg"
import { ISubculture } from '../../../types/subcultures'

interface IProps {
    onClose: () => void
    subculture: ISubculture
}

export const NewSubcultureSuccess: React.FC<IProps> = React.memo(({ onClose, subculture }) => {
    return (
        <div className="inner-page__line inner-page__line_hide-mob">
            <div className="popup popup_content">
                <div className="popup__cols">
                    <div className="popup__col">
                        <div className="popup-alert">
                            <img className="popup-alert__icon" src={iconPopupSuccess} alt="" />
                            <span className="popup-alert__text">Субкультура <a className="popup-alert__user" href="#">{subculture.name}</a> успешно добавлена.</span>
                        </div>
                    </div>
                    <div className="popup__col">
                        <button onClick={onClose} className="popup__button button button_small">OK</button>
                    </div>
                </div>
            </div>
        </div>)
})
