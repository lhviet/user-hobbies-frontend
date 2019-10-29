export const DEFAULT_AVATAR = 'https://img.icons8.com/bubbles/50/000000/user.png';

export const POPUP_MESSAGES = {
  deleteUser: (name: string) => [
    `You are deleting user: ${name}.`,
    `Cancel to save the user.`,
    `Confirm to delete the ${name} and all of its Hobbies.`,
  ],
  deleteHobby: (name: string) => [
    `You are deleting hobby: ${name}.`,
    `Cancel to save the Hobby`,
    `Confirm to completely delete it.`,
  ],
};