import { ISelectors } from '../../../store';
export const vkSearchSelectors = {
    filters: state => state.vkSearch.filters,
    currentFilters: state => state.vkSearch.currentFilters,
    selectedGroups: state => state.vkSearch.selectedGroups,
} as ISelectors