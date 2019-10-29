import { combineEpics } from 'redux-observable';
import { epics as appEpics } from '../ducks/app';
import { epics as userEpics } from '../ducks/user';
import { epics as hobbyEpics } from '../ducks/hobby';

export const rootEpic = combineEpics(
  appEpics,
  userEpics,
  hobbyEpics,
);
