import { IQuestion, IQuestionForm, QuestionStatus } from "@/store/question";
import { get, post } from "@/utils/http";

export const getQuestions = async (
  questionStatus?: QuestionStatus
): Promise<IQuestion> => {
  const queryParam = questionStatus ? `?questionType=${questionStatus}` : ``;
  return await get(`/question${queryParam}`);
};

export const saveQuestions = async (
  payload: IQuestionForm
): Promise<IQuestion> => {
  return await post(`/question`, payload);
};

export const deleteQuestion = async (
  questionId: string
): Promise<IQuestion> => {
  return await get(`/question/remove/${questionId}`);
};

export const approveQuestion = async (
  questionId: string
): Promise<IQuestion> => {
  return await get(`/question/approve/${questionId}`);
};
