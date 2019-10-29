import { HOBBY_PASSION_LEVEL } from '../types';

import { alpha, colors } from '../5_constants/theme';

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
export const getHobbyPassionColor: (level: HOBBY_PASSION_LEVEL) => string = (lv) => {
  switch (lv) {
    case HOBBY_PASSION_LEVEL.LOW:
      return colors.grey.toString();
    case HOBBY_PASSION_LEVEL.MEDIUM:
      return colors.blueDark.toString();
    case HOBBY_PASSION_LEVEL.HIGH:
      return colors.red.alpha(alpha.alpha6).toString();
    case HOBBY_PASSION_LEVEL.VERYHIGH:
      return colors.red.alpha(alpha.alpha8).toString();
    default:
      return colors.blueDark.toString();
  }
};