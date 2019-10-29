import React from 'react';
import { shallow } from 'enzyme';

import PassionLevelDropdown from './';

it('PassionLevelDropdown should render correctly', () => {
  const component = shallow(<PassionLevelDropdown />);
  expect(component).toBeTruthy();
});
