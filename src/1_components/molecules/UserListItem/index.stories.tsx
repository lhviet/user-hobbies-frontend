import { storiesOf } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';

import * as T from '../../../types';

import { DEFAULT_AVATAR } from '../../../5_constants/data';

import UserListItem, { Props } from './index';

const user: T.User = {
  id: '1',
  name: 'Dummy User',
  avatarUrl: DEFAULT_AVATAR,
  created_at: new Date(),
  updated_at: new Date(),
  isHobbiesLoaded: false,
};
const props: Props = {
  user: user,
  isProcessing: false,
  isSelected: false,
  onSelect: action('Select User'),
  onDelete: action('Delete User'),
  onUpdate: action('Update User'),
};
storiesOf('Molecules|UserListItem', module)
  .add('default', () => {
    return (
      <UserListItem {...props} />
    );
  })
  .add('selected', () => {
    return (
      <UserListItem {...props} isSelected={true} />
    );
  })
  .add('processing', () => {
    return (
      <UserListItem {...props} isProcessing={true} />
    );
  });
