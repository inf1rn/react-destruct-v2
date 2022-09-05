import classNames from 'classnames'
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { authAPI } from '../../../api/auth'
import { locationAPI } from '../../../api/location'
import * as Yup from "yup"
import { cityValidation, districtValidation, firstNameValidation, lastNameValidation, patronymicValidation, positionValidation, workplaceValidation } from '../../../validations/user'
import { checkboxValidation } from '../../../validations/common'
import { useSelector } from 'react-redux'
import { registrationSelectors } from '../../../store/auth/registration/selectors'
import { SelectComponent } from '../../../components/Common/UI/SelectComponent'
import { selectPipes } from '../../../pipes/select/select'

const initialValues = {
    lastName: "",
    firstName: "",
    patronymic: "",
    district: null,
    city: "",
    workplace: "",
    position: "",
    isAccept: false
}

interface IProps {
    onSubmit: () => void
}

export const RegistrationFormSecondStep: React.FC<IProps> = ({ onSubmit }) => {
    const { data: regions } = locationAPI.useGetAllQuery()
    const [registration, { isSuccess }] = authAPI.useRegistrationMutation()
    const { email, password } = useSelector(registrationSelectors.form)

    useEffect(() => {
        if (!isSuccess) {
            return
        }

        onSubmit()
    }, [isSuccess])

    const schema = Yup.object().shape({
        firstName: firstNameValidation,
        lastName: lastNameValidation,
        patronymic: patronymicValidation,
        district: districtValidation,
        city: cityValidation,
        workplace: workplaceValidation,
        position: positionValidation,
        isAccept: checkboxValidation
    });

    return (

        <div className="login-page__content">
            <div className="login-page__top">
                <h1 className="login-page__title">Регистрация</h1>
                <p className="login-page__text">Введите данные для регистрации в&nbsp;системе</p>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    const form = { ...values } as Omit<typeof initialValues, "isAccept">

                    registration({
                        email,
                        password,
                        ...form
                    })
                }}
                validationSchema={schema}
            >
                {({ handleChange, values, errors, setFieldValue }) => (<Form>
                    <div className="reg-form">
                        <div className="reg-form__mob-bg">
                            <div className="reg-form__cols">
                                <div className="reg-form__col">
                                    <div className="reg-form__input-wrap input-wrap input-wrap_small-mob">
                                        <Field onChange={handleChange} value={values.lastName} className={classNames("text-input", "js-input-value", {
                                            active: values.lastName,
                                            error: errors.lastName
                                        })} type="text" id="reg-last-name" name="lastName" />
                                        <label className="input-placeholder" htmlFor="reg-last-name">Фамилия</label>
                                    </div>
                                </div>
                                <div className="reg-form__col">
                                    <div className="reg-form__input-wrap input-wrap input-wrap_small-mob">
                                        <Field onChange={handleChange} value={values.firstName} className={classNames("text-input", "js-input-value", {
                                            active: values.firstName,
                                            error: errors.firstName
                                        })} type="text" id="reg-name" name="firstName" />
                                        <label className="input-placeholder" htmlFor="reg-name">Имя</label>
                                    </div>
                                </div>
                                <div className="reg-form__col">
                                    <div className="reg-form__input-wrap input-wrap input-wrap_small-mob">
                                        <Field onChange={handleChange} value={values.patronymic} className={classNames("text-input", "js-input-value", {
                                            active: values.patronymic,
                                            error: errors.patronymic
                                        })} type="text" id="reg-acronym" name="patronymic" />
                                        <label className="input-placeholder" htmlFor="reg-acronym">Отчество</label>
                                    </div>
                                </div>
                                <div className="reg-form__col">
                                    <div className="reg-form__input-wrap input-wrap input-wrap_small-mob">
                                        <div className="select">
                                            <Field as={SelectComponent}
                                                currentValue={values.district}
                                                onChange={(e: string | null) => setFieldValue("district", e)}
                                                options={selectPipes.options(regions ?? [], "regionName", "id")}
                                                placeholder="Регион"
                                            />
                                            {/* <Field onChange={handleChange} value={values.district} as="select" className={classNames({
                                                error: errors.district
                                            })} name="district">
                                                <option value="" hidden>Выберите регион</option>
                                                {regions?.map(region => <option
                                                    key={region.id} value={region.id}>
                                                    {region.regionName}
                                                </option>)}
                                            </Field> */}
                                        </div>
                                        <label className="input-placeholder">Регион</label>
                                    </div>
                                </div>
                                <div className="reg-form__col">
                                    <div className="reg-form__input-wrap input-wrap input-wrap_small-mob">
                                        <Field onChange={handleChange} value={values.city} className={classNames("text-input", "js-input-value", {
                                            active: values.city,
                                            error: errors.city
                                        })} type="text" id="reg-city" name="city" />
                                        <label className="input-placeholder" htmlFor="reg-city">Город</label>
                                    </div>
                                </div>
                                <div className="reg-form__col reg-form__col_empty"></div>
                                <div className="reg-form__col">
                                    <div className="reg-form__input-wrap input-wrap input-wrap_small-mob">
                                        <Field onChange={handleChange} value={values.workplace} className={classNames("text-input", "js-input-value", {
                                            active: values.workplace,
                                            error: errors.workplace
                                        })} type="text" id="reg-company" name="workplace" />
                                        <label className="input-placeholder" htmlFor="reg-company">Место работы</label>
                                    </div>
                                </div>
                                <div className="reg-form__col">
                                    <div className="reg-form__input-wrap input-wrap input-wrap_small-mob">
                                        <Field onChange={handleChange} value={values.position} className={classNames("text-input", "js-input-value", {
                                            active: values.position,
                                            error: errors.position
                                        })} type="text" id="reg-position" name="position" />
                                        <label className="input-placeholder" htmlFor="reg-position">Должность</label>
                                    </div>
                                </div>
                                <div className="reg-form__col reg-form__col_empty"></div>
                            </div>
                            <div className="reg-form__checkbox checkbox">
                                <label className="checkbox__label">
                                    <Field onChange={handleChange} checked={values.isAccept} className={classNames("checkbox__input", {
                                        error: errors.isAccept
                                    })} type="checkbox" name="isAccept" />
                                    <span className="checkbox__icon"></span>
                                    <span className="checkbox__text">
                                        <a href="#">Согласен с правилами использования системы и на обработку персональных данных</a>
                                    </span>
                                </label>
                            </div>
                            <div className="reg-form__cols">
                                <div className="reg-form__col">
                                    <button className="reg-form__button button" type="submit">Зарегистрироваться</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
                )}
            </Formik>
        </div>
    )
}
