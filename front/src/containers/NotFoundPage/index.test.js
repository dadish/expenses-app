import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from './';

it('renders without errors', () => {
  shallow(
    <NotFoundPage />
  );
});
