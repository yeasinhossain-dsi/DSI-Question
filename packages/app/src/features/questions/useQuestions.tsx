import { IColumn } from "@/components/base/table/Table";
import { useEffect, useState } from "react";

const questions = [
  {
    author: {
      name: "Yeasin Hossan",
      email: "yp.yeasin@gmail.com",
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_f4n1aMbG0m7YA0BKp50yECWqKJe56jyF5cO4j9kX9TEmW6gx0w=s96-c",
    },
    approver: [
      {
        name: "Sky labs",
        email: "skylabs@gmail.com",
        photo:
          "https://lh3.googleusercontent.com/a/ACg8ocIpO2Ihl0ugGO5ocZeMWI1W8T1HXbaCQiAn5W64qQ9pBdl7tQ=s96-c",
      },
    ],
    title: "Question Title",
    content: "Question Content",
    id: 1,
    createdAt: "2022-01-01",
  },
  {
    author: {
      name: "Yeasin Hossan",
      email: "yp.yeasin@gmail.com",
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_f4n1aMbG0m7YA0BKp50yECWqKJe56jyF5cO4j9kX9TEmW6gx0w=s96-c",
    },
    approver: [
      {
        name: "Sky labs",
        email: "skylabs@gmail.com",
        photo:
          "https://lh3.googleusercontent.com/a/ACg8ocIpO2Ihl0ugGO5ocZeMWI1W8T1HXbaCQiAn5W64qQ9pBdl7tQ=s96-c",
      },
    ],
    title: "Question Title 2",
    content: "Question Content",
    id: 1,
    createdAt: "2022-01-01",
  },
];

const useQuestions = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState<any[]>([]);
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
              src={question.author.photo}
            />
            {question.author.name}
          </div>
        ),
        approver: (
          <div className="flex gap-2 content-center items-center">
            <img
              className="rounded-full"
              width={36}
              src={question.approver[0].photo}
            />
            {question.approver[0].name}
          </div>
        ),
        createdAt: question.createdAt,
        content: question.content,
        action: <></>,
      });
    });

    setTimeout(() => {
      setTableData(tempTableData);
      setIsLoading(false);
    }, 3000);
  }, []);
  return { tableData, headers, isLoading };
};

export default useQuestions;
