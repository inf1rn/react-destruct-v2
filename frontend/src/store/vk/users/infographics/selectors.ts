import { ISelectors } from './../../../store';
export const vkInfographicsUsersSelectors = {
    filters: (state) => state.vkUsersInfographicsSlice.filters,
    currentFilters: (state) => state.vkUsersInfographicsSlice.currentFilters
} as ISelectors