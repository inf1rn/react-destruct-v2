import { saveAs } from 'file-saver';
import { IInfographicsData } from '../types/infographics';
import { IPage } from '../types/page';
import { filterParams } from '../utils/params';
import { IPagination } from './../types/pagination.d';
import { IVkUser, IVkGroupsFilters, IVkUsersFilters, IVkGroup, IVkRegion, IVkCity, IVkCountry, IVkPost, IVkPostsFilters, IVkInfographicsUsersFilters, IVkInfographicsGroupsFilters, IVkInfographicsPostsFilters } from './../types/vk.d';
import { baseAPI } from './base';

const baseAPIEnhanced = baseAPI.enhanceEndpoints({ addTagTypes: ["User", "Group"] })
const baseURL = "/vk"

const baseURLGroups = baseURL + "/groups"
const baseURLUsers = baseURL + "/users"
const baseURLPosts = baseURL + "/posts"

interface IGetVkLocationItems<T> {
    response: {
        count: number
        items: Array<T>
    }
}

export const vkAPI = baseAPIEnhanced.injectEndpoints({
    endpoints: (builder) => ({
        getVkGroups: builder.query<IPage<IVkGroup>, IVkGroupsFilters & IPagination>({
            query: (params) => ({
                url: `${baseURLGroups}/get-page`,
                method: "GET",
                params: filterParams(params)
            }),
            providesTags: ["Group"]
        }),
        getVkGroupById: builder.query<IVkGroup | null, number>({
            query: (id) => ({
                url: `${baseURLGroups}/get`,
                method: "GET",
                params: {
                    id
                }
            }),
        }),
        getVkUserById: builder.query<IVkUser | null, number>({
            query: (id) => ({
                url: `${baseURLUsers}/get`,
                method: "GET",
                params: {
                    id
                }
            })
        }),
        getVkUsers: builder.query<IPage<IVkUser>, IVkUsersFilters & IPagination>({
            query: (params) => ({
                url: `${baseURLUsers}/get-page`,
                params: filterParams(params)
            }),
            providesTags: ["Group", "User"]
        }),
        getVkCountries: builder.query<Array<IVkCountry>, void>({
            query: () => ({
                url: `${baseURL}/get-countries`,
            }),
            transformResponse: (body: IGetVkLocationItems<IVkCountry>) => body.response.items
        }),
        getVkCities: builder.query<Array<IVkCity>, number>({
            query: (countryId: number) => ({
                url: `${baseURL}/get-cities`,
                params: {
                    country_id: countryId
                }
            }),
            transformResponse: (body: IGetVkLocationItems<IVkCity>) => body.response.items
        }),
        getVkRegions: builder.query<Array<IVkRegion>, any>({
            query: (countryId: number) => ({
                url: `${baseURL}/get-regions`,
                params: {
                    country_id: countryId
                }
            }),
            transformResponse: (body: IGetVkLocationItems<IVkRegion>) => body.response.items
        }),
        getVkUsersCsv: builder.query<File, IVkUsersFilters>({
            query: (params) => ({
                params: filterParams(params),
                url: `${baseURLUsers}/create-csv`,
                cache: "no-cache",
                responseHandler: async (response) => {
                    const file = new File([await response.blob()], "vk-users.csv")
                    saveAs(window.URL.createObjectURL(file), "vk-users.csv")
                }
            }),
            providesTags: ["User"],
        }),
        getVkGroupsExcel: builder.query<File, IVkGroupsFilters>({
            query: (params) => ({
                params: filterParams(params),
                url: `${baseURLGroups}/create-excel`,
                cache: "no-cache",
                responseHandler: async (response) => {
                    const file = new File([await response.blob()], "vk-users.xlsx")
                    saveAs(window.URL.createObjectURL(file), "vk-users.xlsx")
                }
            }),
            providesTags: ["Group"],
        }),
        getVkPosts: builder.query<IPage<IVkPost>, Partial<IPagination & IVkPostsFilters>>({
            query: (filters) => ({
                url: `${baseURLPosts}`,
                params: filters
            })
        }),
        deleteVkGroup: builder.mutation<void, number>({
            query: (id) => ({
                url: `${baseURLGroups}/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Group", "User"]
        }),
        deleteVkGroups: builder.mutation<void, Array<number>>({
            query: (ids) => ({
                url: `${baseURLGroups}/delete/bulk`,
                method: "DELETE",
                body: ids
            }),
            invalidatesTags: ["Group"]
        }),
        checkVkGroup: builder.mutation<void, number>({
            query: (id) => ({
                url: `${baseURLGroups}/check/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["Group"]
        }),
        deleteVkUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `${baseURLUsers}/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["User"]
        }),
        deleteVkUsers: builder.mutation<void, Array<number>>({
            query: (ids) => ({
                url: `${baseURLUsers}/delete/bulk`,
                method: "DELETE",
                body: ids
            }),
            invalidatesTags: ["User"]
        }),
        checkVkUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `${baseURLUsers}/check/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["User"]
        }),
        getVkUsersCountBySubcultures: builder.query<Array<IInfographicsData>, Partial<IVkInfographicsUsersFilters>>({
            query: (params) => ({
                url: `${baseURLUsers}/count-by-subcultures`,
                params: filterParams(params)
            })
        }),
        getVkGroupsCountBySubcultures: builder.query<Array<IInfographicsData>, Partial<IVkInfographicsGroupsFilters>>({
            query: (params) => ({
                url: `${baseURLGroups}/count-by-subcultures`,
                params: filterParams(params)

            })
        }),
        getVkPostsCountBySubcultures: builder.query<Array<IInfographicsData>, Partial<IVkInfographicsPostsFilters>>({
            query: (params) => ({
                url: `${baseURLPosts}/count-by-subcultures`,
                params: filterParams(params)

            })
        }),
    })
})