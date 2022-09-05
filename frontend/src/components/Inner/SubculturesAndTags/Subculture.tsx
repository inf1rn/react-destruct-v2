import classNames from 'classnames'
import { Formik } from 'formik'
import React, { useCallback, useState } from 'react'
import { ISubculture, ISubcultureFullInfo, IUpdateSubcultureBody } from '../../../types/subcultures'
import * as Yup from "yup"
import { subcultureDescriptionValidation, subcultureNameValidation } from '../../../validations/subculturesAndTags'
import { deleteSubculturePermission } from '../../../constants/permissions'
import { MoreBtn } from '../../Common/UI/Table/MoreBtn'
//TODO:create component with actions
interface IProps {
    subcultureFullInfo: ISubcultureFullInfo
    currentUserPermissions: Array<string>
    onDelete: (id: number) => void
    onChange: (dto: IUpdateSubcultureBody) => void
}

const schema = Yup.object().shape({
    name: subcultureNameValidation,
    description: subcultureDescriptionValidation
})

export const Subculture: React.FC<IProps> = React.memo(({ subcultureFullInfo, currentUserPermissions, onDelete, onChange }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    
    const onDeleteHandler = useCallback(() => {
        onDelete(subcultureFullInfo.subculture.id)
    }, [])

    const onEditHandler = useCallback(() => {
        setIsEditing(!isEditing)
    }, [])

    const actions = [
        { text: "Редактировать", callback: onEditHandler, requiredPermission: deleteSubculturePermission },
        { text: "Удалить", class: "status-nav__link_red", callback: onDeleteHandler, requiredPermission: deleteSubculturePermission }
    ]
    
    return (
        <div className={classNames("table__row", {
            edited: isEditing
        })}>
            {isEditing &&
                <Formik initialValues={{
                    id: subcultureFullInfo.subculture.id,
                    name: subcultureFullInfo.subculture.name,
                    description: subcultureFullInfo.subculture.description
                }}
                    onSubmit={(values) => {
                        onChange(values)
                        setIsEditing(false)
                    }}
                    validationSchema={schema}
                >
                    {
                        ({ values, handleChange, submitForm }) => (
                            <>
                                <div className={classNames("table__cell", "table__cell_top", {
                                    "active": isEditing
                                })}>
                                    <div className="table__edit-visible">
                                        <input className="table__input" type="text" onChange={handleChange} value={values.name} name="name" />
                                    </div>
                                </div>
                                <div className={classNames("table__cell", "table__cell_tablet", {
                                    "active": isEditing
                                })}>
                                    <div className="table__edit-visible">
                                        <textarea value={values.description} name="description" onChange={handleChange} className="table__textarea" />
                                    </div>
                                </div>
                                <div className={classNames("table__cell", "table__cell_stats", {
                                    "active": isEditing
                                })}>

                                    <div className="table__edit-buttons table__edit-visible">
                                        <div className="table__edit-cols">
                                            <div className="table__edit-col">
                                                <div className="show-more js-show-more">
                                                    <button onClick={submitForm} className="action-button action-button_accept js-show-button" type="button"></button>
                                                    <span className="show-more__tooltip js-show-tooltip">Принять</span>
                                                </div>
                                            </div>
                                            <div className="table__edit-col">
                                                <div className="show-more js-show-more">
                                                    <button onClick={() => setIsEditing(false)} className="action-button action-button_cancel js-show-button" type="button"></button>
                                                    <span className="show-more__tooltip js-show-tooltip">Отменить</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </Formik>
            }
    
            <div className="table__cell table__cell_top" data-cell>
                <span className="table__text">{subcultureFullInfo.subculture.name}</span>
            </div>
            <div className="table__cell table__cell_tablet">
                <div className="table__tablet-cols">
                    <span className="table__tablet-desc">Описание</span>
                    <span className="table__tablet-text">{subcultureFullInfo.subculture.description}</span>
                </div>
            </div>
            <div className="table__cell table__cell_stats" data-cell>
                <span className="table__stats-desc table__stats-desc_mob">#теги</span>
                <span className="table__stats-text">{subcultureFullInfo.tagsCount}</span>
            </div>
            <div className="table__cell table__cell_stats" data-cell>
                <span className="table__stats-desc">Публикации <br />Вконтакте</span>
                <span className="table__stats-text">{subcultureFullInfo.vkPostsCount}</span>
            </div>
            <div className="table__cell table__cell_stats" data-cell>
                <span className="table__stats-desc">Публикации <br />Telegram</span>
                <span className="table__stats-text">{subcultureFullInfo.tgPostsCount}</span>
            </div>
            <div className="table__cell table__cell_stats" data-cell>
                <span className="table__stats-desc">Публикации <br />TikTok</span>
                <span className="table__stats-text">{subcultureFullInfo.tikTokPostsCount}</span>
            </div>
            <div className="table__cell table__cell_top" data-cell>
                <div className="desktop-actions">
                    <div className="desktop-actions__col">
                        <div className="show-more js-show-more">
                            <button onClick={() => setIsEditing(true)} className="action-button action-button_edit js-show-button" type="button"></button>
                            <span className="show-more__tooltip js-show-tooltip">Редактировать</span>
                        </div>
                    </div>
                    {currentUserPermissions.includes(deleteSubculturePermission) && <div className="desktop-actions__col">
                        <div className="show-more js-show-more">
                            <button onClick={() => onDelete(subcultureFullInfo.subculture.id)} className="action-button action-button_remove js-show-button" type="button"></button>
                            <span className="show-more__tooltip js-show-tooltip">Удалить</span>
                        </div>
                    </div>}
                </div>
                <MoreBtn actions={actions} />

            </div>
        </div>
    )

})

