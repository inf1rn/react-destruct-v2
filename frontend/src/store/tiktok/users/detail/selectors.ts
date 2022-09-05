import { ISelectors } from './../../../store';
export const tiktokUserDetailSelectors = {
    pagination: (state) => state.tiktokUserDetail.pagination,
}  as ISelectors