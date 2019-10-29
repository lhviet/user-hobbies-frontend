import React, { FC, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';

import * as T from '../../../types';

import { alpha, colors } from '../../../5_constants/theme';
import { DEFAULT_AVATAR } from '../../../5_constants/data';

import TimestampInfo from '../../atoms/TimestampInfo';
import Button from '../../atoms/Button';
import ProcessingOverlay from '../../atoms/ProcessingOverlay';
import TextInput from '../../atoms/TextInput';

interface RootProps {
  isSelected: boolean;
}
const Root = styled.li<RootProps>`
  padding: 0.3rem;
  border-radius: 1px;
  color: ${colors.grey.toString()};
  transition: ease .2s;
  border-bottom: solid 1px ${colors.borderGray.alpha(alpha.alpha4).toString()};
  border-top: solid 1px transparent;
  border-left: solid 1px transparent;
  border-right: solid 1px transparent;
  
  background-color: ${props => props.isSelected ? colors.yellow.alpha(alpha.alpha4).toString() : ''};
  
  :hover {
    border-bottom-color: ${colors.blueDark.toString()};
  }
`;
const UserWrapper = styled.div`
  cursor: pointer;
`;
const Title = styled.div`
  display: inline-block;
  margin-left: 5px;
  font-size: 1rem;
  font-weight: bold;
  vertical-align: middle;
`;
const Input = styled(TextInput)`
  margin-top: 5px;
  text-align: left;
  width: calc(100% - 1.5rem);
`;
const Avatar = styled.img`
  width: 100%;
  height: auto;
  max-width: 3rem;
  max-height: 3rem;
  vertical-align: middle;
`;
const ButtonWrapper = styled.div`
  padding: 0.2rem 0;
  text-align: right;
`;
const DeleteBtn = styled(Button)`
  margin-right: .3rem;
  color: ${colors.red.alpha(.8).toString()};
  
  :hover {
    color: ${colors.red.toString()};
    border-color: ${colors.red.toString()};
  }
`;
const UpdateButton = styled(Button)`
  margin-right: .3rem;
  color: ${colors.white.toString()};
  background-color: ${colors.green.toString()};
  border-color: ${colors.green.alpha(alpha.alpha8).toString()};
  
  :hover {
    color: ${colors.green.toString()};
    background-color: ${colors.white.toString()};
  }
`;

export interface Props {
  user: T.User;
  isProcessing: boolean;
  isSelected: boolean;
  className?: string;
  onSelect(user: T.User): void;
  onDelete(user: T.User): void;
  onUpdate(user: T.User): void;
}

const UserListItem: FC<Props> = (
  { user, isSelected, isProcessing, onSelect, onUpdate, onDelete, className }: Props
) => {
  const [isEditing, setEditing] = useState(false);
  const toggleEdit = () => setEditing(!isEditing);

  const [title, setTitle] = useState(user.name);
  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const handleAvatarChange = (e: React.FormEvent<HTMLInputElement>) => setAvatarUrl(e.currentTarget.value);

  useEffect(() => {
    // Update the Title & Avatar when a User updated (success/failed)
    if (!isProcessing) {
      setTitle(user.name);
      setAvatarUrl(user.avatarUrl);
    }
  }, [user, isProcessing]);

  const handleSelect: () => void = () => onSelect(user);
  const handleDelete: () => void = () => onDelete(user);
  const handleUpdate: () => void = () => {
    if (onUpdate) {
      onUpdate({
        ...user,
        name: title, avatarUrl,
      });
    }
    toggleEdit();
  };

  const username: ReactNode = isEditing ? (
    <Input value={title} onChange={handleTitleChange} />
  ) : (
    <Title>{title}</Title>
  );
  const userAvatarImage: ReactNode = isEditing ? undefined : (
    <Avatar src={avatarUrl || DEFAULT_AVATAR} />
  );
  const userAvatarInput: ReactNode = isEditing ? (
    <Input value={avatarUrl} onChange={handleAvatarChange} />
  ) : undefined;

  const editButtonLabel: string = isEditing ? 'Cancel' : 'Edit';
  const updateBtn: ReactNode = isEditing ? (
    <UpdateButton onClick={handleUpdate}>Update</UpdateButton>
  ) : (
    <DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>
  );

  return (
    <Root className={className} isSelected={isSelected} onClick={handleSelect} >
      <UserWrapper>
        {userAvatarImage}
        {username}
        {userAvatarInput}
        <TimestampInfo updated={user.updated_at} created={user.created_at} />
      </UserWrapper>
      <ButtonWrapper>
        {updateBtn}
        <Button onClick={toggleEdit}>{editButtonLabel}</Button>
      </ButtonWrapper>
      <ProcessingOverlay isVisible={isProcessing} />
    </Root>
  );
};

export default UserListItem;
