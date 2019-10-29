import { AnyAction, Reducer } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';

import * as T from '../../types';

import { deleteUser } from './user';
import { deleteHobby } from './hobby';

import { makeDone, makeStart } from '../../4_services/action-service';

// ----- ACTIONS ----- //
export const SHOW_POPUP = 'APP__SHOW_POPUP';
export const showPopup = (messages: Array<string>, action: T.POPUP_ACTION, actionData: string): AnyAction =>
  makeStart(SHOW_POPUP, { messages, action, actionData });

export const CANCEL_POPUP = 'APP__CANCEL_POPUP';
export const cancelPopup = (): AnyAction => makeStart(CANCEL_POPUP);

export const CONFIRM_POPUP = 'APP__CONFIRM_POPUP';
export const confirmPopup = (): AnyAction => makeStart(CONFIRM_POPUP);


// ----- EPICs --------------------------------------------------------------------------------------------------------
const epicConfirmPopup: Epic<AnyAction, any, T.StoreState> = (action$, state$) => action$.pipe(
  ofType(`${CONFIRM_POPUP}_START`),
  mergeMap(() => {
    const { action, actionData } = state$.value.app.popup;
    switch (action) {
      case T.POPUP_ACTION.DELETE_USER:
        return [
          deleteUser(actionData),
          makeDone(CONFIRM_POPUP),
        ];
      case T.POPUP_ACTION.DELETE_HOBBY:
        return [
          deleteHobby(actionData),
          makeDone(CONFIRM_POPUP),
        ];
      default:
        return [makeDone(CONFIRM_POPUP)];
    }
  }),
);

export const epics = combineEpics(
  epicConfirmPopup,
);

// ----- REDUCER ------------------------------------------------------------------------------------------------------
const defaultPopupState = {
  isVisible: false,
  messages: [],
  action: T.POPUP_ACTION.CANCEL,
  actionData: '',
};
const initialState: T.AppState = {
  popup: defaultPopupState,
};
/**
 * Process only actions of USER__
 */
const reducer: Reducer<T.AppState> = (state = initialState, action: AnyAction) => {
  // If this action is not belong to USER, return the original state
  if (action.type.indexOf('APP__') !== 0) {
    return state;
  }

  switch (action.type) {
    case `${SHOW_POPUP}_START`:
      return {
        ...state,
        popup: {
          isVisible: true,
          ...action.data,
        },
      };

    case `${CANCEL_POPUP}_START`:
      return {
        ...state,
        popup: defaultPopupState,
      };

    case `${CONFIRM_POPUP}_DONE`:
      return {
        ...state,
        popup: defaultPopupState,
      };

    default:
      return state;
  }
};
export default reducer;
