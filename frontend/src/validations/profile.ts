import * as Yup from "yup"

export const passwordValidation = Yup.string().min(6).optional()
export const repeatPasswordValidation = Yup.string().optional().when("password", {
    is: (val: string) => val && val.length,
    then: Yup.string().oneOf(
        [Yup.ref("password")],
    )
})