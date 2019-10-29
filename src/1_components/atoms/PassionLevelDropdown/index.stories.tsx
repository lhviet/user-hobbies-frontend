import { storiesOf } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';

import PassionLevelDropdown from './';

storiesOf('Atoms|PassionLevelDropdown', module)
  .add('default', () => {
    return (
      <PassionLevelDropdown onSelect={action('onSelect')} />
    );
  });
