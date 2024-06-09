import { get } from "@/utils/http";
import { IUser } from "../../store/user";

export interface IUserDetailsResponse {
  userDetails: IUser;
  jwtToken: string;
}

export const getUserDetails = async (
  token: string
): Promise<IUserDetailsResponse> => {
  return get(`/auth?accessToken=${token}`);
};
