import { RootStateType } from '../redux/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never
export type TimerType = ReturnType<typeof setTimeout>
export type ThunkDispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>
