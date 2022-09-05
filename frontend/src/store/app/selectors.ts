import { ISelectors } from './../store';
export const appSelectors = {
    initialized: (state) => state.app.initialized,
    moderate: state => state.app.moderate
} as ISelectors