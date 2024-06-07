import { Constants } from "@/config/constants";
import { IQuestion, QuestionStatus } from "@/store/question";
import { getUserInfoFromLocalStorage } from "@/utils/localStorage";
import axios from "axios";

export const getQuestions = async (
  questionStatus?: QuestionStatus
): Promise<IQuestion> => {
  const queryParam = questionStatus ? `?questionType=${questionStatus}` : ``;
  const response = await axios.get(
    `${Constants.API_BASE_URL}/question${queryParam}`,
    {
      headers: {
        Authorization: `Bearer ${getUserInfoFromLocalStorage()?.jwtToken}`,
      },
    }
  );
  return response.data;
};
