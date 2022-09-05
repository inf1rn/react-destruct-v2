import { IRegion } from '../types/regions';
import { baseAPI } from './base';
const baseURL = "region"

export const locationAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getAll: builder.query<IRegion[], void>({
            query: () => `${baseURL}/get`
        })
    })
})