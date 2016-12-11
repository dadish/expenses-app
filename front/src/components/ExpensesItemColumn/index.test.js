import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import ExpenseItemColumn, {
  ExpensesItemColumnId,
  ExpensesItemColumnUser,
  ExpensesItemColumnAmount,
  ExpensesItemColumnDate,
  ExpensesItemColumnDescription,
  ExpensesItemColumnComment,
  ExpensesItemColumnEdit,
} from './';

const components = {
  ExpenseItemColumn,
  ExpensesItemColumnId,
  ExpensesItemColumnUser,
  ExpensesItemColumnAmount,
  ExpensesItemColumnDate,
  ExpensesItemColumnDescription,
  ExpensesItemColumnComment,
  ExpensesItemColumnEdit,
};

Object.keys(components).forEach((key) => {
  describe(key, () => {
    const Component = components[key];
    it('renders without errors', () => {
      shallow(<Component />);
    });
    it('renders it`s children', () => {
      const child = <h1>hello {key}</h1>;
      const wrapper = shallow(<Component>{child}</Component>);
      expect(wrapper.contains(child)).toBe(true);
    });
  });
});
