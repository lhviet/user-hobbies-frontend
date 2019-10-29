import React, { FC, memo } from 'react';
import styled from 'styled-components';

import { HOBBY_PASSION_LEVEL } from '../../../types';

import { getHobbyPassionLevel } from '../../../4_services/hobby-service';

import { alpha, colors, styles } from '../../../5_constants/theme';

const Root = styled.select`
  ${styles.primaryOutlineBtn};
  
  cursor: pointer;
  border: solid 1px ${colors.grey.alpha(alpha.alpha8).toString()};
  border-radius: 3px;
  color: ${colors.grey.alpha(alpha.alpha8).toString()};
  transition: ease .3s;
  
  :hover {
    border-color: ${colors.green.alpha(alpha.alpha8).toString()};
  }
`;
const Item = styled.option`
  cursor: pointer;
  padding: 0.1rem;
  border: solid 1px ${colors.grey.alpha(alpha.alpha8).toString()};
  border-radius: 3px;
  color: ${colors.grey.alpha(alpha.alpha8).toString()};
  transition: ease .3s;
  
  :hover {
    border-color: ${colors.green.alpha(alpha.alpha8).toString()};
  }
`;

interface Props {
  className?: string;
  onSelect?(level: HOBBY_PASSION_LEVEL): void;
}

const PassionLevelDropdown: FC<Props> = ({ onSelect, className }: Props) => {
  const handleChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    onSelect && onSelect(parseInt(e.currentTarget.value));
  };

  const options = Object.values(HOBBY_PASSION_LEVEL)
    .filter(value => typeof value === 'number')
    .map((value) => (
      <Item key={`p-${value}`} value={value}>
        Passion Level: {getHobbyPassionLevel(value as HOBBY_PASSION_LEVEL)}
      </Item>
    ));

  return (
    <Root onChange={handleChange} defaultValue={HOBBY_PASSION_LEVEL.MEDIUM} className={className}>
      {options}
    </Root>
  );
};

export default memo(PassionLevelDropdown);
