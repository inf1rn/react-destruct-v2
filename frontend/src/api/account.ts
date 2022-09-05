import { IUser, IUserStatus, IUserRole } from './../types/users.d';
import { baseAPI } from './base';

const baseURL = "account"

export const accountAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getCurrent: builder.query<IUser | null, { jwt: string }>({
            query: (body) => {
                return {
                    url: `${baseURL}/get`,
                    method: "POST",
                    body
                }
            },
            transformResponse(user: IUser) {
                if (user.status.name == "waiting") {
                    alert("Ваша заявка на рассмотрении")
                    return null
                } else if (user.status.name == "declined") {
                    alert("Администратор отклонил вашу заявку")
                    return null
                }

                return user
            },
        }),
        uploadImage: builder.mutation<void, {
            email: string,
            file: File
        }>({
            query: (body) => {
                const formData = new FormData()
                formData.append("email", body.email)
                formData.append("imageFile", body.file)

                return {
                    url: `${baseURL}/upload-image`,
                    method: "POST",
                    body: formData
                }
            }
        }),
        setLastVisit: builder.mutation<void, {
            id: number
        }>({
            query: (body) => {
                return {
                    url: `${baseURL}/set-last-visit`,
                    method: "POST",
                    body
                }
            }
        }),
        getStatuses: builder.query<Array<IUserStatus>, void>({
            query: () => `${baseURL}/statuses`
        }),
        getRoles: builder.query<Array<IUserRole>, void>({
            query: () => `${baseURL}/roles`
        }),
    })
})