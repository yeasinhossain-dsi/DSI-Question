import { FETCHING_STATUS } from "@/config/constants";
import { getQuestions } from "@/features/questions/QuestionService";
import { produce } from "immer";
import { StateCreator } from "zustand";
import { IUser } from "./user";

export enum QuestionStatus {
  APPROVED = "approved",
  UNAPPROVED = "latest",
  MY = "myQuestions",
}

export interface IQuestionForm {
  id: string;
  title: string;
  content: string;
}

export interface IQuestion extends IQuestionForm {
  author: IUser;
  approvers: IUser[];
  createdAt: number;
}

interface IQuestionAction {
  getQuestion: (status?: QuestionStatus) => void;
}

export interface QuestionState extends IQuestionAction {
  questions: IQuestion[];
  questionFetchingStatus: FETCHING_STATUS;
}

const userStore: StateCreator<QuestionState, [], [], QuestionState> = (
  set
) => ({
  questions: [],
  questionFetchingStatus: FETCHING_STATUS.IDLE,
  getQuestion: async (status?: QuestionStatus) => {
    set(
      produce((state) => {
        state.questionFetchingStatus = FETCHING_STATUS.FETCHING;
        state.questions = [];
      })
    );
    try {
      const questions = await getQuestions(status);
      set(
        produce((state) => {
          state.questionFetchingStatus = FETCHING_STATUS.SUCCESS;
          state.questions = questions;
        })
      );
    } catch (ex) {
      set(
        produce((state) => {
          state.questionFetchingStatus = FETCHING_STATUS.ERROR;
        })
      );
    }
  },
});

export default userStore;
