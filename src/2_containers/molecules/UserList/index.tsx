import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as T from '../../../types';

import UserList, { Props } from '../../../1_components/molecules/UserList';

import { selectUser, updateUser } from '../../../3_store/ducks/user';
import { getHobbies } from '../../../3_store/ducks/hobby';
import { showPopup } from '../../../3_store/ducks/app';

import { POPUP_MESSAGES } from '../../../5_constants/data';

type StatePropKeys = 'users' | 'selectedUserId' | 'processingUserId' | 'deleteUserStatus' | 'updateUserStatus';
type DispatchPropKeys = 'selectUser' | 'deleteUser' | 'updateUser';
export type StateProps = Pick<Props, StatePropKeys>;
export type DispatchProps = Pick<Props, DispatchPropKeys>;

export const mapStateToProps: (state: Pick<T.StoreState, 'user'>) => StateProps = ({ user }) => {
  return {
    users: user.users,
    selectedUserId: user.selectedUserId,
    processingUserId: user.processingUserId,
    deleteUserStatus: user.deleteUserStatus,
    updateUserStatus: user.updateUserStatus,
  };
};

export const mapDispatchToProps: (dispatch: Dispatch) => DispatchProps = (dispatch) => ({
  selectUser(user: T.User): void {
    dispatch(selectUser(user.id));
    if (!user.isHobbiesLoaded) {
      dispatch(getHobbies(user.id));
    }
  },
  deleteUser(user: T.User): void {
    dispatch(showPopup(
      POPUP_MESSAGES.deleteUser(user.name),
      T.POPUP_ACTION.DELETE_USER,
      user.id,
    ));
  },
  updateUser(user: T.User): void {
    dispatch(updateUser(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
