import { cloneDeep } from 'lodash';
import { SortDirection } from './../../../types/filters.d';
import { IVkGroupsFilters, SortBy } from './../../../types/vk.d';
import { IPagination } from '../../../types/pagination';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const baseFilters = {
    tags: null as string | null,
    subcultures: null as string | null,
    keyword: "",
    region: null,
    city: null,
    country: null,
    membersCountMax: 150000,
    membersCountMin: 0,
    sortBy: "name" as SortBy,
    sortDirection: "ASC" as SortDirection,
    dateAt: null,
    dateTo: null,
    isChecked: false
} as IVkGroupsFilters

const initialState = {
    filters: cloneDeep(baseFilters),
    currentFilters: cloneDeep(baseFilters),
    pagination: {
        page: 1,
        perPage: 20
    } as IPagination,
    selectedGroups: [] as Array<number>
}

export const vkGroupsSlice = createSlice({
    name: "vkGroups",
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
        setFiltersCountry(state, action: PayloadAction<{ country: string | null }>) {
            state.filters.country = action.payload.country
        },
        setFiltersSortBy(state, action: PayloadAction<{ sortBy: SortBy }>) {
            state.filters.sortBy = action.payload.sortBy
        },
        setFiltersSortDirection(state, action: PayloadAction<{ sortDirection: SortDirection }>) {
            state.filters.sortDirection = action.payload.sortDirection
        },
        setFiltersIsChecked(state, action: PayloadAction<{ isChecked: boolean }>) {
            state.currentFilters.isChecked = action.payload.isChecked
            state.filters.isChecked = action.payload.isChecked
        },
        setFiltersDistrict(state, action: PayloadAction<{ region: string | null }>) {
            state.filters.region = action.payload.region
        },
        setFiltersSubscribersCountMin(state, action: PayloadAction<{ membersCountMin: number }>) {
            state.filters.membersCountMin = action.payload.membersCountMin
        },
        setFiltersSubscribersCountMax(state, action: PayloadAction<{ membersCountMax: number }>) {
            state.filters.membersCountMax = action.payload.membersCountMax
        },
        setFiltersDateAt(state, action: PayloadAction<{ dateAt: Date | null }>) {
            state.filters.dateAt = action.payload.dateAt
        },
        setFiltersDateTo(state, action: PayloadAction<{ dateTo: Date | null }>) {
            state.filters.dateTo = action.payload.dateTo
        },
        setCurrentFilters(state, action: PayloadAction<{ currentFilters: IVkGroupsFilters }>) {
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
        toggleSelectedGroup(state, action: PayloadAction<{ id: number, isSelected?: boolean }>) {
            const id = action.payload.id
            const isSelected = action.payload.isSelected

            if (isSelected !== true && state.selectedGroups.includes(id)) {
                state.selectedGroups.splice(state.selectedGroups.indexOf(id), 1)
            } else if (!state.selectedGroups.includes(id)) {
                state.selectedGroups.push(id)
            }
        },
        clearSelectedGroups(state) {
            state.selectedGroups = []
        }
    }
})

export const {
    setFiltersTags, setFiltersSubcultures, setFiltersCity, setFiltersCountry, setFiltersDistrict, setPaginationPage,
    clearFilters, setPaginationPerPage, setFiltersKeyword, setFiltersSortBy, setFiltersSortDirection, setFiltersSubscribersCountMax,
    setFiltersSubscribersCountMin, setCurrentFilters, setFiltersDateAt, setFiltersDateTo, toggleSelectedGroup, clearSelectedGroups, 
    setFiltersIsChecked } = vkGroupsSlice.actions 