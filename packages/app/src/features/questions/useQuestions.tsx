import { FETCHING_STATUS } from "@/config/constants";
import useStore from "@/store";
import { IQuestionForm, QuestionStatus } from "@/store/question";
import { useEffect, useState } from "react";
import {
  approveQuestion,
  deleteQuestion,
  saveQuestions,
} from "./QuestionService";

const useQuestions = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setError] = useState<boolean>(false);
  const { getQuestion, questionFetchingStatus } = useStore();

  useEffect(() => {
    setIsLoading(questionFetchingStatus === FETCHING_STATUS.FETCHING);
    setError(questionFetchingStatus === FETCHING_STATUS.ERROR);
  }, [questionFetchingStatus]);

  const fetch = async (status?: QuestionStatus) => {
    return await getQuestion(status);
  };

  const save = async (payload: IQuestionForm) => {
    let response;
    setIsLoading(false);
    setError(false);
    try {
      response = await saveQuestions(payload);
    } catch (ex) {
      setError(true);
      response = null;
    } finally {
      setIsLoading(false);
    }
    return response;
  };

  const approve = async (questionId: string) => {
    let response = true;
    setIsLoading(false);
    setError(false);
    try {
      await approveQuestion(questionId);
    } catch (ex) {
      response = false;
      setError(true);
    } finally {
      setIsLoading(false);
    }
    return response;
  };

  const remove = async (questionId: string) => {
    let response = true;
    setIsLoading(false);
    setError(false);
    try {
      await deleteQuestion(questionId);
    } catch (ex) {
      response = false;
      setError(true);
    } finally {
      setIsLoading(false);
    }
    return response;
  };

  return {
    isLoading,
    hasError,
    fetch,
    save,
    remove,
    approve,
  };
};

export default useQuestions;
