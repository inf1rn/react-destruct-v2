import { ISelectors } from './../../store';
export const vkUsersSelectors = {
    filters: (state) => state.vkUsers.filters,
    currentFilters: state => state.vkUsers.currentFilters,
    pagination: (state) => state.vkUsers.pagination,
    selectedUsers: state => state.vkUsers.selectedUsers,
} as ISelectors