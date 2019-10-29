import React, { Component } from 'react';
import styled, { AnyStyledComponent } from 'styled-components';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import * as T from './types';

import TopBarNavigation from './1_components/atoms/TopBarNavigation';

import ConfirmationPopup from './2_containers/molecules/ConfirmationPopup';
import LeftSideBar from './2_containers/organism/LeftSideBar';
import HobbyContent from './2_containers/organism/HobbyContent';

import { getUsers } from './3_store/ducks/user';

import { colors } from './5_constants/theme';

const Root: AnyStyledComponent = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
const Body: AnyStyledComponent = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 3rem);
`;

const LeftContainer: AnyStyledComponent = styled.div`
  display: inline-block;
  padding: 0 3px;
  
  width: 30%;
  height: 100%;
  
  vertical-align: top;
  
  overflow-y: auto;
  overscroll-behavior: contain;
  
  border-right: solid 1px ${colors.borderGray.toString()};
`;
const RightContainer: AnyStyledComponent = styled.div`
  display: inline-block;
  width: calc(70% - 7px);
  height: 100%;
  vertical-align: top;
  
  overflow-y: auto;
  overscroll-behavior: contain;
`;

interface Props {
  users: Array<T.User>;
  getUsers(): void;
}

interface State {
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount(): void {
    this.props.getUsers();
  }

  render() {
    return (
      <Root>
        <TopBarNavigation />
        <Body>
          <LeftContainer>
            <LeftSideBar />
          </LeftContainer>
          <RightContainer>
            <HobbyContent />
          </RightContainer>
        </Body>
        <ConfirmationPopup />
      </Root>
    );
  }
}

const mapStateToProps = ({ user }: T.StoreState) => {
  return {
    users: user.users,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getUsers() {
    dispatch(getUsers());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
