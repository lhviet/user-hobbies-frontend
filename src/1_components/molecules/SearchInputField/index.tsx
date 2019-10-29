import React, { FC, memo, useState } from 'react';
import styled from 'styled-components';

import { alpha, colors } from '../../../5_constants/theme';

import IconWithSpinner, { IconType } from '../../atoms/IconWithSpinner';
import Button from '../../atoms/Button';

const Root = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const SearchInputWrapper = styled.div`
  width: 80%;
  display: inline-block;
  position: relative;
`;
const SearchInput = styled.input.attrs({
  type: 'text',
  placeholder: 'Type User Name here to Add (or Search)',
  'aria-label': 'search keywords',
})`
  display: block;
  width: calc(100% - 2.8rem);
  padding: .5rem 2.3rem .5rem .5rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${colors.blueDark.toString()};
  background-color: #fff;
  background-clip: padding-box;
  border: none;
  border-bottom: solid 2px ${colors.grey.alpha(alpha.alpha5).toString()};
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  
  :hover {
    border-color: ${colors.green.toString()};
  }
`;
const SearchIcon = styled(IconWithSpinner)`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  font-size: 1.3rem;
  color: ${colors.blueDark.alpha(alpha.alpha6).toString()};
  cursor: pointer;
  
  :hover {
    color: ${colors.blueDark.alpha(alpha.alpha8).toString()};
  }
`;
const AddUserButton = styled(Button)`
  margin: 2px 0;
  width: 18%;
  min-width: 4.75rem;
  color: ${colors.white.toString()};
  background-color: ${colors.green.toString()};
  border-color: ${colors.green.alpha(alpha.alpha8).toString()};
  
  :hover {
    color: ${colors.green.toString()};
    background-color: ${colors.white.toString()};
  }
`;

function arePropsEqual(prevProps: Props, props: Props): boolean {
  return prevProps.isSearching === props.isSearching &&
    prevProps.value === props.value;
}

interface Props {
  isSearching?: boolean;
  value?: string;
  className?: string;
  search(value: string): void;
  addUser(value: string): void;
}

const SearchInputField: FC<Props> = ({ isSearching, value, search, addUser, className }: Props) => {
  const [keyword, setKeyword] = useState(value || '');

  const handleSearch = () => !isSearching && search(keyword);
  const handleAddNewUser = () => addUser(keyword);
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => setKeyword(e.currentTarget.value);
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch();

  return (
    <Root className={className}>
      <SearchInputWrapper>
        <SearchInput
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <SearchIcon
          iconType={IconType.search}
          isLoading={isSearching}
          onClick={handleSearch}
        />
      </SearchInputWrapper>
      <AddUserButton onClick={handleAddNewUser}>Add</AddUserButton>
    </Root>
  );
};

export default memo(SearchInputField, arePropsEqual);
