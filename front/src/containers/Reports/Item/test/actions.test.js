import expect from 'expect';
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
} from '../constants';
import {
  editModeOn,
  editModeOff,
  save,
  saveSuccess,
  saveError,
  create,
  del,
  deleteSuccess,
  deleteError,
} from '../actions';

const actionsMap = {
  editModeOn: {
    name: 'editModeOn',
    method: editModeOn,
    constant: EDIT_MODE_ON,
  },
  editModeOff: {
    name: 'editModeOff',
    method: editModeOff,
    constant: EDIT_MODE_OFF,
  },
  save: {
    name: 'save',
    method: save,
    constant: SAVE,
  },
  saveSuccess: {
    name: 'saveSuccess',
    method: saveSuccess,
    constant: SAVE_SUCCESS,
  },
  saveError: {
    name: 'saveError',
    method: saveError,
    constant: SAVE_ERROR,
  },
  create: {
    name: 'create',
    method: create,
    constant: CREATE,
  },
  del: {
    name: 'del',
    method: del,
    constant: DELETE,
  },
  deleteSuccess: {
    name: 'deleteSuccess',
    method: deleteSuccess,
    constant: DELETE_SUCCESS,
  },
  deleteError: {
    name: 'deleteError',
    method: deleteError,
    constant: DELETE_ERROR,
  },
};

Object.keys(actionsMap).forEach((key) => {
  const { method, name, constant } = actionsMap[key];
  describe(`action ${name}`, () => {
    it('returns the right type', () => {
      expect(method().type).toBe(constant);
    });
    it('sets the first argument to the payload property', () => {
      const target = {};
      expect(method(target).payload).toBe(target);
    });
  });
});
