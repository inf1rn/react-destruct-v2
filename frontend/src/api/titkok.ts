import { saveAs } from 'file-saver';
import { IPagination } from './../types/pagination.d';
import { IInfographicsData } from './../types/infographics.d';
import { ITiktokPost, ITiktokPostsFilters, ITiktokUser, ITiktokUsersFilters } from './../types/tiktok.d';
import { baseAPI } from './base';
import { filterParams } from '../utils/params';
import { IPage } from '../types/page';

const baseAPIEnhanced = baseAPI.enhanceEndpoints({ addTagTypes: ["User", "Post"] })
const baseURL = "/tiktok"

const baseURLUsers = baseURL + "/users"
const baseURLPosts = baseURL + "/posts"

export const tiktokAPI = baseAPIEnhanced.injectEndpoints({
    endpoints: (builder) => ({
        getTiktokUsers: builder.query<IPage<ITiktokUser>, Partial<ITiktokUsersFilters & IPagination>>({
            query: (params) => ({
                url: `${baseURLUsers}/get-page`,
                method: "GET",
                params: filterParams(params)
            }),
            providesTags: ["User"]

        }),
        getTiktokUserById: builder.query<ITiktokUser | null, number>({
            query: (id) => ({
                url: `${baseURLUsers}/get`,
                method: "GET",
                params: {
                    id
                }
            })
        }),
        getTiktokPosts: builder.query<IPage<ITiktokPost>, Partial<ITiktokPostsFilters & IPagination>>({
            query: (params) => ({
                url: `${baseURLPosts}/get-page`,
                method: "GET",
                params: filterParams(params)
            }),
            providesTags: ["Post"]
        }),
        getTiktokPostsCountBySubcultures: builder.query<Array<IInfographicsData>, boolean>({
            query: (actual) => ({
                url: `${baseURLPosts}/count-by-subcultures`,
                params: {
                    actual
                }
            })
        }),
        getTiktokUsersCountBySubcultures: builder.query<Array<IInfographicsData>, boolean>({
            query: (actual) => ({
                url: `${baseURLUsers}/count-by-subcultures`,
                params: {
                    actual
                }
            })
        }),
        getTiktokUsersExcel: builder.query<File, ITiktokUsersFilters>({
            query: (params) => ({
                method: "GET",
                params: filterParams(params),
                url: `${baseURLUsers}/create-excel`,
                cache: "no-cache",
                responseHandler: async (response) => {
                    const file = new File([await response.blob()], "tiktok-users.xlsx")
                    saveAs(window.URL.createObjectURL(file), "tiktok-users.xlsx")
                }
            }),
            providesTags: ["User"],
        }),
        getTiktokPostsExcel: builder.query<File, ITiktokPostsFilters>({
            query: (params) => ({
                method: "GET",
                params: filterParams(params),
                url: `${baseURLPosts}/create-excel`,
                cache: "no-cache",
                responseHandler: async (response) => {
                    const file = new File([await response.blob()], "tiktok-posts.xlsx")
                    saveAs(window.URL.createObjectURL(file), "tiktok-posts.xlsx")
                }
            }),
            providesTags: ["Post"],
        }),
        deleteTiktokUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `${baseURLUsers}/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["User", "Post"]
        }),
        deleteTiktokUsers: builder.mutation<void, Array<number>>({
            query: (ids) => ({
                url: `${baseURLUsers}/delete/bulk`,
                method: "DELETE",
                body: ids
            }),
            invalidatesTags: ["User"]
        }),
        checkTiktokUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `${baseURLUsers}/check/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["User"]
        }),
        deleteTiktokPost: builder.mutation<void, number>({
            query: (id) => ({
                url: `${baseURLPosts}/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Post"]
        }),
        deleteTiktokPosts: builder.mutation<void, Array<number>>({
            query: (ids) => ({
                url: `${baseURLPosts}/delete/bulk`,
                method: "DELETE",
                body: ids
            }),
            invalidatesTags: ["Post"]
        }),
        checkTiktokPost: builder.mutation<void, number>({
            query: (id) => ({
                url: `${baseURLPosts}/check/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["Post"]
        }),
    })
})