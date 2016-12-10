/**
 * Expenses Item actions
 */
import {
  EDIT_MODE_ON,
  EDIT_MODE_OFF,
  SAVE,
  SAVE_SUCCESS,
  SAVE_ERROR,
  CREATE,
  DELETE,
  DELETE_SUCCESS,
  DELETE_ERROR,
} from './constants';

const action = type => payload => ({ type, payload });

export const editModeOn = action(EDIT_MODE_ON);
export const editModeOff = action(EDIT_MODE_OFF);
export const save = action(SAVE);
export const saveSuccess = action(SAVE_SUCCESS);
export const saveError = action(SAVE_ERROR);
export const create = action(CREATE);
export const del = action(DELETE);
export const deleteSuccess = action(DELETE_SUCCESS);
export const deleteError = action(DELETE_ERROR);
