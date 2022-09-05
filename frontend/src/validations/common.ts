import * as Yup from "yup"

export const checkboxValidation = Yup.bool().oneOf([true])