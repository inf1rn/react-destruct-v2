import { IPage } from './../types/page.d';
import { saveAs } from 'file-saver';
import { IUpdateTagBody, ITagFullInfo } from './../types/tags.d';
import { IUpdateSubcultureBody, ISubcultureFullInfo } from './../types/subcultures.d';
import { ISubculture } from '../types/subcultures';
import { IPagination } from '../types/pagination';
import { ISubculturesAndTagsFilters } from '../types/subculturesAndTags';
import { baseAPI } from './base';
import { ITag } from '../types/tags';
import { filterParams } from '../utils/params';

const baseAPIEnhanced = baseAPI.enhanceEndpoints({ addTagTypes: ["Subculture", "Tag"] })

const baseURLSubcultures = "/subcultures"
const baseURLTags = "/tags"

export const subculturesAndTagsAPI = baseAPIEnhanced.injectEndpoints({
    endpoints: (builder) => ({
        getAllSubcultures: builder.query<Array<ISubculture>, void>({
            query: () => ({
                url: `${baseURLSubcultures}`,
                method: "GET"
            }),
            providesTags: ["Subculture"]
        }),
        getTagsBySubculture: builder.query<Array<ITag>, string | number>({
            query: (subcultures: string | number) => ({
                url: `${baseURLTags}?subcultures=${subcultures}`,
                method: "GET"
            }),
            providesTags: ["Tag"]
        }),
        getSubcultures: builder.query<IPage<ISubcultureFullInfo>, ISubculturesAndTagsFilters & IPagination>({
            query: (params) => ({
                url: `${baseURLSubcultures}/get-page`,
                params
            }),
            providesTags: ["Subculture"]
        }),
        createSubculture: builder.mutation<ISubculture, Partial<ISubculture>>({
            query: (body) => ({
                url: `${baseURLSubcultures}/save`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Subculture", "Tag"]
        }),
        deleteSubculture: builder.mutation<void, number>({
            query: (id) => ({
                url: `${baseURLSubcultures}/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Subculture", "Tag"]
        }),
        updateSubculture: builder.mutation<void, IUpdateSubcultureBody>({
            query: (dto) => ({
                url: `${baseURLSubcultures}/update/${dto.id}`,
                body: dto,
                method: "PUT"
            }),
            invalidatesTags: ["Subculture"]
        }),
        getTags: builder.query<IPage<ITagFullInfo>, ISubculturesAndTagsFilters & IPagination>({
            query: (params) => ({
                url: `${baseURLTags}/get-page`,
                params
            }),
            providesTags: ["Tag"]
        }),
        createTag: builder.mutation<ITag, Partial<ITag>>({
            query: (body) => ({
                url: `${baseURLTags}/save`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Tag"]
        }),
        deleteTag: builder.mutation<void, number>({
            query: (id) => ({
                url: `${baseURLTags}/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Tag"]
        }),
        updateTag: builder.mutation<void, IUpdateTagBody>({
            query: (dto) => ({
                url: `${baseURLTags}/update/${dto.id}`,
                method: "PUT",
                body: dto
            }),
            invalidatesTags: ["Tag"]
        }),
        getSubculturesExcel: builder.query<File, ISubculturesAndTagsFilters>({
            query: (params) => ({
                method: "GET",
                params: filterParams(params),
                url: `${baseURLSubcultures}/create-excel`,
                cache: "no-cache",
                responseHandler: async (response) => {
                    const file = new File([await response.blob()], "subcultures.xlsx")
                    saveAs(window.URL.createObjectURL(file), "subcultures.xlsx")
                }
            }),
            providesTags: ["Subculture"],
        }),
        getTagsExcel: builder.query<File, ISubculturesAndTagsFilters>({
            query: (params) => ({
                method: "GET",
                params: filterParams(params),
                url: `${baseURLTags}/create-excel`,
                cache: "no-cache",
                responseHandler: async (response) => {
                    const file = new File([await response.blob()], "tags.xlsx")
                    saveAs(window.URL.createObjectURL(file), "tags.xlsx")
                }
            }),
            providesTags: ["Tag"],
        }),
    })
})