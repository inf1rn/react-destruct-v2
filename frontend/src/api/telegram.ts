import { IInfographicsData } from './../types/infographics.d';
import { saveAs } from 'file-saver';
import { IPage } from '../types/page';
import { filterParams } from '../utils/params';
import { IPagination } from './../types/pagination.d';
import { ITelegramChannel, ITelegramChannelsFilters, ITelegramPost, ITelegramPostsFilters } from './../types/telegram.d';
import { baseAPI } from './base';

const baseAPIEnhanced = baseAPI.enhanceEndpoints({ addTagTypes: ["Channel", "Post"] })
const baseURL = "/telegram"

const baseURLChannels = baseURL + "/channels"
const baseURLPosts = baseURL + "/posts"

export const telegramAPI = baseAPIEnhanced.injectEndpoints({
    endpoints: (builder) => ({
        getTelegramChannels: builder.query<IPage<ITelegramChannel>, Partial<ITelegramChannelsFilters & IPagination>>({
            query: (params) => ({
                url: `${baseURLChannels}/get-page`,
                method: "GET",
                params: filterParams(params)
            }),
            providesTags: ["Channel"]
        }),
        getTelegramChannelById: builder.query<ITelegramChannel | null, number>({
            query: (id) => ({
                url: `${baseURLChannels}/get`,
                method: "GET",
                params: {
                    id
                }
            })
        }),
        getTelegramChannelsExcel: builder.query<File, ITelegramChannelsFilters>({
            query: (params) => ({
                method: "GET",
                params: filterParams(params),
                url: `${baseURLChannels}/create-excel`,
                cache: "no-cache",
                responseHandler: async (response) => {
                    const file = new File([await response.blob()], "telegram-channels.xlsx")
                    saveAs(window.URL.createObjectURL(file), "telegram-channels.xlsx")
                }
            }),
            providesTags: ["Channel"],
        }),
        getTelegramPostsExcel: builder.query<File, ITelegramPostsFilters>({
            query: (params) => ({
                method: "GET",
                params: filterParams(params),
                url: `${baseURLPosts}/create-excel`,
                cache: "no-cache",
                responseHandler: async (response) => {
                    const file = new File([await response.blob()], "telegram-posts.xlsx")
                    saveAs(window.URL.createObjectURL(file), "telegram-posts.xlsx")
                }
            }),
            providesTags: ["Post"],
        }),
        getTelegramPosts: builder.query<IPage<ITelegramPost>, Partial<ITelegramPostsFilters & IPagination>>({
            query: (params) => ({
                url: `${baseURLPosts}/get-page`,
                method: "GET",
                params: filterParams(params)
            }),
            providesTags: ["Post"]
        }),
        deleteTelegramChannel: builder.mutation<void, number>({
            query: (id) => ({
                url: `${baseURLChannels}/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Channel", "Post"]
        }),
        deleteTelegramChannels: builder.mutation<void, Array<number>>({
            query: (ids) => ({
                url: `${baseURLChannels}/delete/bulk`,
                method: "DELETE",
                body: ids
            }),
            invalidatesTags: ["Channel"]
        }),
        checkTelegramChannel: builder.mutation<void, number>({
            query: (id) => ({
                url: `${baseURLChannels}/check/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["Channel"]
        }),
        deleteTelegramPost: builder.mutation<void, number>({
            query: (id) => ({
                url: `${baseURLPosts}/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Post"]
        }),
        deleteTelegramPosts: builder.mutation<void, Array<number>>({
            query: (ids) => ({
                url: `${baseURLPosts}/delete/bulk`,
                method: "DELETE",
                body: ids
            }),
            invalidatesTags: ["Post"]
        }),
        checkTelegramPost: builder.mutation<void, number>({
            query: (id) => ({
                url: `${baseURLPosts}/check/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["Post"]
        }),
        getTelegramPostsCountBySubcultures: builder.query<Array<IInfographicsData>, boolean>({
            query: (actual) => ({
                url: `${baseURLPosts}/count-by-subcultures`,
                params: {
                    actual
                }
            })
        }),
        getTelegramChannelsCountBySubcultures: builder.query<Array<IInfographicsData>, boolean>({
            query: (actual) => ({
                url: `${baseURLChannels}/count-by-subcultures`,
                params: {
                    actual
                }
            })
        })
    }),
})