import { cloneDeep } from 'lodash';
import { SortDirection } from '../../../../types/filters';
import { IVkUsersFilters, SortBy } from '../../../../types/vk';
import { IPagination } from '../../../../types/pagination';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const baseFilters = {
    tags: null as string | null,
    subcultures: null as string | null,
    keyword: "",
    region: "",
    city: "",
    country: "",
    sortBy: "firstName" as SortBy,
    sortDirection: "ASC" as SortDirection,
    groupUrl: "",
    dateAt: null,
    dateTo: null,
    isChecked: false
} as IVkUsersFilters

const initialState = {
    filters: cloneDeep(baseFilters),
    currentFilters: cloneDeep(baseFilters),
    pagination: {
        page: 1,
        perPage: 20
    } as IPagination,
    selectedUsers: [] as Array<number>
}

export const vkCompareSlice = createSlice({
    name: "vkCompare",
    initialState,
    reducers: {
        setFiltersTag(state, action: PayloadAction<{ tag: string | null }>) {
            state.filters.tags = action.payload.tag
        },
        setFiltersSubculture(state, action: PayloadAction<{ subculture: string | null }>) {
            state.filters.subcultures = action.payload.subculture
        },
        setFiltersKeyword(state, action: PayloadAction<{ keyword: string }>) {
            state.filters.keyword = action.payload.keyword
        },
        setFiltersGroupUrl(state, action: PayloadAction<{ groupUrl: string }>) {
            state.filters.groupUrl = action.payload.groupUrl
        },
        setFiltersCity(state, action: PayloadAction<{ city: string }>) {
            state.filters.city = action.payload.city
        },
        setFiltersDistrict(state, action: PayloadAction<{ region: string }>) {
            state.filters.region = action.payload.region
        },
        setFiltersIsChecked(state, action: PayloadAction<{ isChecked: boolean }>) {
            state.currentFilters.isChecked = action.payload.isChecked
            state.filters.isChecked = action.payload.isChecked
        },
        setFiltersCountry(state, action: PayloadAction<{ country: string }>) {
            state.filters.country = action.payload.country
        },
        setFiltersSortBy(state, action: PayloadAction<{ sortBy: SortBy }>) {
            state.filters.sortBy = action.payload.sortBy
        },
        setFiltersDateAt(state, action: PayloadAction<{ dateAt: Date | null}>) {
            state.filters.dateAt = action.payload.dateAt
        },
        setFiltersDateTo(state, action: PayloadAction<{ dateTo: Date | null}>) {
            state.filters.dateTo = action.payload.dateTo
        },
        setCurrentFilters(state, action: PayloadAction<{ currentFilters: IVkUsersFilters }>) {
            state.currentFilters = { ...action.payload.currentFilters }
        },
        setFiltersSortDirection(state, action: PayloadAction<{ sortDirection: SortDirection }>) {
            state.filters.sortDirection = action.payload.sortDirection
        },
        clearFilters(state) {
            state.filters = cloneDeep(baseFilters)
        },
        setPaginationPage(state, action: PayloadAction<{ page: number }>) {
            state.pagination.page = action.payload.page
        },
        setPaginationPerPage(state, action: PayloadAction<{ perPage: number }>) {
            state.pagination.perPage = action.payload.perPage
        },
        toggleSelectedUser(state, action: PayloadAction<{ id: number, isSelected?: boolean }>) {
            const id = action.payload.id
            const isSelected = action.payload.isSelected

            if (isSelected !== true && state.selectedUsers.includes(id)) {
                state.selectedUsers.splice(state.selectedUsers.indexOf(id), 1)
            } else if (!state.selectedUsers.includes(id)) {
                state.selectedUsers.push(id)
            }
        },
        clearSelectedUsers(state) {
            state.selectedUsers = []
        }
    }
})

export const {
    setFiltersTag, setFiltersSubculture, setPaginationPage, setPaginationPerPage, setFiltersCity, setFiltersCountry,
    setFiltersDistrict,  setFiltersGroupUrl, setFiltersKeyword, setFiltersSortBy, setFiltersSortDirection, clearFilters, 
    setCurrentFilters, setFiltersDateAt, setFiltersDateTo, clearSelectedUsers, toggleSelectedUser, setFiltersIsChecked
} = vkCompareSlice.actions 