import classNames from 'classnames'
import { Field, Formik } from 'formik'
import React from 'react'
import { subculturesAndTagsAPI } from '../../../api/subculturesAndTags'
import { selectPipes } from '../../../pipes/select/select'
import { ITag } from '../../../types/tags'
import { SelectComponent } from '../../Common/UI/SelectComponent'

interface IProps {
    onSubmit: (values: Partial<ITag>) => void
    onClose: () => void
    mobile?: boolean
}

export const NewTag: React.FC<IProps> = React.memo(({ onSubmit, onClose, mobile }) => {
    const { data: subcultures } = subculturesAndTagsAPI.useGetAllSubculturesQuery()

    return (
        <div className={classNames("add-category", {
            "add-category_tags": !mobile
        })}>
            <Formik initialValues={{
                subcultureId: "" as string | number,
                name: ""
            }}
                onSubmit={(values) => {
                    if (values.subcultureId) {
                        values.subcultureId = +values.subcultureId
                        onSubmit(values)
                    }
                }}
            >
                {
                    ({ values, handleChange, submitForm, setFieldValue }) => (
                        !mobile ?
                            <>
                                <div className="add-category__left">
                                    <div className="add-category__inner-cols">
                                        <div className="add-category__inner-col add-category__inner-col_tag">
                                            <div className="add-category__input-wrap input-wrap input-wrap_small">
                                                <Field value={values.name} onChange={handleChange} className={classNames("text-input", "js-input-value", {
                                                    active: values.name
                                                })} name="name" type="text" id="add-subculture-name" />
                                                <label className="input-placeholder" htmlFor="add-subculture-name">Введите тег</label>
                                            </div>
                                        </div>
                                        <div className="add-category__inner-col">
                                            <div className="add-category__input-wrap input-wrap input-wrap_small">
                                                <div className="select select_small">
                                                    <Field as={SelectComponent}
                                                        currentValue={values.subcultureId}
                                                        options={selectPipes.options(subcultures ?? [], "name", "id")}
                                                        onChange={(e: string | null) => setFieldValue("subcultureId", e)}
                                                        value={values.subcultureId}
                                                        name="subcultureId" className="js-formstyler">
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="add-category__right">
                                    <div className="add-category__buttons">
                                        <div className="add-category__button-col">
                                            <button onClick={submitForm} className="add-category__button button button_small" type="button">Добавить</button>
                                        </div>
                                        <div className="add-category__button-col">
                                            <button onClick={onClose} className="add-category__button button button_small button_grey" type="button">Отменить</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="add-category__input-wrap input-wrap input-wrap_small-mob">
                                    <label className="top-label" htmlFor="subculture-name">Название тега</label>
                                    <Field value={values.name} onChange={handleChange} name="name" className="text-input" id="subculture-name" type="text" placeholder="Введите название субкультуры" />
                                </div>
                                <div className="add-category__input-wrap input-wrap input-wrap_small-mob">
                                    <label className="top-label">Субкультура</label>
                                    <div className="select">
                                        <Field as={SelectComponent}
                                            currentValue={values.subcultureId}
                                            options={selectPipes.options(subcultures ?? [], "name", "id")}
                                            onChange={(e: string | null) => setFieldValue("subcultureId", e)}
                                            value={values.subcultureId}
                                            name="subcultureId" className="js-formstyler">
                                        </Field>
                                    </div>
                                </div>
                                <div className="add-category__bottom">
                                    <button onClick={submitForm} className="add-category__button button button_small" type="button">Добавить</button>
                                    <button onClick={onClose} className="add-category__button button button_small button_grey" type="button">Отменить</button>
                                </div>
                            </>
                    )
                }
            </Formik>
        </div>
    )
})
