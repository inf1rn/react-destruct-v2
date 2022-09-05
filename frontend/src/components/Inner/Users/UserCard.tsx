import { Field, Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { IUser } from '../../../types/users'
import { checkboxValidation } from '../../../validations/common'
import { passwordValidation, repeatPasswordValidation } from '../../../validations/profile'
import { cityValidation, districtValidation, firstNameValidation, lastNameValidation, patronymicValidation, positionValidation, roleIdValidation, workplaceValidation } from '../../../validations/user'
import * as Yup from "yup"
import { RegionsSelect } from '../../Common/UI/RegionsSelect'
import { ValidationInput } from '../../Common/UI/ValidationInput'
import { accountStorage } from '../../../constants/api'
import cameraIcon from "../../../assets/img/svg/camera.svg"
import { accountAPI } from '../../../api/account'
import { IRegistrationBody } from '../../../types/auth'
import { useGetCurrentUserPermissions } from '../../../hooks/account'
import classNames from 'classnames'
import { SelectComponent } from '../../Common/UI/SelectComponent'
import { selectPipes } from '../../../pipes/select/select'
import { locationAPI } from '../../../api/location'

interface IProps {
    user: Partial<IUser>
    image?: File | null
    onSubmitUserData: (userData: Partial<IRegistrationBody & IUser>) => void
    onSubmitUserImage: (imageData: ISubmitUserImage) => void
    withRole?: boolean
}

interface ISubmitUserImage {
    file: File
    email: string
}

type TabsType = "userData" | "workData" | "loginData"

export const UserCard: React.FC<IProps> = React.memo(({ user, onSubmitUserData, onSubmitUserImage, image, withRole = true }) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { data: roles } = accountAPI.useGetRolesQuery()
    const permissions = useGetCurrentUserPermissions()
    const { data: regions } = locationAPI.useGetAllQuery()
    const isCanBeChanged = React.useMemo(() => user && user?.roles?.[0]?.requiredPermissionsToSet.some(requiredPermission => permissions.includes(requiredPermission.name)), [permissions, user])

    const [activeTab, setActiveTab] = useState<TabsType>("userData")

    const schema = Yup.object().shape({
        password: passwordValidation,
        repeatPassword: repeatPasswordValidation,
        firstName: firstNameValidation,
        lastName: lastNameValidation,
        patronymic: patronymicValidation,
        district: districtValidation,
        city: cityValidation,
        roleId: roleIdValidation,
        workplace: workplaceValidation,
        position: positionValidation,
        isAccept: checkboxValidation
    });

    return (
        <div className="profile">
            <div className="profile__left">
                <div className="profile__bg">
                    <div className="user">
                        <div className="user__cols">
                            <div className="user__col">
                                <div className="user__photo">
                                    <img className="user__image" src={image ? URL.createObjectURL(new Blob([image])) : accountStorage + user?.imgUrl} alt="" />
                                    <button onClick={() => {
                                        fileInputRef.current?.click()
                                    }} className="user__button circle-icon" type="button">
                                        <img className="circle-icon__image" src={cameraIcon} alt="" />
                                        <input ref={fileInputRef} type="file" hidden onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            file && user.email && user && onSubmitUserImage({ file, email: user.email })
                                        }} />
                                    </button>
                                </div>
                            </div>
                            <div className="user__col">
                                <h3 className="user__title">{user?.lastName} {user?.firstName} {user?.patronymic}</h3>
                                <p className="user__text">{user?.roles?.[0]?.rusName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile__mob-col">
                <div className="profile-nav js-line">
                    <ul className="profile-nav__list">
                        <li className={classNames("profile-nav__item", {
                            active: activeTab === "userData"
                        })}>
                            <a onClick={() => setActiveTab("userData")} className="profile-nav__link js-line-link js-tabs-link" href="#profile-info-1">
                                <span className="profile-nav__text">Персональные <br />данные</span>
                            </a>
                        </li>
                        <li className={classNames("profile-nav__item", {
                            active: activeTab === "workData"
                        })}>
                            <a onClick={() => setActiveTab("workData")} className="profile-nav__link js-line-link js-tabs-link" href="#profile-info-2">
                                <span className="profile-nav__text">Данные <br />о работе</span>
                            </a>
                        </li>
                        <li className={classNames("profile-nav__item", {
                            active: activeTab === "loginData"
                        })}>
                            <a onClick={() => setActiveTab("loginData")} className="profile-nav__link js-line-link js-tabs-link" href="#profile-info-3">
                                <span className="profile-nav__text">Данные <br />для входа</span>
                            </a>
                        </li>
                    </ul>
                    <div className="profile-nav__line js-line-element"></div>
                </div>
            </div>

            <div className="profile__right">
                <div className="profile__bg">
                    <div className="profile-form">
                        <Formik initialValues={{
                            firstName: user?.firstName,
                            lastName: user?.lastName,
                            patronymic: user?.patronymic,
                            email: user?.email,
                            district: user?.district,
                            city: user?.city,
                            workplace: user?.workplace,
                            position: user?.position,
                            roleId: user?.roles?.[0]?.id ?? roles?.find((role => role.name == "user"))?.id,
                            password: "",
                            repeatPassword: ""
                        }}
                            enableReinitialize
                            onSubmit={(values) => {
                                user && onSubmitUserData(
                                    { ...values, id: user?.id })
                            }}
                            validationSchema={schema}
                        >
                            {({ values, handleChange, errors, submitForm, setFieldValue }) => (
                                <>
                                    <section className={classNames("profile-form__section", {
                                        active: activeTab === "userData"
                                    })} id="profile-info-1">
                                        <h2 className="profile-form__title">Персональные данные</h2>
                                        <div className="profile-form__cols">
                                            <div className="profile-form__col">
                                                <div className="profile-form__input-wrap input-wrap">
                                                    <label className="top-label" htmlFor="profile-last-name">Фамилия</label>
                                                    <Field value={values.lastName} onChange={handleChange} component={ValidationInput} className="text-input" error={errors.lastName} id="profile-last-name" type="text" htmlName="lastName" />
                                                </div>
                                            </div>
                                            <div className="profile-form__col">
                                                <div className="profile-form__input-wrap input-wrap">
                                                    <label className="top-label" htmlFor="profile-name">Имя</label>
                                                    <Field value={values.firstName} className="text-input" component={ValidationInput} onChange={handleChange} error={errors.firstName} id="profile-name" type="text" htmlName="firstName" />
                                                </div>
                                            </div>
                                            <div className="profile-form__col">
                                                <div className="profile-form__input-wrap input-wrap">
                                                    <label className="top-label" htmlFor="profile-acronym">Отчество</label>
                                                    <Field value={values.patronymic} className="text-input" component={ValidationInput} onChange={handleChange} error={errors.patronymic} id="profile-acronym" type="text" htmlName="patronymic" />
                                                </div>
                                            </div>
                                            <div className="profile-form__col">
                                                <div className="profile-form__input-wrap input-wrap">
                                                    <label className="top-label">Регион</label>
                                                    <div className="select">
                                                        <Field value={values.district} component={SelectComponent} currentValue={values.district}
                                                            options={selectPipes.options(regions ?? [], "regionName", "id")}
                                                            onChange={(e: string | null) => setFieldValue("district", e)} htmlName="district" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="profile-form__col">
                                                <div className="profile-form__input-wrap input-wrap">
                                                    <label className="top-label" htmlFor="profile-city">Город</label>
                                                    <Field value={values.city} className="text-input" component={ValidationInput} onChange={handleChange} error={errors.city} id="profile-city" htmlName="city" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section className={classNames("profile-form__section", {
                                        active: activeTab === "workData"
                                    })} id="profile-info-2">
                                        <h2 className="profile-form__title">Данные о работе</h2>
                                        <div className="profile-form__cols">
                                            <div className="profile-form__col">
                                                <div className="profile-form__input-wrap input-wrap">
                                                    <label className="top-label" htmlFor="profile-company">Место работы</label>
                                                    <Field value={values.workplace} className="text-input" component={ValidationInput} onChange={handleChange} error={errors.workplace} id="profile-company" type="text" htmlName="workplace" />
                                                </div>
                                            </div>
                                            <div className="profile-form__col">
                                                <div className="profile-form__input-wrap input-wrap">
                                                    <label className="top-label" htmlFor="profile-position">Должность</label>
                                                    <Field value={values.position} className="text-input" component={ValidationInput} onChange={handleChange} error={errors.position} id="profile-position" type="text" htmlName="position" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section className={classNames("profile-form__section", {
                                        active: activeTab === "loginData"
                                    })} id="profile-info-3">
                                        <h2 className="profile-form__title">Данные для входа</h2>
                                        <div className="profile-form__cols">
                                            <div className="profile-form__col">
                                                <div className="profile-form__input-wrap input-wrap">
                                                    <label className="top-label" htmlFor="profile-email">Email</label>
                                                    <Field autoComplete="off" value={values.email} className="text-input" component={ValidationInput} onChange={handleChange} error={errors.email} id="profile-email" type="email" htmlName="email" />
                                                </div>
                                            </div>
                                            {
                                                withRole && <div className="profile-form__col">
                                                    <div className="profile-form__input-wrap input-wrap">
                                                        <label className="top-label">Роль</label>
                                                        <div className="select">
                                                            <Field as={SelectComponent}
                                                                onChange={(e: string | null) => setFieldValue("roleId", e)}
                                                                options={selectPipes.options(roles?.filter(role => {
                                                                    return (
                                                                        role.requiredPermissionsToSet.some(permission => permissions.includes(permission.name))
                                                                        && isCanBeChanged
                                                                    )
                                                                }) ?? [], "rusName", "id")}
                                                                currentValue={String(values.roleId)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            <div className="profile-form__col">
                                                <div className="profile-form__input-wrap input-wrap">
                                                    <label className="top-label" htmlFor="profile-password">Пароль</label>
                                                    <Field autoComplete="new-user-password" value={values.password} className="text-input" component={ValidationInput} onChange={handleChange} error={errors.password} id="profile-password" type="password" htmlName="password" />
                                                </div>
                                            </div>
                                            <div className="profile-form__col">
                                                <div className="profile-form__input-wrap input-wrap">
                                                    <label className="top-label" htmlFor="profile-password-repeat">Повторите пароль</label>
                                                    <Field autoComplete="off" value={values.repeatPassword} className="text-input" component={ValidationInput} onChange={handleChange} error={errors.repeatPassword} id="profile-password-repeat" type="password" htmlName="repeatPassword" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <div className="profile-form__bottom">
                                        <div className="profile-form__cols profile-form__cols_no-justify">
                                            <div className="profile-form__col">
                                                <button onClick={submitForm} className="profile-form__button button" type="submit">Сохранить</button>
                                            </div>
                                        </div>
                                    </div>
                                </>)
                            }
                        </Formik>

                    </div>
                </div>
            </div>
        </div>
    )
})
