import { storiesOf } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';

import ConfirmationPopup, { Props } from './index';

const props: Props = {
  isVisible: true,
  messages: ['Dummy Message for Testing'],
  onConfirm: action('Confirm'),
  onCancel: action('Cancel'),
};
storiesOf('Molecules|ConfirmationPopup', module)
  .add('default', () => {
    return (
      <ConfirmationPopup {...props} />
    );
  });
