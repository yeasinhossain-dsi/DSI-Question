import { IUser } from "@/store/user";

const USER_INFO_KEY = "userInfo";
export const getUserInfoFromLocalStorage = () => {
  const user = localStorage.getItem(USER_INFO_KEY);
  if (user) {
    return JSON.parse(user) as IUser;
  } else {
    return null;
  }
};

export const setUserInfoToLocalStorage = (user: IUser) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
};

export const removeUserInfoFromLocalStorage = () => {
  localStorage.removeItem(USER_INFO_KEY);
};
