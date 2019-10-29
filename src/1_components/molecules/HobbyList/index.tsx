import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

import * as T from '../../../types';

import HobbyListItem from '../HobbyListItem';

const Root = styled.div`
  padding: 0.2rem 0;
`;
const List = styled.ul`
  list-style: none;
`;
const Loading = styled.div`
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  
  :after {
    content: 'Loading...';
  }
`;
const NoHobbies = styled.div`
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  
  :after {
    content: 'This User has no Hobbies. Please try to add one.';
  }
`;
const NoSelectedUser = styled(NoHobbies)`
  :after {
    content: 'No User selected. Please select a User to see or add new Hobbies.';
  }
`;

export interface Props {
  hobbies: Array<T.Hobby>;
  isUserSelected: boolean,
  isGettingHobbies: boolean,
  deletingIds: Array<string>,
  deleteHobby(hobby: T.Hobby): void;
  className?: string;
}

class HobbyList extends Component<Props> {
  render() {
    const {
      hobbies, isGettingHobbies, isUserSelected, deletingIds, deleteHobby, className,
    }: Props = this.props;

    const hobbyItems: ReactNode = hobbies
      .map((h, index) => {
        return (
          <HobbyListItem
            key={`h_${index}`}
            hobby={h}
            isProcessing={deletingIds.includes(h.id)}
            onDelete={deleteHobby}
          />
        );
      });
    const hobbyList: ReactNode = hobbies.length > 0 ? (
      <List>
        {hobbyItems}
      </List>
    ) : isUserSelected ? (
      <NoHobbies />
    ) : (
      <NoSelectedUser />
    );

    const content: ReactNode = isGettingHobbies ? <Loading /> : hobbyList;

    return (
      <Root className={className}>
        {content}
      </Root>
    );
  }
}

export default HobbyList;
