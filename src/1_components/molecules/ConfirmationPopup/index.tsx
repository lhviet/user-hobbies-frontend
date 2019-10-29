import React, { FC, memo } from 'react';
import styled from 'styled-components';

import { alpha, colors } from '../../../5_constants/theme';

import Button from '../../atoms/Button';

interface RootProps {
  isVisible: boolean
}
const Root = styled.div<RootProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: ${props => props.isVisible ? 'block' : 'none'};
`;
const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.grey.alpha(alpha.alpha6).toString()};
`;
const Popup = styled.div`
  position: absolute;
  left: 25%;
  top: 15vh;
  
  display: inline-block;
  width: 50%;
  min-width: 400px;
  height: 50%;
  min-height: 300px;
  background-color: ${colors.white.toString()};
  border: solid 1px ${colors.borderGray.toString()};
  border-radius: 6px;  
`;
const PopupHead = styled.div`
  border-bottom: solid 1px ${colors.borderGray.alpha(alpha.alpha7).toString()};
  padding: .7rem 1rem;
  height: 1.5rem;
`;
const PopupBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  height: calc(100% - 10.5rem);
`;
const PopupFooter = styled.div`
  border-top: solid 1px ${colors.borderGray.alpha(alpha.alpha7).toString()};
  padding: .7rem 1rem;
  text-align: right;
`;
const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.red.alpha(alpha.alpha7).toString()};
`;
const Message = styled.div`
  font-size: 1.2rem;
  line-height: 1.2;
  color: ${colors.blueDark.alpha(alpha.alpha8).toString()};
`;
const ConfirmBtn = styled(Button)`
  margin-right: 1rem;
  font-size: 1rem;
  color: ${colors.red.alpha(.8).toString()};
  
  :hover {
    color: ${colors.red.toString()};
    border-color: ${colors.red.toString()};
  }
`;
const CancelButton = styled(Button)`
  color: ${colors.white.toString()};
  font-size: 1rem;
  background-color: ${colors.green.toString()};
  border-color: ${colors.green.alpha(alpha.alpha8).toString()};
  
  :hover {
    color: ${colors.green.toString()};
    background-color: ${colors.white.toString()};
  }
`;

function arePropsEqual(prevProps: Props, props: Props): boolean {
  return prevProps.messages === props.messages;
}

export interface Props {
  isVisible: boolean;
  messages: Array<string>;
  onCancel(): void;
  onConfirm(): void;
  className?: string;
}
const ConfirmationPopup: FC<Props> = (
  { isVisible, messages, onCancel, onConfirm, className }: Props
) => {
  const message: React.ReactNode = messages.map((m, i) => <Message key={`mes-${i}`}>{m}</Message>);

  return (
    <Root isVisible={isVisible} className={className}>
      <Backdrop />
      <Popup>
        <PopupHead>
          <Title>Notice</Title>
        </PopupHead>
        <PopupBody>
          {message}
        </PopupBody>
        <PopupFooter>
          <ConfirmBtn onClick={onConfirm}>Confirm</ConfirmBtn>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </PopupFooter>
      </Popup>
    </Root>
  );
};

export default memo(ConfirmationPopup, arePropsEqual);
