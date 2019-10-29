import { AnyAction, Reducer } from 'redux';
import { ActionsObservable, combineEpics, Epic, ofType } from 'redux-observable';
import { catchError, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { ajax, AjaxError } from 'rxjs/ajax';
import _ from 'lodash-es';

import * as T from '../../types';

import { getAPIUrl, HOST } from '../../5_constants/api';

import { makeDone, makeFailed, makeStart } from '../../4_services/action-service';

import { setHobbiesLoaded } from './user';

export const APIToHobby: (rawData: any) => T.Hobby = rawData => ({
  id: rawData._id,
  name: rawData.name,
  passionLevel: rawData.passionLevel,
  year: rawData.year,
  user: rawData.user,
  created_at: new Date(rawData.created_at),
  updated_at: new Date(rawData.updated_at),
});

// ----- ACTIONS & EPICS ----- //
export const GET_HOBBIES = 'HOBBY__GET_HOBBIES';
export const getHobbies = (userId: string): AnyAction => makeStart(
  GET_HOBBIES,
  userId,
);

export const ADD_HOBBY = 'HOBBY__ADD_HOBBY';
export const addHobby = (name: string, passionLevel: T.HOBBY_PASSION_LEVEL, year: number): AnyAction =>
  makeStart(ADD_HOBBY, { name, passionLevel, year });

export const DELETE_HOBBY = 'HOBBY__DELETE_HOBBY';
export const deleteHobby = (id: string): AnyAction => makeStart(DELETE_HOBBY, id);

// ----- EPICs --------------------------------------------------------------------------------------------------------
const hobbyURL: string = getAPIUrl(HOST.api.hobbies);

const epicGetHobbiesOfaUser = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(`${GET_HOBBIES}_START`),
  switchMap(({ data: userId }) => {
    const url: string = `${getAPIUrl(HOST.api.users)}/${userId}/hobbies`;
    return ajax.get(url)
      .pipe(
        map(({response}) => response.map(APIToHobby)),
        mergeMap((data) => [
          makeDone(GET_HOBBIES, data),
          setHobbiesLoaded(userId),
        ]),
        catchError((ajaxError: AjaxError) => [makeFailed(GET_HOBBIES, ajaxError)]),
      )
  }),
);

const epicAddHobby: Epic<AnyAction, any, T.StoreState> = (action$, state$) => action$.pipe(
  ofType(`${ADD_HOBBY}_START`),
  mergeMap(({ data }) => {
    const selectedUserId: string | undefined = state$.value.user.selectedUserId;
    if (selectedUserId === undefined) {
      return [makeFailed(ADD_HOBBY)];
    }

    const payload = {
      name: data.name,
      passionLevel: data.passionLevel,
      year: data.year,
      userId: selectedUserId,
    };

    return ajax.post(hobbyURL, payload)
      .pipe(
        map(({ response }) => response),
        map(APIToHobby),
        mergeMap((data) => [
          makeDone(ADD_HOBBY, data),
          getHobbies(selectedUserId),
        ]),
        catchError((ajaxError: AjaxError) => [
          makeFailed(ADD_HOBBY, ajaxError),
        ]),
      )
  }),
);

const epicDeleteHobbies = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(`${DELETE_HOBBY}_START`),
  mergeMap(({ data: id }) => ajax.delete(getAPIUrl(HOST.api.hobbies, id))
    .pipe(
      mapTo(makeDone(DELETE_HOBBY, id)),
      catchError((ajaxError: AjaxError) => [makeFailed(DELETE_HOBBY, id)]),
    )),
);

export const epics = combineEpics(
  epicGetHobbiesOfaUser,
  epicAddHobby,
  epicDeleteHobbies,
);

// ----- REDUCER ------------------------------------------------------------------------------------------------------
const initialState: T.HobbyState = {
  hobbies: [],
  deletingIds: [],
  isGettingHobbies: false,
  addHobbyStatus: T.APIStatus.IDLE,
};

/**
 * Process only actions of HOBBY__
 */
const reducer: Reducer<T.HobbyState> = (state = initialState, action: AnyAction) => {
  // If this action is not belong to HOBBY, return the original state
  if (action.type.indexOf('HOBBY__') !== 0) {
    return state;
  }

  switch (action.type) {
    case `${GET_HOBBIES}_START`:
      return {...state, isGettingHobbies: true};
    case `${GET_HOBBIES}_DONE`:
      return {
        ...state,
        hobbies: _.uniqBy(_.concat(action.data, state.hobbies), 'id'),
        isGettingHobbies: false,
      };
    case `${GET_HOBBIES}_FAILED`:
      return { ...state, isGettingHobbies: false };

    case `${ADD_HOBBY}_START`:
      return { ...state, addHobbyStatus: T.APIStatus.PROCESSING };
    case `${ADD_HOBBY}_DONE`:
      return {
        ...state,
        addHobbyStatus: T.APIStatus.DONE,
      };
    case `${ADD_HOBBY}_FAILED`:
      return {
        ...state,
        addHobbyStatus: T.APIStatus.FAILED,
      };

    case `${DELETE_HOBBY}_START`:
      return {
        ...state,
        deletingIds: [...state.deletingIds, action.data],
      };
    case `${DELETE_HOBBY}_DONE`:
      return {
        ...state,
        hobbies: _.reject(state.hobbies, { id: action.data }),
        deletingIds: _.reject(state.deletingIds, action.data),
      };
    case `${DELETE_HOBBY}_FAILED`:
      return {
        ...state,
        deletingIds: _.reject(state.deletingIds, action.data),
      };

    default:
      return state;
  }
};
export default reducer;
