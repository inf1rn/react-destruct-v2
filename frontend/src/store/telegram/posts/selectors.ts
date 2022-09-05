import { ISelectors } from './../../store';
export const telegramPostsSelectors = {
    filters: (state) => state.telegramPosts.filters,
    currentFilters: (state) => state.telegramPosts.currentFilters,
    pagination: (state) => state.telegramPosts.pagination,
    selectedPosts: state => state.telegramPosts.selectedPosts,
} as ISelectors