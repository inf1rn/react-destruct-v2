import { baseURL } from '../constants/api';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseAPI = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders(headers) {
            return headers
        }
    }),
    endpoints: (builder) => ({
    })
})