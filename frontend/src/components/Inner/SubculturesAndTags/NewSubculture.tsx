import classNames from 'classnames'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { ISubculture } from '../../../types/subcultures'

interface IProps {
    onSubmit: (values: Partial<ISubculture>) => void
    onClose: () => void
    mobile?: boolean
}

export const NewSubculture: React.FC<IProps> = React.memo(({ onSubmit, onClose, mobile = false }) => {
    return (
        <div className="add-category">
            <Formik initialValues={{
                name: "",
                description: ""
            }}
                onSubmit={(values) => {
                    onSubmit(values)
                }}
            >
                {
                    ({ values, handleChange, submitForm }) => (
                        !mobile ?
                            <>
                                <div className="add-category__left">
                                    <div className="add-category__inner-cols">
                                        <div className="add-category__inner-col add-category__inner-col_1">
                                            <div className="add-category__input-wrap input-wrap input-wrap_small">
                                                <Field value={values.name} onChange={handleChange} className={classNames("text-input", "input-wrap_small-mob", {
                                                    active: values.name
                                                })} type="text" name="name" id="add-subculture-name" />
                                                <label className="input-placeholder" htmlFor="add-subculture-name">Введите название</label>
                                            </div>
                                        </div>
                                        <div className="add-category__inner-col add-category__inner-col_2">
                                            <div className="add-category__input-wrap input-wrap input-wrap_small">
                                                <Field value={values.description} onChange={handleChange} className={classNames("text-input", "input-wrap_small-mob", {
                                                    active: values.description
                                                })} type="text" name="description" id="add-subculture-desc" />
                                                <label className="input-placeholder" htmlFor="add-subculture-desc">Введите описание</label>
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
                                    <label className="top-label" htmlFor="subculture-name">Название субкультуры</label>
                                    <Field value={values.name} name="name" onChange={handleChange} className="text-input" id="subculture-name" type="text" placeholder="Введите название субкультуры"/>
                                </div>
                                <div className="add-category__input-wrap input-wrap input-wrap_small-mob">
                                    <label className="top-label" htmlFor="subculture-desc">Описание субкультуры</label>
                                    <Field as="textarea" value={values.description} name="description" onChange={handleChange} className="textarea" id="subculture-desc" placeholder="Введите описание субкультуры"/>
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
