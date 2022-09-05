import { baseAPI } from '../api/base';
import { rootReducer } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: rootReducer,
    //@ts-ignore
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), baseAPI.middleware]
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export interface ISelectors {
    [key: string]: (state: RootStateType) => any
}