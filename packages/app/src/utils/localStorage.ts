import { IUserDetails } from "@/store/user";

const USER_INFO_KEY = "userInfo";

export const getUserInfoFromLocalStorage = () => {
  const user = localStorage.getItem(USER_INFO_KEY);
  if (user) {
    return JSON.parse(user) as IUserDetails;
  } else {
    return null;
  }
};

export const setUserInfoToLocalStorage = (userDetails: IUserDetails) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userDetails));
};

export const removeUserInfoFromLocalStorage = () => {
  localStorage.removeItem(USER_INFO_KEY);
};
