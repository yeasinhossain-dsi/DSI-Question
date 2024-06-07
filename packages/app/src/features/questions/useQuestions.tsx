import { IColumn } from "@/components/base/table/Table";
import { FETCHING_STATUS } from "@/config/constants";
import useStore from "@/store";
import { QuestionStatus } from "@/store/question";
import { useEffect, useState } from "react";

const useQuestions = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const { getQuestion, questionFetchingStatus, questions } = useStore();

  const headers = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "author",
      label: "Author",
    },
    {
      key: "approver",
      label: "Approver",
    },
    {
      key: "action",
      label: "",
    },
  ] as IColumn[];

  useEffect(() => {
    const tempTableData: any[] = [];

    questions.map((question) => {
      tempTableData.push({
        title: question.title,
        author: (
          <div className="flex gap-2 content-center items-center">
            <img
              className="rounded-full"
              width={36}
              src={question.author.picture}
            />
            {question.author.name}
          </div>
        ),
        approver: question.approvers.map((approver, key) => {
          return (
            <div key={key} className="flex gap-2 content-center items-center">
              <img className="rounded-full" width={36} src={approver.picture} />
              {approver.name}
            </div>
          );
        }),
        createdAt: question.id,
        content: question.content,
        action: <></>,
      });
    });

    setTableData(tempTableData);
  }, [questions]);

  const fetch = async (status: QuestionStatus) => {
    return await getQuestion(status);
  };
  return {
    tableData,
    headers,
    isLoading: questionFetchingStatus === FETCHING_STATUS.FETCHING,
    fetch,
  };
};

export default useQuestions;
