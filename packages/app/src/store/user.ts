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
  id: string;
  email: string;
  name: string;
  picture: string;
}

export enum AUTH_STATUS {
  NOT_INITIALIZED,
  AUTHENTICATED,
  UNAUTHENTICATED,
  FETCHING,
}

export interface IUserDetails {
  data: IUser | null;
  jwtToken: string | null;
  accessToken: string | null;
}

export type UserState = {
  authStatus: AUTH_STATUS;
  userDetails: IUserDetails & {
    fetchingStatus: FETCHING_STATUS;
  };
  refreshAuthStatus: () => Promise<void>;
  getUserDetails: (token: string) => void;
  googleLogout: () => void;
};

const userStore: StateCreator<UserState, [], [], UserState> = (set, get) => ({
  authStatus: AUTH_STATUS.NOT_INITIALIZED,
  userDetails: {
    data: null,
    jwtToken: null,
    accessToken: null,
    fetchingStatus: FETCHING_STATUS.IDLE,
  },

  googleLogout() {
    googleLogout();
    set({
      authStatus: AUTH_STATUS.UNAUTHENTICATED,
      userDetails: {
        data: null,
        jwtToken: null,
        accessToken: null,
        fetchingStatus: FETCHING_STATUS.IDLE,
      },
    });
    removeUserInfoFromLocalStorage();
  },

  refreshAuthStatus: async () => {
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

    return await get().getUserDetails(user.accessToken as string);
  },

  getUserDetails: async (accessToken: string) => {
    try {
      set(
        produce((state: UserState) => {
          state.userDetails.fetchingStatus = FETCHING_STATUS.FETCHING;
        })
      );
      const userDetails = await getUserDetails(accessToken);
      set(
        produce((state: UserState) => {
          state.userDetails.fetchingStatus = FETCHING_STATUS.SUCCESS;
          state.userDetails.data = userDetails.userDetails;
          state.userDetails.jwtToken = userDetails.jwtToken;
          state.authStatus = AUTH_STATUS.AUTHENTICATED;
        })
      );

      setUserInfoToLocalStorage({
        accessToken,
        data: userDetails.userDetails,
        jwtToken: userDetails.jwtToken,
      });
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
