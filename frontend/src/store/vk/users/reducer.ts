import { cloneDeep } from 'lodash';
import { SortDirection } from './../../../types/filters.d';
import { IVkUsersFilters, SortBy } from './../../../types/vk.d';
import { IPagination } from './../../../types/pagination.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const baseFilters = {
    tags: null as string | null,
    subcultures: null as string | null,
    keyword: "",
    region: null,
    city: null,
    country: null,
    sortBy: "firstName" as SortBy,
    sortDirection: "ASC" as SortDirection,
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

export const vkUsersSlice = createSlice({
    name: "vkUsers",
    initialState,
    reducers: {
        setFiltersTags(state, action: PayloadAction<{ tags: string | null }>) {
            state.filters.tags = action.payload.tags
        },
        setFiltersSubcultures(state, action: PayloadAction<{ subcultures: string | null }>) {
            state.filters.subcultures = action.payload.subcultures
        },
        setFiltersKeyword(state, action: PayloadAction<{ keyword: string }>) {
            state.filters.keyword = action.payload.keyword
        },
        setFiltersCity(state, action: PayloadAction<{ city: string | null }>) {
            state.filters.city = action.payload.city
        },
        setFiltersDistrict(state, action: PayloadAction<{ region: string | null }>) {
            state.filters.region = action.payload.region
        },
        setFiltersCountry(state, action: PayloadAction<{ country: string | null }>) {
            state.filters.country = action.payload.country
        },
        setFiltersSortBy(state, action: PayloadAction<{ sortBy: SortBy }>) {
            state.filters.sortBy = action.payload.sortBy
        },
        setCurrentFilters(state, action: PayloadAction<{ currentFilters: IVkUsersFilters }>) {
            state.currentFilters = { ...action.payload.currentFilters }
        },
        setFiltersSortDirection(state, action: PayloadAction<{ sortDirection: SortDirection }>) {
            state.filters.sortDirection = action.payload.sortDirection
        },
        setFiltersDateAt(state, action: PayloadAction<{ dateAt: Date | null }>) {
            state.filters.dateAt = action.payload.dateAt
        },
        setFiltersIsChecked(state, action: PayloadAction<{ isChecked: boolean }>) {
            state.currentFilters.isChecked = action.payload.isChecked
            state.filters.isChecked = action.payload.isChecked
        },
        setFiltersDateTo(state, action: PayloadAction<{ dateTo: Date | null }>) {
            state.filters.dateTo = action.payload.dateTo
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
    setFiltersTags, setFiltersSubcultures, setPaginationPage, setPaginationPerPage, setFiltersCity, setFiltersCountry,
    setFiltersDistrict, setFiltersKeyword, setFiltersSortBy, setFiltersSortDirection, clearFilters, setCurrentFilters,
    setFiltersDateAt, setFiltersDateTo, toggleSelectedUser, clearSelectedUsers, setFiltersIsChecked
} = vkUsersSlice.actions 