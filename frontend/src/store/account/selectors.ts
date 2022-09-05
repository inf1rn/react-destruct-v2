import { ISelectors } from './../store';
export const accountSelectors = {
    jwt: (state) => state.account.jwt 
} as ISelectors