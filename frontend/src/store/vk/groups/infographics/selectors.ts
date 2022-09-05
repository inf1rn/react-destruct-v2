import { ISelectors } from './../../../store';
export const vkInfographicsGroupsSelectors = {
    filters: (state) => state.vkGroupsInfographicsSlice.filters,
    currentFilters: (state) => state.vkGroupsInfographicsSlice.currentFilters
} as ISelectors