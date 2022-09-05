import { cloneDeep } from 'lodash';
import { SortDirection } from './../../../types/filters.d';
import { ITiktokUsersFilters, SortBy } from './../../../types/tiktok.d';
import { IPagination } from './../../../types/pagination.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const baseFilters = {
    tags: null as string | null,
    subcultures: null as string | null,
    keyword: "",
    sortBy: "username" as SortBy,
    sortDirection: "ASC" as SortDirection,
    subscribersCountMin: 0,
    subscribersCountMax: 150000,
    postsCountMin: 0,
    postsCountMax: 15000,
    dateAt: null,
    dateTo: null,
    isChecked: false
} as ITiktokUsersFilters

const initialState = {
    filters: cloneDeep(baseFilters),
    currentFilters: cloneDeep(baseFilters),
    pagination: {
        page: 1,
        perPage: 20
    } as IPagination,
    selectedUsers: [] as Array<number>

}

export const tiktokUsersSlice = createSlice({
    name: "tiktokUsers",
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
        setFiltersSortBy(state, action: PayloadAction<{ sortBy: SortBy }>) {
            state.filters.sortBy = action.payload.sortBy
        },
        setFiltersSortDirection(state, action: PayloadAction<{ sortDirection: SortDirection }>) {
            state.filters.sortDirection = action.payload.sortDirection
        },
        setFiltersSubscribersCountMin(state, action: PayloadAction<{ subscribersCountMin: number }>) {
            state.filters.subscribersCountMin = action.payload.subscribersCountMin
        },
        setFiltersSubscribersCountMax(state, action: PayloadAction<{ subscribersCountMax: number }>) {
            state.filters.subscribersCountMax = action.payload.subscribersCountMax
        },
        setFiltersPostsCountMin(state, action: PayloadAction<{ postsCountMin: number }>) {
            state.filters.postsCountMin = action.payload.postsCountMin
        },
        setFiltersPostsCountMax(state, action: PayloadAction<{ postsCountMax: number }>) {
            state.filters.postsCountMax = action.payload.postsCountMax
        },
        setFiltersIsChecked(state, action: PayloadAction<{ isChecked: boolean }>) {
            state.currentFilters.isChecked = action.payload.isChecked
            state.filters.isChecked = action.payload.isChecked
        },
        setFiltersDateAt(state, action: PayloadAction<{ dateAt: Date | null }>) {
            state.filters.dateAt = action.payload.dateAt
        },
        setFiltersDateTo(state, action: PayloadAction<{ dateTo: Date | null }>) {
            state.filters.dateTo = action.payload.dateTo
        },
        setCurrentFilters(state, action: PayloadAction<{ currentFilters: ITiktokUsersFilters }>) {
            state.currentFilters = { ...action.payload.currentFilters }
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
    setFiltersTags, setCurrentFilters, clearFilters, setFiltersSubcultures, setFiltersPostsCountMax, setFiltersPostsCountMin,
    setFiltersSubscribersCountMax, setFiltersSubscribersCountMin, setPaginationPage, setPaginationPerPage, setFiltersKeyword,
    setFiltersSortBy, setFiltersSortDirection, setFiltersDateAt, setFiltersDateTo, toggleSelectedUser, clearSelectedUsers, 
    setFiltersIsChecked } = tiktokUsersSlice.actions 