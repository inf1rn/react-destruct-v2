import { RootStateType, ISelectors } from './../../store';
export const tagsSelectors = {
    pagination: (state: RootStateType) => state.tags.pagination,
    filters: (state: RootStateType) => state.tags.filters,
    currentFilters: state => state.tags.currentFilters
} as ISelectors