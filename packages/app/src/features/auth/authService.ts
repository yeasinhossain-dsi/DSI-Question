import axios from "axios";
import { IUser } from "../../store/user";

export const getUserDetails = async (
  token: string
): Promise<{ data: IUser }> => {
  return await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
};
