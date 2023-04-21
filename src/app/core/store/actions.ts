import { createAction, props } from '@ngrx/store';
import { AppState } from '../types';

export const userUpdate = createAction(
  '[User] Update',
  props<Pick<AppState, 'user'>>()
);

export const settingsUpdate = createAction(
  '[Settings] Update',
  props<Pick<AppState, 'setting'>>()
);
