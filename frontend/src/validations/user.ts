import * as Yup from "yup"

export const passwordValidation = Yup.string().required().min(6)
export const repeatPasswordValidation = Yup.string().required().when("password", {
    is: (val: string) => (val && val.length ? true : false),
    then: Yup.string().oneOf(
        [Yup.ref("password")],
    )
})
export const emailValidation = Yup.string().required().email()
export const firstNameValidation = Yup.string().required()
export const lastNameValidation = Yup.string().required()
export const patronymicValidation = Yup.string().required()
export const districtValidation = Yup.string().required()
export const cityValidation = Yup.string().required()
export const workplaceValidation = Yup.string().required()
export const positionValidation = Yup.string().required()
export const roleIdValidation = Yup.string().required()