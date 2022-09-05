import { subtractDate } from './../../../utils/date';
import { SortDirection } from './../../../types/filters.d';
import { ITelegramChannelsFilters, SortBy } from './../../../types/telegram.d';
import { IPagination } from './../../../types/pagination.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';

const baseFilters = {
    tags: null as string | null,
    subcultures: null as string | null,
    keyword: "",
    sortBy: "channelName" as SortBy,
    sortDirection: "ASC" as SortDirection,
    subscribersCountMin: 0,
    subscribersCountMax: 150000,
    postsCountMin: 0,
    postsCountMax: 15000,
    dateAt: null,
    dateTo: null,
    isChecked: false
} as ITelegramChannelsFilters

const initialState = {
    filters: cloneDeep(baseFilters),
    currentFilters: cloneDeep(baseFilters),
    pagination: {
        page: 1,
        perPage: 20
    } as IPagination,
    selectedChannels: [] as Array<number>
}

export const telegramChannelsSlice = createSlice({
    name: "telegramChannels",
    initialState,
    reducers: {
        setFiltersTags(state, action: PayloadAction<{ tags: string | null }>) {
            state.filters.tags = action.payload.tags
        },
        setFiltersSubcultures(state, action: PayloadAction<{ subcultures: string | null }>) {
            state.filters.subcultures = action.payload.subcultures
        },
        setFiltersSortBy(state, action: PayloadAction<{ sortBy: SortBy }>) {
            state.filters.sortBy = action.payload.sortBy
        },
        setFiltersSortDirection(state, action: PayloadAction<{ sortDirection: SortDirection }>) {
            state.filters.sortDirection = action.payload.sortDirection
        },
        setFiltersKeyword(state, action: PayloadAction<{ keyword: string }>) {
            state.filters.keyword = action.payload.keyword
        },
        setFiltersIsChecked(state, action: PayloadAction<{ isChecked: boolean }>) {
            state.currentFilters.isChecked = action.payload.isChecked
            state.filters.isChecked = action.payload.isChecked
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
        setFiltersDateAt(state, action: PayloadAction<{ dateAt: Date | null }>) {
            state.filters.dateAt = action.payload.dateAt
        },
        setFiltersDateTo(state, action: PayloadAction<{ dateTo: Date | null }>) {
            state.filters.dateTo = action.payload.dateTo
        },
        setCurrentFilters(state, action: PayloadAction<{ currentFilters: ITelegramChannelsFilters }>) {
            state.currentFilters = action.payload.currentFilters
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
        toggleSelectedChannel(state, action: PayloadAction<{ id: number, isSelected?: boolean }>) {
            const id = action.payload.id
            const isSelected = action.payload.isSelected

            if (isSelected !== true && state.selectedChannels.includes(id)) {
                state.selectedChannels.splice(state.selectedChannels.indexOf(id), 1)
            } else if (!state.selectedChannels.includes(id)) {
                state.selectedChannels.push(id)
            }
        },
        clearSelectedChannels(state) {
            state.selectedChannels = []
        }
    }
})

export const {
    setFiltersTags, setCurrentFilters, setFiltersSubcultures, setFiltersPostsCountMax, setFiltersPostsCountMin,
    setFiltersSubscribersCountMax, setFiltersSubscribersCountMin, setPaginationPage, setPaginationPerPage, setFiltersKeyword,
    setFiltersSortDirection, setFiltersSortBy, clearFilters, setFiltersDateAt, setFiltersDateTo, clearSelectedChannels,
    toggleSelectedChannel, setFiltersIsChecked } = telegramChannelsSlice.actions 