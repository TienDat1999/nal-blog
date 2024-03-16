import { createReducer, on, Action } from '@ngrx/store';
import { login, loginSuccess, loginFail } from '../actions/app.actions';
import {IApp, initialAppState} from "@app/store/modeles/app.interface";

export const userFeatureKey = 'AppState';

export const reducer = createReducer(
  initialAppState as IApp,
  on(login, (state) => {
    return {
      ...state,
    }
  }),
  on(loginSuccess, (state) => ({
    ...state,
    authenticationMessage: null,
  })),
  on(loginFail, (state, { message }) => ({
    ...state,
    authenticationMessage: message,
  }))
);

export function AppReducer(state: IApp, action: Action): IApp {
  return reducer(state as IApp, action as Action);
}
