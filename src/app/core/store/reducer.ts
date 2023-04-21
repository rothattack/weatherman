import { createReducer, on } from '@ngrx/store';
import { settingsUpdate, userUpdate } from './actions';
import { AppState } from '../types';

export const initialState: AppState = {
  user: null,
  isLoggedIn: false,
  setting: null,
};

const _appReducer = createReducer(
  initialState,
  on(userUpdate, (state, { user }) => ({
    ...state,
    user,
    isLoggedIn: user !== null,
  })),
  on(settingsUpdate, (state, { setting }) => ({
    ...state,
    setting,
  }))
);

export function appReducer(state, action) {
  return _appReducer(state, action);
}
