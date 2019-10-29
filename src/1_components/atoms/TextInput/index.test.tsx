import React from 'react';
import { shallow } from 'enzyme';

import TextInput from './';

it('TextInput should render correctly', () => {
  const component = shallow(<TextInput />);
  expect(component).toBeTruthy();
});
