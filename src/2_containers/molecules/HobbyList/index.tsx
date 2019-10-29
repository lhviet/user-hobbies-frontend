import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as T from '../../../types';

import HobbyList, { Props } from '../../../1_components/molecules/HobbyList';

import { showPopup } from '../../../3_store/ducks/app';

import { POPUP_MESSAGES } from '../../../5_constants/data';

type StatePropKeys = 'hobbies' | 'deletingIds' | 'isGettingHobbies' | 'isUserSelected';
type DispatchPropKeys = 'deleteHobby';
export type StateProps = Pick<Props, StatePropKeys>;
export type DispatchProps = Pick<Props, DispatchPropKeys>;

export const mapStateToProps: (state: Pick<T.StoreState, 'user' | 'hobby'>) => StateProps = ({ user, hobby }) => {
  const selectedUserId = user.selectedUserId;
  const hobbies = selectedUserId !== undefined ?
    hobby.hobbies.filter((h) => h.user === selectedUserId) :
    [];

  return {
    hobbies,
    deletingIds: hobby.deletingIds,
    isGettingHobbies: hobby.isGettingHobbies,
    isUserSelected: !!user.selectedUserId,
  };
};

export const mapDispatchToProps: (dispatch: Dispatch) => DispatchProps = (dispatch) => ({
  deleteHobby(hobby: T.Hobby): void {
    dispatch(showPopup(
      POPUP_MESSAGES.deleteHobby(hobby.name),
      T.POPUP_ACTION.DELETE_HOBBY,
      hobby.id,
    ));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HobbyList);
