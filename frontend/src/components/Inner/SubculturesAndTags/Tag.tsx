import classNames from 'classnames'
import { Field, Formik } from 'formik'
import React, { useCallback, useState } from 'react'
import { subculturesAndTagsAPI } from '../../../api/subculturesAndTags'
import { ITagFullInfo, IUpdateTagBody } from '../../../types/tags'
import * as Yup from "yup"
import { tagNameValidation, tagSubcultureIdValidation } from '../../../validations/subculturesAndTags'
import { deleteTagPermission } from '../../../constants/permissions'
import { MoreBtn } from '../../Common/UI/Table/MoreBtn'
import { tagsPath } from '../../../constants/links'
import { useNavigate } from 'react-router'
import { SelectComponent } from '../../Common/UI/SelectComponent'
import { selectPipes } from '../../../pipes/select/select'

interface IProps {
    tagFullInfo: ITagFullInfo
    currentUserPermissions: Array<string>
    onDelete: (id: number) => void
    onChange: (dto: IUpdateTagBody) => void
}

const schema = Yup.object().shape({
    subcultureId: tagSubcultureIdValidation,
    name: tagNameValidation
})

export const Tag: React.FC<IProps> = React.memo(({ tagFullInfo, onDelete, onChange, currentUserPermissions }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const { data: subcultures } = subculturesAndTagsAPI.useGetAllSubculturesQuery()

    const onDeleteHandler = useCallback(() => {
        onDelete(tagFullInfo.tag.id)
    }, [])

    const onEditHandler = useCallback(() => {
        setIsEditing(!isEditing)
    }, [])

    const actions = [
        { text: "Редактировать", callback: onEditHandler, requiredPermission: deleteTagPermission },
        { text: "Удалить", class: "status-nav__link_red", callback: onDeleteHandler, requiredPermission: deleteTagPermission }
    ]

    return (
        <div className={classNames("table__row", {
            edited: isEditing,
            "edited-tags": isEditing
        })}>
            {
                isEditing &&
                <Formik
                    initialValues={{
                        id: tagFullInfo.tag.id,
                        name: tagFullInfo.tag.name,
                        subcultureId: tagFullInfo.tag.subculture.id
                    }}
                    onSubmit={(values) => {
                        onChange(values)
                        setIsEditing(false)
                    }}
                    validationSchema={schema}
                >
                    {
                        ({ submitForm, handleChange, values, setFieldValue }) => (
                            <>
                                <div className="table__cell table__cell_top active">
                                    <div className="table__edit-visible">
                                        <input value={values.name} onChange={handleChange} name="name" className="table__input" type="text" />
                                    </div>
                                    <span className="table__text">{values.name}</span>
                                </div>
                                <div className="table__cell table__cell_top active">
                                    <div className="table__edit-visible">
                                        <div className="select">
                                            <Field
                                                as={SelectComponent}
                                                currentValue={String(values.subcultureId)}
                                                options={selectPipes.options(subcultures ?? [], "name", "id")}
                                                onChange={(e: string | null) => setFieldValue("subcultureId", e)}
                                                name="subcultureId" />
                                        </div>
                                    </div>
                                    <span className="table__text">{values.subcultureId}</span>
                                </div>
                                <div className="table__cell table__cell_stats active">
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
            <div className="table__cell table__cell_top table__mob-40" data-cell>
                <span className="table__text">#{tagFullInfo.tag.name}</span>
            </div>
            <div className="table__cell table__cell_top table__mob-40" data-cell>
                <span className="table__text">{tagFullInfo.tag.subculture.name}</span>
            </div>
            <div className="table__cell table__cell_stats table__cell_33" data-cell>
                <span className="table__stats-desc">Публикации <br />Вконтакте</span>
                <span className="table__stats-text">{tagFullInfo.vkPostsCount}</span>
            </div>
            <div className="table__cell table__cell_stats table__cell_33" data-cell>
                <span className="table__stats-desc">Публикации <br />Telegram</span>
                <span className="table__stats-text">{tagFullInfo.tgPostsCount}</span>
            </div>
            <div className="table__cell table__cell_stats table__cell_33" data-cell>
                <span className="table__stats-desc">Публикации <br />TikTok</span>
                <span className="table__stats-text">{tagFullInfo.tikTokPostsCount}</span>
            </div>
            <div className="table__cell table__cell_top table__mob-20" data-cell>
                <div className="desktop-actions">
                    <div className="desktop-actions__col">
                        <div className="show-more js-show-more">
                            <button onClick={() => setIsEditing(true)} className="action-button action-button_edit js-show-button" type="button"></button>
                            <span className="show-more__tooltip js-show-tooltip">Редактировать</span>
                        </div>
                    </div>
                    {currentUserPermissions.includes(deleteTagPermission) && <div className="desktop-actions__col">
                        <div className="show-more js-show-more">
                            <button onClick={() => onDelete(tagFullInfo.tag.id)} className="action-button action-button_remove js-show-button" type="button"></button>
                            <span className="show-more__tooltip js-show-tooltip">Удалить</span>
                        </div>
                    </div>
                    }
                </div>
                <MoreBtn actions={actions} />

            </div>
        </div>
    )
})
