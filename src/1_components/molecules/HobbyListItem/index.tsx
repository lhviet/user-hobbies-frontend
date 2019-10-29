import React, { FC } from 'react';
import styled from 'styled-components';

import { Hobby, default as T } from '../../../types';

import TimestampInfo from '../../atoms/TimestampInfo';
import Button from '../../atoms/Button';
import ProcessingOverlay from '../../atoms/ProcessingOverlay';

import { getHobbyPassionColor, getHobbyPassionLevel } from '../../../4_services/hobby-service';

import { alpha, colors } from '../../../5_constants/theme';

const Root = styled.li`
  margin: 0.3rem 3%;
  border-radius: 1px;
  color: ${colors.grey.toString()};
  transition: ease .2s;
  border-bottom: solid 1px ${colors.borderGray.alpha(alpha.alpha4).toString()};
  border-top: solid 1px transparent;
  border-left: solid 1px transparent;
  border-right: solid 1px transparent;
  
  :hover {
    border-bottom-color: ${colors.blueDark.toString()};
  }
`;
const HobbyWrapper = styled.div`
  position: relative;
`;
const Title = styled.div`
  display: inline-block;
  width: 55%;
  font-size: 1.1rem;
  font-weight: bold;
  vertical-align: middle;
`;
const PassionLevel = styled.div`
  display: inline-block;
  width: 19%;
  min-width: 9rem;
  font-size: 0.9rem;
`;
const PassionColor = styled.span<{level: T.HOBBY_PASSION_LEVEL}>`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => getHobbyPassionColor(props.level)};
`;
const Year = styled.div`
  display: inline-block;
  width: 14%;
  min-width: 6rem;
  margin-left: 5px;
  font-size: 1rem;
`;
const ButtonWrapper = styled.div`
  display: inline-block;
  width: 10%;
  text-align: right;
`;
const DeleteBtn = styled(Button)`
  color: ${colors.red.alpha(.8).toString()};
  
  :hover {
    color: ${colors.red.toString()};
    border-color: ${colors.red.toString()};
  }
`;
const TimeInfoWrapper = styled.div`
  text-align: right;
  padding: 1rem 1rem 0;
`;
const TimeInfo = styled.div`
  width: 16rem;
  display: inline-block;
  text-align: left;
`;

interface Props {
  hobby: Hobby;
  isProcessing: boolean;
  className?: string;
  onDelete(hobby: T.Hobby): void;
}

const HobbyListItem: FC<Props> = (
  { hobby, isProcessing, onDelete, className }: Props
) => {
  const handleDelete: () => void = () => onDelete(hobby);
  const passion: React.ReactNode = (
    <PassionColor level={hobby.passionLevel}>
      {getHobbyPassionLevel(hobby.passionLevel)}
    </PassionColor>
  );

  return (
    <Root className={className} >
      <HobbyWrapper>
        <Title>{hobby.name}</Title>
        <PassionLevel>
          Passion: {passion}
        </PassionLevel>
        <Year>Since {hobby.year}</Year>
        <ButtonWrapper>
          <DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>
        </ButtonWrapper>
      </HobbyWrapper>
      <TimeInfoWrapper>
        <TimeInfo>
          <TimestampInfo updated={hobby.updated_at} created={hobby.created_at} />
        </TimeInfo>
      </TimeInfoWrapper>
      <ProcessingOverlay isVisible={isProcessing} />
    </Root>
  );
};

export default HobbyListItem;
