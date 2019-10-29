import React, { FC, memo } from 'react';
import styled from 'styled-components';

import { HOBBY_PASSION_LEVEL } from '../../../types';

import { colors, styles } from '../../../5_constants/theme';

import HobbyList from '../../../2_containers/molecules/HobbyList';
import HobbyCreatingSection from '../../molecules/HobbyCreatingSection';

const Root = styled.div`
  ${styles.scrollbar};
  overflow: auto;
  
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-right: solid 1px ${colors.grey.toString()};
`;
const HobbyCreatingSectionWrapper = styled.div`
  padding: .3rem 1rem;
`;

export interface Props {
  className?: string;
  addHobby(name: string, passion: HOBBY_PASSION_LEVEL, year: number): void;
}

const HobbyContent: FC<Props> = ({ addHobby, className }: Props) => {
  return (
    <Root className={className}>
      <HobbyCreatingSectionWrapper>
        <HobbyCreatingSection addHobby={addHobby} />
      </HobbyCreatingSectionWrapper>
      <HobbyList />
    </Root>
  );
};

export default memo(HobbyContent);
