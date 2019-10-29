import { storiesOf } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';

import * as T from '../../../types';

import { mockState } from '../../../mock-test/mock-store';

import HobbyList, { Props } from './index';

const hobby: (num: number) => T.Hobby = (num) => ({
  id: num.toString(),
  name: `Hobby ${num}`,
  passionLevel: T.HOBBY_PASSION_LEVEL.MEDIUM,
  year: 2018,
  user: mockState.user.users[0].id,
  created_at: new Date(),
  updated_at: new Date(),
});
const props: Props = {
  isUserSelected: true,
  hobbies: [hobby(1), hobby(2)],
  isGettingHobbies: false,
  deletingIds: [],
  deleteHobby: action('Delete User'),
};
storiesOf('Molecules|HobbyList', module)
  .add('default', () => {
    return (
      <HobbyList {...props} />
    );
  })
  .add('No User selected', () => {
    return (
      <HobbyList {...props} hobbies={[]} isUserSelected={false} />
    );
  })
  .add('No Hobbies', () => {
    return (
      <HobbyList {...props} hobbies={[]} />
    );
  });
