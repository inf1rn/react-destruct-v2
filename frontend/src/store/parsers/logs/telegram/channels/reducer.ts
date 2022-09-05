import { subtractDate } from './../../../../../utils/date';
import { cloneDeep } from 'lodash';
import { IParsersLogsFilters } from '../../../../../types/parsers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const baseFilters = {
    dateAt: null,
    dateTo: null,
    keyword: "",
    social: "telegram",
    entity: "channel"
} as IParsersLogsFilters

const initialState = {
    filters: cloneDeep(baseFilters),
    currentFilters: cloneDeep(baseFilters),
    pagination: {
        perPage: 20,
        page: 1
    }
}

export const parsersLogsTelegramChannelsSlice = createSlice({
    name: "parsersLogsTelegramChannels",
    initialState,
    reducers: {
        setCurrentFilters(state, action: PayloadAction<{ currentFilters: IParsersLogsFilters }>) {
            state.currentFilters = action.payload.currentFilters
        },
        clearFilters(state) {
            state.filters = cloneDeep(baseFilters)
        },
        setFiltersDateAt(state, action: PayloadAction<{ dateAt: Date | null}>) {
            state.filters.dateAt = action.payload.dateAt
        },
        setFiltersDateTo(state, action: PayloadAction<{ dateTo: Date | null}>) {
            state.filters.dateTo = action.payload.dateTo
        },
        setFiltersKeyword(state, action: PayloadAction<{ keyword: string }>) {
            state.filters.keyword = action.payload.keyword
        },
        setPaginationPage(state, action: PayloadAction<{ page: number }>) {
            state.pagination.page = action.payload.page
        },
        setPaginationPerPage(state, action: PayloadAction<{ perPage: number }>) {
            state.pagination.perPage = action.payload.perPage
        },
    }
})

export const {
    setCurrentFilters, setFiltersDateAt, setFiltersDateTo,
    setFiltersKeyword, setPaginationPage, setPaginationPerPage,
    clearFilters } = parsersLogsTelegramChannelsSlice.actions