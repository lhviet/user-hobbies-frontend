import React, { FC, memo, useState } from 'react';
import styled from 'styled-components';

import { HOBBY_PASSION_LEVEL } from '../../../types';

import { alpha, colors, styles } from '../../../5_constants/theme';

import Button from '../../atoms/Button';
import PassionLevelDropdown from '../../atoms/PassionLevelDropdown';
import TextInput from '../../atoms/TextInput';

const Root = styled.div`
  position: relative;
  width: 100%;
`;
const Input = styled(TextInput)`
  width: 40%;
  margin-right: 5px;
`;
const Year = styled.input.attrs({
  type: 'number',
  min: 1900,
  max: 2019,
})`
  ${styles.primaryOutlineBtn};
  
  margin-left: 5px;
  margin-right: 5px;
  cursor: text;
  width: 4rem;
`;
const AddHobbyButton = styled(Button)`
  width: 4rem;
  height: 2.2rem;
  color: ${colors.white.toString()};
  background-color: ${colors.green.toString()};
  border-color: ${colors.green.alpha(alpha.alpha8).toString()};
  
  :hover {
    color: ${colors.green.toString()};
    background-color: ${colors.white.toString()};
  }
`;

function arePropsEqual(prevProps: Props, props: Props): boolean {
  return prevProps.isAdding === props.isAdding;
}

interface Props {
  isAdding?: boolean;
  className?: string;
  addHobby(name: string, passion: HOBBY_PASSION_LEVEL, year: number): void;
}

const HobbyCreatingSection: FC<Props> = ({ isAdding, addHobby, className }: Props) => {
  const [keyword, setKeyword] = useState('');
  const [passionLevel, setPassionLevel] = useState(HOBBY_PASSION_LEVEL.MEDIUM);
  const [year, setYear] = useState(2018);

  const handleAddNewUser = () => addHobby(keyword, passionLevel, year);
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => setKeyword(e.currentTarget.value);
  const handleYearChange = (e: React.FormEvent<HTMLInputElement>) => setYear(parseInt(e.currentTarget.value));
  const handlePassionChange = (value: HOBBY_PASSION_LEVEL) => setPassionLevel(value);

  return (
    <Root className={className}>
      <Input onChange={handleInputChange} placeholder={'Type your Hobby here'} />
      <PassionLevelDropdown onSelect={handlePassionChange} />
      <Year value={year} onChange={handleYearChange} />
      <AddHobbyButton onClick={handleAddNewUser}>Add</AddHobbyButton>
    </Root>
  );
};

export default memo(HobbyCreatingSection, arePropsEqual);
