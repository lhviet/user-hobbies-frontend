import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import SearchInputField from './';

storiesOf('Molecules|SearchInputField', module)
  .add('default', () => {
    return (
      <SearchInputField search={action('Search')} addUser={action('Add New User')} />
    );
  })
  .add('searching', () => {
    return (
      <SearchInputField search={action('Search')} isSearching={true} addUser={action('Add New User')} />
    );
  });
