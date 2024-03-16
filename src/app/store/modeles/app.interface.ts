export interface IApp {
  username: string | null;
  password: string | null;
  authenticationMessage: string | null;
}

export interface IAppState {
  AppState: IApp;
}

export const initialAppState: IApp = {
  username: null,
  password: null,
  authenticationMessage: null,
};
