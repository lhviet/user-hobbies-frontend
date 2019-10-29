import React from 'react';
import styled from 'styled-components';

import { styles } from '../../../5_constants/theme';

const Root = styled.input.attrs({
  type: 'text',
})`
  ${styles.primaryOutlineBtn};
  
  cursor: text;
  text-align: left;
  font-size: 1rem;
  min-width: 6rem;
`;

export default React.memo(Root);
