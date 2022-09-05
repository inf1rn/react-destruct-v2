import { cloneDeep } from 'lodash';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVkInfographicsUsersFilters } from '../../../../types/vk';

const baseFilters = {
    subscribersCountMin: 0,
    subscribersCountMax: 10000000,
    country: null,
    region: null,
    actual: false
} as IVkInfographicsUsersFilters

const initialState = {
    filters: cloneDeep(baseFilters),
    currentFilters: cloneDeep(baseFilters)
}

export const vkUsersInfographicsSlice = createSlice({
    name: "vkUsersInfographicsSlice",
    reducers: {
        setFiltersCountry(state, action: PayloadAction<{ country: string | null }>) {
            state.filters.country = action.payload.country
        },
        setFiltersDistrict(state, action: PayloadAction<{ region: string | null }>) {
            state.filters.region = action.payload.region
        },
        setFiltersSubscribersCountMin(state, action: PayloadAction<{ subscribersCountMin: number }>) {
            state.filters.subscribersCountMin = action.payload.subscribersCountMin
        },
        setFiltersSubscribersCountMax(state, action: PayloadAction<{ subscribersCountMax: number }>) {
            state.filters.subscribersCountMax = action.payload.subscribersCountMax
        },
        setCurrentFilters(state, action: PayloadAction<{ currentFilters: IVkInfographicsUsersFilters }>) {
            state.currentFilters = { ...action.payload.currentFilters }
        },
        clearFilters(state) {
            state.filters = cloneDeep(baseFilters)
        },
    },
    initialState
})

export const {
    setCurrentFilters, clearFilters, setFiltersCountry,
    setFiltersDistrict, setFiltersSubscribersCountMax, setFiltersSubscribersCountMin
} = vkUsersInfographicsSlice.actions