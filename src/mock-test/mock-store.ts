import * as T from 'types';
import { HOBBY_PASSION_LEVEL } from 'types';

import configureStore from '../3_store/configureStore';

import { DEFAULT_AVATAR } from '../5_constants/data';

export const mockState: T.StoreState = {
  app: {
    popup: {
      isVisible: false,
      messages: [],
      action: T.POPUP_ACTION.CANCEL,
      actionData: '',
    },
  },
  user: {
    users: [
      {
        id: '1',
        name: 'User 1',
        avatarUrl: DEFAULT_AVATAR,
        created_at: new Date(),
        updated_at: new Date(),
        isHobbiesLoaded: false,
      },
    ],
    selectedUserId: undefined,
    processingUserId: undefined,
    getUsersStatus: T.APIStatus.IDLE,
    deleteUserStatus: T.APIStatus.IDLE,
    addUserStatus: T.APIStatus.IDLE,
    updateUserStatus: T.APIStatus.IDLE,
  },
  hobby: {
    hobbies: [
      {
        id: '1',
        name: 'Hobby 1',
        passionLevel: HOBBY_PASSION_LEVEL.HIGH,
        year: 2019,
        user: '1',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    isGettingHobbies: false,
    deletingIds: [],
    addHobbyStatus: T.APIStatus.IDLE,
  },
};

export const mockStore = configureStore([]);