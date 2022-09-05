import { IPagination } from './../types/pagination.d';
import { IUser, IUsersFilters } from './../types/users.d';
import { baseAPI } from './base';
import { saveAs } from "file-saver";
import { IPage } from "../types/page"
import { filterParams } from '../utils/params';

const baseURL = "editor"

const baseAPIEnhanced = baseAPI.enhanceEndpoints({ addTagTypes: ["User"] })

export const editorAPI = baseAPIEnhanced.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation<void, Partial<IUser>>({
            query: (body) => ({
                method: "POST",
                body,
                url: `${baseURL}/update-user`
            }),
            invalidatesTags: ["User"]
        }),
        getUsers: builder.query<IPage<IUser>, IPagination & IUsersFilters>({
            query: (params) => {
                return ({
                    params: filterParams({...params, sortBy: "firstName"}),
                    method: "GET",
                    url: `${baseURL}/get-page`
                })
            },
            providesTags: ["User"]
        }),
        getUser: builder.query<IUser, number>({
            query: (id) => ({
                url: `${baseURL}/get-user-info`,
                body: {
                    id
                },
                method: "POST"
            }),
            providesTags: ["User"]
        }),
        getUsersExcel: builder.query<File, IUsersFilters>({
            query: (params) => ({
                method: "GET",
                params: filterParams(params),
                url: `${baseURL}/create-excel`,
                cache: "no-cache",
                responseHandler: async (response) => {
                    const file = new File([await response.blob()], "users.xlsx")
                    saveAs(window.URL.createObjectURL(file), "users.xlsx")
                }
            }),
            providesTags: ["User"],

        }),
        deleteUser: builder.mutation<number, number>({
            query: (userId) => ({
                method: "POST",
                body: {
                    userId
                },
                url: `${baseURL}/delete-user`
            }),
            invalidatesTags: ["User"]
        }),
        deleteUsers: builder.mutation<void, Array<number>>({
            query: (ids) => ({
                url: `${baseURL}/delete-users`,
                method: "DELETE",
                body: ids
            }),
            invalidatesTags: ["User"]
        }),
    }),

})
