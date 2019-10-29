import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { HOBBY_PASSION_LEVEL } from '../../../types';

import HobbyContent, { Props } from '../../../1_components/organisms/HobbyContent';

import { addHobby } from '../../../3_store/ducks/hobby';

type StatePropKeys = never;
type DispatchPropKeys = 'addHobby';
export type StateProps = Pick<Props, StatePropKeys>;
export type DispatchProps = Pick<Props, DispatchPropKeys>;

const mapDispatchToProps: (dispatch: Dispatch<Action>) => DispatchProps = (dispatch: Dispatch<Action>) => ({
  addHobby(name: string, passion: HOBBY_PASSION_LEVEL, year: number): void {
    dispatch(addHobby(name, passion, year));
  },
});

export default connect(undefined, mapDispatchToProps)(HobbyContent);
