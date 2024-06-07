import axios from "axios";
import { IUser } from "../../store/user";
import { Constants } from "@/config/constants";

export interface IUserDetailsResponse {
  userDetails: IUser;
  jwtToken: string;
}

export const getUserDetails = async (
  token: string
): Promise<IUserDetailsResponse> => {
  const result = await axios.get(
    `${Constants.API_BASE_URL}/auth?accessToken=${token}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return result?.data;
};
