import * as Yup from "yup"

export const subcultureNameValidation = Yup.string().required()
export const subcultureDescriptionValidation = Yup.string().optional()
export const tagNameValidation = Yup.string().required()
export const tagSubcultureIdValidation = Yup.string().required()