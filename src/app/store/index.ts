import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import {IAppState} from "@app/store/modeles/app.interface";
import {AppReducer} from "@app/store/reduces/app.reducer";

export const reducers: ActionReducerMap<IAppState> = {
  AppState: AppReducer,
} as ActionReducerMap<IAppState>;
export const metaReducers: MetaReducer<IAppState>[] = [];
