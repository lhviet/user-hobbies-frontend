import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as T from '../../../types';

import ConfirmationPopup, { Props } from '../../../1_components/molecules/ConfirmationPopup';

import { cancelPopup, confirmPopup } from '../../../3_store/ducks/app';

type StatePropKeys = 'isVisible' | 'messages';
type DispatchPropKeys = 'onConfirm' | 'onCancel';
export type StateProps = Pick<Props, StatePropKeys>;
export type DispatchProps = Pick<Props, DispatchPropKeys>;

export const mapStateToProps: (state: Pick<T.StoreState, 'app'>) => StateProps = ({ app }) => {
  return {
    isVisible: app.popup.isVisible,
    messages: app.popup.messages,
  };
};

export const mapDispatchToProps: (dispatch: Dispatch) => DispatchProps = (dispatch) => ({
  onConfirm(): void {
    dispatch(confirmPopup());
  },
  onCancel(): void {
    dispatch(cancelPopup());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPopup);
