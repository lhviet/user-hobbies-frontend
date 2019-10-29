export interface StoreState {
  app: AppState;
  user: UserState;
  hobby: HobbyState;
}

export interface AppState {
  popup: {
    isVisible: boolean;
    messages: Array<string>;
    action: POPUP_ACTION;
    actionData: string;
  };
}

export interface HobbyState {
  hobbies: Array<Hobby>;
  deletingIds: Array<string>;
  isGettingHobbies: boolean;
  addHobbyStatus: APIStatus;
}

export interface UserState {
  users: Array<User>;
  selectedUserId?: string;
  processingUserId?: string;
  getUsersStatus: APIStatus;
  deleteUserStatus: APIStatus;
  addUserStatus: APIStatus;
  updateUserStatus: APIStatus;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  created_at: Date;
  updated_at: Date;
  isHobbiesLoaded: boolean;
}

export interface Hobby {
  id: string;
  name: string;
  passionLevel: HOBBY_PASSION_LEVEL;
  year: number;
  user: string; // Reference to User's ID
  created_at: Date;
  updated_at: Date;
}

export enum HOBBY_PASSION_LEVEL {
  LOW = 1,
  MEDIUM,
  HIGH,
  VERYHIGH,
}

export enum APIStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  FAILED = 'FAILED',
}

export enum POPUP_ACTION {
  CANCEL = 'CANCEL',
  DELETE_USER = 'DELETE_USER',
  DELETE_HOBBY = 'DELETE_HOBBY',
}