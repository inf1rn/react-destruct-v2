import { ISelectors } from './../store';
export const usersSelectors = {
    filters: (state) => state.users.filters,
    currentFilters: (state) => state.users.currentFilters,
    pagination: (state) => state.users.pagination,
    selectedUsers: state => state.users.selectedUsers,
} as ISelectors