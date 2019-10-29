import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

import * as T from '../../../types';

import UserListItem from '../UserListItem';

const Root = styled.ul`
  padding: 0.2rem 0;
  list-style: none;
`;

export interface Props {
  users: Array<T.User>;

  selectedUserId?: string,
  processingUserId?: string,
  deleteUserStatus?: T.APIStatus,
  updateUserStatus?: T.APIStatus,

  selectUser(user: T.User): void;
  deleteUser(user: T.User): void;
  updateUser(user: T.User): void;

  className?: string;
}

class UserList extends Component<Props> {
  render() {
    const {
      users, selectedUserId, processingUserId, deleteUserStatus, updateUserStatus,
      selectUser, updateUser, deleteUser, className,
    }: Props = this.props;

    const userItems: ReactNode = users
      .map((u, index) => {
        const isProcessing: boolean =
          processingUserId !== undefined && processingUserId === u.id &&
          (
            (deleteUserStatus !== undefined && deleteUserStatus === T.APIStatus.PROCESSING) ||
            (updateUserStatus !== undefined && updateUserStatus === T.APIStatus.PROCESSING)
          );
        const isSelected: boolean = selectedUserId === u.id;

        return (
          <UserListItem
            key={`u_${index}`}
            user={u}
            isProcessing={isProcessing}
            isSelected={isSelected}
            onSelect={selectUser}
            onUpdate={updateUser}
            onDelete={deleteUser}
          />
        );
      });

    return (
      <Root className={className}>
        {userItems}
      </Root>
    );
  }
}

export default UserList;
