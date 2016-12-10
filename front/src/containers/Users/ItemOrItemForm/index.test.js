import React from 'react';
import uniqueId from 'lodash/uniqueId';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { ItemOrItemForm } from './';

const props = {
  user: fromJS({
    cid: uniqueId('user_'),
    id: 0,
    email: '',
    role: 100,
    edit: false,
    saving: false,
    deleting: false,
  }),
  labels: [],
};

describe('ItemOrItemForm', () => {
  it('renders without errors when edit=false', () => {
    shallow(<ItemOrItemForm {...props} />);
  });
  it('renders without erros when edit=true', () => {
    props.user = props.user.set('edit', true);
    shallow(<ItemOrItemForm {...props} />);
  });
});
