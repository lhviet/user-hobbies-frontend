import { storiesOf } from '@storybook/react';
import React from 'react';

import TextInput from './';

storiesOf('Atoms|TextInput', module)
  .add('default', () => {
    return (
      <TextInput value={'Primary TextInput'} />
    );
  });
