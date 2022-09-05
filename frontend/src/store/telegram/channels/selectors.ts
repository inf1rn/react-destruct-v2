import { ISelectors } from './../../store';

export const telegramChannelsSelectors = {
    filters: (state) => state.telegramChannels.filters,
    pagination: (state) => state.telegramChannels.pagination,
    currentFilters: (state) => state.telegramChannels.currentFilters,
    selectedChannels: state => state.telegramChannels.selectedChannels,
} as ISelectors