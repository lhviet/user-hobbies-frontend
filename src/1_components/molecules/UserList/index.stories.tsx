import { storiesOf } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';

import * as T from '../../../types';

import { DEFAULT_AVATAR } from '../../../5_constants/data';

import UserList from './index';

storiesOf('Molecules|UserList', module)
  .add('default', () => {
    const user: (num: number) => T.User = (num) => ({
      id: num.toString(),
      name: `User ${num}`,
      avatarUrl: DEFAULT_AVATAR,
      created_at: new Date(),
      updated_at: new Date(),
      isHobbiesLoaded: false,
    });

    return (
      <UserList
        users={[user(1), user(2)]}
        selectUser={action('Select User')}
        updateUser={action('Update User')}
        deleteUser={action('Delete User')}
      />
    );
  });
