import {
  getUserInfoFromLocalStorage,
  removeUserInfoFromLocalStorage,
  setUserInfoToLocalStorage,
} from "@/utils/localStorage";
import { googleLogout } from "@react-oauth/google";
import { produce } from "immer";
import { StateCreator } from "zustand";
import { FETCHING_STATUS } from "../config/constants";
import { getUserDetails } from "../features/auth/authService";

export interface IUser {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
  access_token: string;
}

export enum AUTH_STATUS {
  NOT_INITIALIZED,
  AUTHENTICATED,
  UNAUTHENTICATED,
  FETCHING,
}

export type UserState = {
  authStatus: AUTH_STATUS;
  userDetails: { data: IUser | null; fetchingStatus: FETCHING_STATUS };
  refreshAuthStatus: () => Promise<void>;
  getUserDetails: (token: string) => void;
  googleLogout: () => void;
};

const userStore: StateCreator<UserState, [], [], UserState> = (set, get) => ({
  authStatus: AUTH_STATUS.NOT_INITIALIZED,
  userDetails: { data: null, fetchingStatus: FETCHING_STATUS.IDLE },

  googleLogout() {
    googleLogout();
    set({
      authStatus: AUTH_STATUS.UNAUTHENTICATED,
      userDetails: { data: null, fetchingStatus: FETCHING_STATUS.IDLE },
    });
    removeUserInfoFromLocalStorage();
  },

  refreshAuthStatus: async () => {
    console.log("Refreshing refreshAuthStatus =======");
    const user = getUserInfoFromLocalStorage();
    if (null === user) {
      set(
        produce((userStatus) => {
          userStatus.authStatus = AUTH_STATUS.UNAUTHENTICATED;
        })
      );
      return Promise.resolve();
    }

    set(
      produce((userStatus) => {
        userStatus.authStatus = AUTH_STATUS.FETCHING;
      })
    );

    return await get().getUserDetails(user.access_token);
  },

  getUserDetails: async (access_token: string) => {
    try {
      set(
        produce((state: UserState) => {
          state.userDetails.fetchingStatus = FETCHING_STATUS.FETCHING;
        })
      );
      const user = await getUserDetails(access_token);
      const userDetailsData = { ...user.data, access_token };
      set(
        produce((state: UserState) => {
          state.userDetails.fetchingStatus = FETCHING_STATUS.SUCCESS;
          state.userDetails.data = userDetailsData;
          state.authStatus = AUTH_STATUS.AUTHENTICATED;
        })
      );

      setUserInfoToLocalStorage(userDetailsData);
    } catch (ex) {
      get().googleLogout();
      set(
        produce((state: UserState) => {
          state.authStatus = AUTH_STATUS.UNAUTHENTICATED;
          state.userDetails.fetchingStatus = FETCHING_STATUS.ERROR;
        })
      );
    }
  },
});

export default userStore;
