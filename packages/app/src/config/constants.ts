export enum FETCHING_STATUS {
  IDLE = "IDLE",
  FETCHING = "FETCHING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export const Constants = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  DATE_TIME_FORMAT: "dd-MM-yyyy hh:mm:ss",
  TITLE_MAX_LENGTH: 50,
};
