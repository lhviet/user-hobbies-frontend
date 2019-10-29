import { AnyAction, Reducer } from 'redux';
import { ActionsObservable, combineEpics, ofType } from 'redux-observable';
import { catchError, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { ajax, AjaxError } from 'rxjs/ajax';
import _ from 'lodash-es';

import * as T from '../../types';

import { makeDone, makeFailed, makeStart } from '../../4_services/action-service';

import { getAPIUrl, HOST } from '../../5_constants/api';

export const APIToUser: (rawData: any) => T.User = rawData => ({
  id: rawData._id,
  name: rawData.name,
  avatarUrl: rawData.avatarUrl,
  created_at: new Date(rawData.created_at),
  updated_at: new Date(rawData.updated_at),
  isHobbiesLoaded: false,
});

// ----- ACTIONS ----- //
export const SELECT_USERS = 'USER__SELECT_USERS';
export const selectUser = (id?: string): AnyAction => makeStart(SELECT_USERS, id);

export const GET_USERS = 'USER__GET_USERS';
export const getUsers = (): AnyAction => makeStart(GET_USERS);

export const DELETE_USER = 'USER__DELETE_USER';
export const deleteUser = (id: string): AnyAction => makeStart(DELETE_USER, id);

export const ADD_USER = 'USER__ADD_USER';
export const addUser = (name: string): AnyAction => makeStart(ADD_USER, name);

export const UPDATE_USER = 'USER__UPDATE_USER';
export const updateUser = (user: T.User): AnyAction => makeStart(UPDATE_USER, user);

export const SET_USER_HOBBIES_LOADED = 'USER__SET_USER_HOBBIES_LOADED';
export const setHobbiesLoaded = (id: string): AnyAction => makeStart(SET_USER_HOBBIES_LOADED, id);

// ----- EPICs --------------------------------------------------------------------------------------------------------
const userURL: string = getAPIUrl(HOST.api.users);

const epicGetUsers = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(`${GET_USERS}_START`),
  switchMap(() => ajax.get(userURL)
    .pipe(
      map(({response}) => response.map(APIToUser)),
      mergeMap((data) => [
        makeDone(GET_USERS, data),
      ]),
      catchError((ajaxError: AjaxError) => [makeFailed(GET_USERS, ajaxError)]),
    )),
);

const epicDeleteUsers = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(`${DELETE_USER}_START`),
  mergeMap(({ data: id }) => ajax.delete(getAPIUrl(HOST.api.users, id))
    .pipe(
      mapTo(makeDone(DELETE_USER, id)),
      catchError((ajaxError: AjaxError) => [makeFailed(DELETE_USER, ajaxError)]),
    )),
);

const epicAddUser = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(`${ADD_USER}_START`),
  mergeMap(({ data: name }) => {
    return ajax.post(userURL, { name })
      .pipe(
        map(({ response }) => response),
        map(APIToUser),
        mergeMap((data) => [
          makeDone(ADD_USER, data),
          getUsers(),
        ]),
        catchError((ajaxError: AjaxError) => [
          makeFailed(ADD_USER, ajaxError),
          getUsers(),
        ]),
      )
  }),
);

const epicUpdateUser = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(`${UPDATE_USER}_START`),
  mergeMap(({ data: user }) => {
    const data = {
      name: user.name,
      avatarUrl: user.avatarUrl,
    };

    return ajax.patch(getAPIUrl(HOST.api.users, user.id), data)
      .pipe(
        map(({ response }) => response),
        map(APIToUser),
        mergeMap((data) => [
          makeDone(UPDATE_USER, data),
        ]),
        catchError((ajaxError: AjaxError) => [
          makeFailed(UPDATE_USER, ajaxError),
        ]),
      )
  }),
);

export const epics = combineEpics(
  epicGetUsers,
  epicDeleteUsers,
  epicAddUser,
  epicUpdateUser,
);

// ----- REDUCER ------------------------------------------------------------------------------------------------------
const initialState: T.UserState = {
  users: [],
  selectedUserId: undefined,
  processingUserId: undefined,
  getUsersStatus: T.APIStatus.IDLE,
  deleteUserStatus: T.APIStatus.IDLE,
  addUserStatus: T.APIStatus.IDLE,
  updateUserStatus: T.APIStatus.IDLE,
};
/**
 * Process only actions of USER__
 */
const reducer: Reducer<T.UserState> = (state = initialState, action: AnyAction) => {
  // If this action is not belong to USER, return the original state
  if (action.type.indexOf('USER__') !== 0) {
    return state;
  }

  let users: Array<T.User>;
  let user: T.User;
  let index: number;

  switch (action.type) {
    case `${SELECT_USERS}_START`:
      return { ...state, selectedUserId: action.data };

    case `${GET_USERS}_START`:
      return { ...state, isGettingUsers: T.APIStatus.PROCESSING };
    case `${GET_USERS}_DONE`:
      return {
        ...state,
        users: action.data,
        isGettingUsers: T.APIStatus.DONE,
      };
    case `${GET_USERS}_FAILED`:
      return { ...state, isGettingUsers: T.APIStatus.FAILED };

    case `${DELETE_USER}_START`:
      return {
        ...state,
        processingUserId: action.data,
        deleteUserStatus: T.APIStatus.PROCESSING,
      };
    case `${DELETE_USER}_DONE`:
      return {
        ...state,
        users: _.reject(state.users, { id: action.data }),
        processingUserId: undefined,
        deleteUserStatus: T.APIStatus.DONE,
      };
    case `${DELETE_USER}_FAILED`:
      return {
        ...state,
        processingUserId: undefined,
        deleteUserStatus: T.APIStatus.FAILED,
      };

    case `${ADD_USER}_START`:
      return { ...state, addUserStatus: T.APIStatus.PROCESSING };
    case `${ADD_USER}_DONE`:
      return {
        ...state,
        addUserStatus: T.APIStatus.DONE,
      };
    case `${ADD_USER}_FAILED`:
      return {
        ...state,
        addUserStatus: T.APIStatus.FAILED,
      };

    case `${UPDATE_USER}_START`:
      return {
        ...state,
        processingUserId: action.data.id,
        updateUserStatus: T.APIStatus.PROCESSING,
      };
    case `${UPDATE_USER}_DONE`:
      index = _.findIndex(state.users, {id: action.data.id});
      if (index < 0) {
        return state;
      }
      users = _.concat(
        _.slice(state.users, 0, index),
        action.data,
        _.slice(state.users, index + 1),
      );

      return {
        ...state,
        users,
        processingUserId: undefined,
        updateUserStatus: T.APIStatus.DONE,
      };
    case `${UPDATE_USER}_FAILED`:
      return {
        ...state,
        processingUserId: undefined,
        updateUserStatus: T.APIStatus.FAILED,
      };

    case `${SET_USER_HOBBIES_LOADED}_START`:
      users = state.users;
      index = _.findIndex(state.users, {id: action.data});
      if (index > -1) {
        user = users[index];
        user.isHobbiesLoaded = true;
        users = _.concat(
          _.slice(state.users, 0, index),
          user,
          _.slice(state.users, index + 1),
        );
      }

      return {
        ...state,
        users,
      };

    default:
      return state;
  }
};
export default reducer;
