import { ISelectors } from './../../store';

export const tiktokPostsSelectors = {
    filters: (state) => state.tiktokPosts.filters,
    currentFilters: (state) => state.tiktokPosts.currentFilters,
    pagination: (state) => state.tiktokPosts.pagination,
    selectedPosts: state => state.tiktokPosts.selectedPosts,
} as ISelectors