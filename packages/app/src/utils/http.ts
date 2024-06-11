import axios, { AxiosRequestConfig } from "axios";
import { getUserInfoFromLocalStorage } from "./localStorage";
import { Constants } from "@/config/constants";
import useStore from "@/store";

const error = (ex: any) => {
  if ([401, 403].includes(ex.response.status)) {
    useStore.getState().googleLogout();
    throw Error(ex.response.data.message);
  }

  if (ex.response.data) {
    throw Error(ex.response.data.message);
  }
};

const getClient = (options: AxiosRequestConfig = {}) => {
  const userInfo = getUserInfoFromLocalStorage();
  if (userInfo?.jwtToken)
    options = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.jwtToken,
      },
    };

  return axios.create({
    baseURL: Constants.API_BASE_URL,
    ...options,
  });
};

export const get = async (url: string, options: AxiosRequestConfig = {}) => {
  const client = getClient(options);
  try {
    const response = await client.get(url, options);
    return response.data;
  } catch (ex) {
    error(ex);
  }
};

export const post = async (
  url: string,
  payload: any,
  options: AxiosRequestConfig = {}
) => {
  try {
    const client = getClient(options);
    const response = await client.post(url, payload, options);
    return response.data;
  } catch (ex) {
    error(ex);
  }
};
