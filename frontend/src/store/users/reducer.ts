import { cloneDeep } from 'lodash';
import { SortDirection } from '../../types/filters';
import { IUsersFilters, SortBy } from '../../types/users';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { subtractDate } from '../../utils/date';

const baseFilters = {
    keyword: "",
    district: null,
    role: null,
    status: null,
    city: "",
    sortBy: "name" as SortBy,
    sortDirection: "ASC" as SortDirection,
    dateAt: null,
    dateTo: null,
} as IUsersFilters

const initialState = {
    filters: cloneDeep(baseFilters),
    currentFilters: cloneDeep(baseFilters),
    pagination: {
        perPage: 10,
        page: 1,
    },
    selectedUsers: [] as Array<number>
}

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setPaginationPerPage(state, action: PayloadAction<{ perPage: number }>) {
            state.pagination.perPage = action.payload.perPage
        },
        setPaginationPage(state, action: PayloadAction<{ page: number }>) {
            state.pagination.page = action.payload.page
        },
        setFiltersKeyword(state, action: PayloadAction<{ keyword: string }>) {
            state.filters.keyword = action.payload.keyword
        },
        setFiltersSortBy(state, action: PayloadAction<{ sortBy: SortBy }>) {
            state.filters.sortBy = action.payload.sortBy
        },
        setFiltersDistrict(state, action: PayloadAction<{ district: string | null }>) {
            state.filters.district = action.payload.district
        },
        setFiltersDateAt(state, action: PayloadAction<{ dateAt: Date | null }>) {
            state.filters.dateAt = action.payload.dateAt
        },
        setFiltersDateTo(state, action: PayloadAction<{ dateTo: Date | null }>) {
            state.filters.dateTo = action.payload.dateTo
        },
        setFiltersCity(state, action: PayloadAction<{ city: string }>) {
            state.filters.city = action.payload.city
        },
        setFiltersStatus(state, action: PayloadAction<{ status: string | null }>) {
            state.filters.status = action.payload.status
        },
        setCurrentFilters(state, action: PayloadAction<{currentFilters: IUsersFilters}>) {
            state.currentFilters = action.payload.currentFilters
        },
        setRole(state, action: PayloadAction<{ role: string | null }>) {
            state.filters.role = action.payload.role
        },
        setFiltersSortDirection(state, action: PayloadAction<{ sortDirection: SortDirection }>) {
            state.filters.sortDirection = action.payload.sortDirection
        },
        clearFilters(state) {
            state.filters = cloneDeep(baseFilters)
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
    setFiltersStatus, setFiltersKeyword, setPaginationPage,
    setPaginationPerPage, setFiltersDateAt, setFiltersDateTo, setCurrentFilters,
    setFiltersDistrict, setRole, setFiltersCity, clearFilters,
    setFiltersSortBy, setFiltersSortDirection, toggleSelectedUser, clearSelectedUsers } = usersSlice.actions