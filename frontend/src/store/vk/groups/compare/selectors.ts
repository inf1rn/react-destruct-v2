import { ISelectors } from '../../../store';
export const vkCompareSelectors = {
    filters: (state) => state.vkCompare.filters,
    currentFilters: state => state.vkCompare.currentFilters,
    pagination: (state) => state.vkCompare.pagination,
    selectedUsers: state => state.vkCompare.selectedUsers,
} as ISelectors