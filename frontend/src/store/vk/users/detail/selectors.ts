import { ISelectors } from './../../../store';
export const vkUserDetailSelectors = {
    pagination: (state) => state.vkUserDetail.pagination,
} as ISelectors