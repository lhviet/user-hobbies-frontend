import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as T from '../../../types';

import LeftSideBar, { Props } from '../../../1_components/organisms/LeftSideBar';

import { getUsers, addUser } from '../../../3_store/ducks/user';

type StatePropKeys = 'isSearching';
type DispatchPropKeys = 'search' | 'addUser';
export type StateProps = Pick<Props, StatePropKeys>;
export type DispatchProps = Pick<Props, DispatchPropKeys>;

const mapStateToProps: (state: Pick<T.StoreState, 'user'>) => StateProps = ({ user }) => {
  return {
    isSearching: user.getUsersStatus === T.APIStatus.PROCESSING
  };
};
const mapDispatchToProps: (dispatch: Dispatch<Action>) => DispatchProps = (dispatch: Dispatch<Action>) => ({
  search(keywords: string) {
    dispatch(getUsers());
  },
  addUser(keywords: string) {
    dispatch(addUser(keywords));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBar);
