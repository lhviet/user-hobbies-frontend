import { HOBBY_PASSION_LEVEL } from '../types';

export const getHobbyPassionLevel: (level: HOBBY_PASSION_LEVEL) => string = (lv) => {
  switch (lv) {
    case HOBBY_PASSION_LEVEL.LOW:
      return 'Low';
    case HOBBY_PASSION_LEVEL.MEDIUM:
      return 'Medium';
    case HOBBY_PASSION_LEVEL.HIGH:
      return 'High';
    case HOBBY_PASSION_LEVEL.VERYHIGH:
      return 'Very-High';
    default:
      return 'Medium';
  }
};