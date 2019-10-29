import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import * as T from '../../../types';
import { mockState, mockStore } from '../../../mock-test/mock-store';

import HobbyList, { DispatchProps, mapDispatchToProps, mapStateToProps, StateProps } from './index';

const mockHobby: T.Hobby = mockState.hobby.hobbies[0];

describe('DispatchProps', () => {
  let dispatch: jest.Mock;
  let dispatchProps: DispatchProps;

  beforeEach(() => {
    dispatch = jest.fn();
    dispatchProps = mapDispatchToProps(dispatch);
  });

  it('should call dispatch when delete Hobby', () => {
    expect(dispatch).toHaveBeenCalledTimes(0);
    dispatchProps.deleteHobby(mockHobby);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});

describe('StateProps', () => {
  type MockState = Pick<T.StoreState, 'user' | 'hobby'>;
  const state: MockState = {
    user: mockState.user,
    hobby: mockState.hobby,
  };
  let stateProps: StateProps;

  beforeEach(() => {
    stateProps = mapStateToProps(state);
  });

  it('should have no hobbies for no selected user', () => {
    expect(stateProps.isUserSelected).toBeFalsy();
    expect(stateProps.hobbies).toHaveLength(0);
  });
});

describe('Connected HobbyList', () => {
  it('should not emit an error during rendering', () => {
    expect(() => {
      mount(
        <Provider store={mockStore}>
          <HobbyList />
        </Provider>,
      );
    }).not.toThrowError();
  });
});