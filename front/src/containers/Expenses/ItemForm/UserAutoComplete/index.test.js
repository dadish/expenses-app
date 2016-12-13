import React from 'react';
import { shallow } from 'enzyme';
import { InputUserAutoComplete, mapStateToProps, mapDispatchToProps } from './';
import { updateMatches } from './actions';

const formId = 'qaedja';
const matchStr = 'sdzhnwk';
const props = {
  formId,
  name: 'string',
  style: {},
  dataSource: [],
  userEmail: 'string',
  handleUpdateInput: () => {},
  handleChange: () => {},
};

const email = 'weasdukgjqnwa@wjajk.das';
const userDataSource = [];
const state = {
  form: {
    [formId]: {
      values: {
        userEmail: email,
        userDataSource,
      },
    },
  },
};

test('InputUserAutoComplete renders without errors with all props provided', () => {
  shallow(<InputUserAutoComplete {...props} />);
});

test('InputUserAutoComplete renders without errors without dataSource prop', () => {
  const propsWithoutDataSource = {
    ...props,
    dataSource: undefined,
  };
  shallow(<InputUserAutoComplete {...propsWithoutDataSource} />);
});

describe('mapStateToProps() selects', () => {
  const { dataSource, userEmail } = mapStateToProps(state, props);
  it('state.form.formId.values.userDataSource as dataSource', () => {
    expect(dataSource).toBe(userDataSource);
    expect(userEmail).toBe(email);
  });
});

describe('mapDispatchToProps()', () => {
  const dispatch = jest.fn();
  const onChange = jest.fn();
  const id = 12123;
  const value = { id, email };
  const input = {
    value: id,
    onChange,
  };
  const { handleChange, handleUpdateInput } = mapDispatchToProps(dispatch, { input, formId });

  jest.useFakeTimers();

  describe('handleUpdateInput()', () => {
    it('debounces the calls and invokes only last one', () => {
      handleUpdateInput(matchStr);
      handleUpdateInput(matchStr);
      handleUpdateInput(matchStr);
      jest.runAllTimers();
      expect(dispatch.mock.calls.length).toBe(1);
    });
    it('dispatches the updateMatches action', () => {
      expect(dispatch.mock.calls[0][0]).toEqual(updateMatches({ formId, matchStr }));
    });
  });

  describe('handleChange()', () => {
    it('invokes input.onChange with value.id', () => {
      handleChange(value);
      expect(onChange.mock.calls[0][0]).toBe(value.id);
    });
  });
});
