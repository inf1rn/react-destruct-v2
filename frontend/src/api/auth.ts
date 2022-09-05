import { baseAPI } from './base';
import { Cookie } from '../utils/cookie';
import { IRegistrationBody } from '../types/auth';

const baseURL = "account"

export interface ILoginResponse {
    jwt: string
}

export const authAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, {
            username: string
            password: string
        }>({
            query: (body) => ({
                body,
                url: `${baseURL}/login`,
                method: "POST"
            }),
            transformResponse(body: ILoginResponse) {
                new Cookie("jwt").setValue(body.jwt)

                return body
            }
        }),
        passwordRecoveryEmail: builder.mutation<void, {
            email: string
            link: string
        }>({
            query: (body) => ({
                body,
                url: `${baseURL}/password-recovery-email`,
                method: "POST"
            })
        }),
        passwordRecovery: builder.mutation<void, {
            token: string
            password: string
        }>({
            query: (body) => ({
                body,
                url: `${baseURL}/password-recovery`,
                method: "POST"
            })
        }),
        registration: builder.mutation<void, Partial<IRegistrationBody>>({
            query: (body) => ({
                body,
                url: `${baseURL}/registration`,
                method: "POST"
            })
        })
    })
})

