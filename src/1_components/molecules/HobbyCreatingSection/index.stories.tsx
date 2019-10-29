import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import HobbyCreatingSection from './';

storiesOf('Molecules|HobbyCreatingSection', module)
  .add('default', () => {
    return (
      <HobbyCreatingSection addHobby={action('Add New Hobby')} />
    );
  });
