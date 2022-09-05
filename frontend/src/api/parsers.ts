import { IPage } from './../types/page.d';
import { IParser, ParserEntitiesType, ParserSocialsType, IGetParserBody } from './../types/parsers.d';
import { saveAs } from 'file-saver';
import { IParsersLogsFilters, IParserLog } from '../types/parsers';
import { baseAPI } from './base';
import { filterParams } from '../utils/params';

const baseURL = "/parsers"

export const parsersAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getParserLogs: builder.query<IPage<IParserLog>, IParsersLogsFilters>({
            query: (params) => ({
                url: `${baseURL}/get-page`,
                params: filterParams(params),
            })
        }),
        getParserLogsExcel: builder.query<File, IParsersLogsFilters>({
            query: (params) => ({
                method: "GET",
                params: filterParams(params),
                url: `${baseURL}/logs-create-excel`,
                cache: "no-cache",
                responseHandler: async (response) => {
                    const file = new File([await response.blob()], "logs.xlsx")
                    saveAs(window.URL.createObjectURL(file), "logs.xlsx")
                }
            }),
        }),
        getParser: builder.query<IParser, IGetParserBody>({
            query: (body) => ({
                url: `${baseURL}`,
                method: "GET",
                params: {
                    entity: body.entity,
                    social: body.social
                }
            })
        }),
        startVkGroupsParser: builder.mutation<void, void>({
            query: () => ({
                url: `${baseURL}/vk/groups`,
                method: "POST"
            })
        }),
        startVkUsersParser: builder.mutation<void, void>({
            query: () => ({
                url: `${baseURL}/vk/users`,
                method: "POST"
            })
        }),
        startTiktokUsersParser: builder.mutation<void, void>({
            query: () => ({
                url: `${baseURL}/tiktok/users`,
                method: "POST"
            })
        }),
        startTiktokPostsParser: builder.mutation<void, void>({
            query: () => ({
                url: `${baseURL}/tiktok/posts`,
                method: "POST"
            })
        }),
        startTelegramChannelsParser: builder.mutation<void, void>({
            query: () => ({
                url: `${baseURL}/telegram/channels`,
                method: "POST"
            })
        }),
        startTelegramPostsParser: builder.mutation<void, void>({
            query: () => ({
                url: `${baseURL}/telegram/posts`,
                method: "POST"
            })
        }),
    })
})