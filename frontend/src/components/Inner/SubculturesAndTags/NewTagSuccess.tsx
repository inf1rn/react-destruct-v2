import React from 'react'
import { ITag } from '../../../types/tags'

interface IProps {
    onClose: () => void
    tag: ITag
}

export const NewTagSuccess: React.FC<IProps> = React.memo(({ onClose, tag }) => {
    return (
        <div className="inner-page__line inner-page__line_hide-mob">
            <div className="popup popup_content">
                <div className="popup__cols">
                    <div className="popup__col">
                        <div className="popup-alert">
                            <img className="popup-alert__icon" src="img/svg/popup-success.svg" alt="" />
                            <span className="popup-alert__text">Тег <a className="popup-alert__user" href="#">{tag.name}</a> успешно добавлен.</span>
                        </div>
                    </div>
                    <div className="popup__col">
                        <button onClick={onClose} className="popup__button button button_small">OK</button>
                    </div>
                </div>
            </div>
        </div>)
})
