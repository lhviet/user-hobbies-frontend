import React, { FC, memo } from 'react';
import styled from 'styled-components';

import { styles } from '../../../5_constants/theme';

import SearchInputField from '../../molecules/SearchInputField';

import UserList from '../../../2_containers/molecules/UserList';

const Root = styled.div`
  ${styles.scrollbar};
  overflow: auto;
  
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

function arePropsEqual(prevProps: Props, props: Props): boolean {
  return prevProps.isSearching === props.isSearching;
}

export interface Props {
  isSearching: boolean;
  className?: string;
  search(value: string): void;
  addUser(value: string): void;
}

const LeftSideBar: FC<Props> = ({ isSearching, search, addUser, className }: Props) => {
  return (
    <Root className={className}>
      <SearchInputField isSearching={isSearching} search={search} addUser={addUser} />
      <UserList />
    </Root>
  );
};

export default memo(LeftSideBar, arePropsEqual);
