import { Constants } from "@/config/constants";

export const truncateTitle = (title: string): string => {
  if (title.length <= Constants.TITLE_MAX_LENGTH) {
    return title;
  }
  return title.slice(0, Constants.TITLE_MAX_LENGTH) + "...";
};

export const getUserPhotoUrl = (userId: string) => {
  return `${Constants.API_BASE_URL}/user/picture/${userId}`;
};
