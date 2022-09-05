import { ITechnicalSupportMessage } from './../types/technicalSupport.d';
import { baseAPI } from './base';

const baseURL = "/technical-support"

export const technicalSupportAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        sendMessage: builder.mutation<void, ITechnicalSupportMessage>({
            query: (body) => ({
                url: `${baseURL}`,
                body,
                method: "POST"
            })
        })
    })
})