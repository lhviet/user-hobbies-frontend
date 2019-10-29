import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import * as T from '../../../types';
import { mockState, mockStore } from '../../../mock-test/mock-store';

import { UPDATE_USER } from '../../../3_store/ducks/user';

import { makeStart } from '../../../4_services/action-service';

import UserList, { DispatchProps, mapDispatchToProps, mapStateToProps, StateProps } from './index';

const mockUser: T.User = mockState.user.users[0];

describe('DispatchProps', () => {
  let dispatch: jest.Mock;
  let dispatchProps: DispatchProps;

  beforeEach(() => {
    dispatch = jest.fn();
    dispatchProps = mapDispatchToProps(dispatch);
  });

  it('should call dispatch when selectUser', () => {
    expect(dispatch).toHaveBeenCalledTimes(0);
    dispatchProps.selectUser(mockUser);
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('should call dispatch when deleteUser', () => {
    expect(dispatch).toHaveBeenCalledTimes(0);
    dispatchProps.deleteUser(mockUser);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch updateUser correctly', () => {
    expect(dispatch).toHaveBeenCalledTimes(0);
    dispatchProps.updateUser(mockUser);
    expect(dispatch).toHaveBeenLastCalledWith({
      type: makeStart(UPDATE_USER).type,
      data: mockUser,
    });
  });
});

describe('StateProps', () => {
  type MockState = Pick<T.StoreState, 'user'>;
  const state: MockState = {
    user: mockState.user,
  };
  let stateProps: StateProps;

  beforeEach(() => {
    stateProps = mapStateToProps(state);
  });

  it('should have one user', () => {
    expect(stateProps.users).toHaveLength(1);
  });
});

describe('Connected UserList', () => {
  it('should not emit an error during rendering', () => {
    expect(() => {
      mount(
        <Provider store={mockStore}>
          <UserList />
        </Provider>,
      );
    }).not.toThrowError();
  });
});