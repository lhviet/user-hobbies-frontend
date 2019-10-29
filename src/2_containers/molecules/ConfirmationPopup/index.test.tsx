import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import * as T from '../../../types';
import { mockState, mockStore } from '../../../mock-test/mock-store';

import { UPDATE_USER } from '../../../3_store/ducks/user';

import { makeStart } from '../../../4_services/action-service';

import ConfirmationPopup, { DispatchProps, mapDispatchToProps, mapStateToProps, StateProps } from './index';

describe('DispatchProps', () => {
  let dispatch: jest.Mock;
  let dispatchProps: DispatchProps;

  beforeEach(() => {
    dispatch = jest.fn();
    dispatchProps = mapDispatchToProps(dispatch);
  });

  it('should call dispatch when cancel', () => {
    expect(dispatch).toHaveBeenCalledTimes(0);
    dispatchProps.onCancel();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('should call dispatch when confirm', () => {
    expect(dispatch).toHaveBeenCalledTimes(0);
    dispatchProps.onConfirm();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});

describe('StateProps', () => {
  type MockState = Pick<T.StoreState, 'app'>;
  const state: MockState = {
    app: mockState.app,
  };
  let stateProps: StateProps;

  beforeEach(() => {
    stateProps = mapStateToProps(state);
  });

  it('should have isVisible false', () => {
    expect(stateProps.isVisible).toBeFalsy();
  });
});

describe('Connected ConfirmationPopup', () => {
  it('should not emit an error during rendering', () => {
    expect(() => {
      mount(
        <Provider store={mockStore}>
          <ConfirmationPopup />
        </Provider>,
      );
    }).not.toThrowError();
  });
});