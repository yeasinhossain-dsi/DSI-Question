import TableComponent from "@/components/base/table/Table";
import { Button, Tabs } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCrown, FaUser } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FormattedMessage, useIntl } from "react-intl";
import { toast } from "react-toastify";
import NewQuestionModal from "./NewQuestionModal";
import useQuestions from "./useQuestions";
import { QuestionStatus } from "@/store/question";
import { useNavigate, useParams } from "react-router-dom";

const Questions = () => {
  const intl = useIntl();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { questionStatus } = useParams();

  const { headers, tableData, isLoading, fetch } = useQuestions();

  useEffect(() => {
    console.log(questionStatus);
    (async () => {
      await fetch(questionStatus as QuestionStatus);
    })();
  }, [questionStatus]);

  const onTabChange = (activeTab: number) => {
    if (activeTab === 0) navigate(`/questions/${QuestionStatus.UNAPPROVED}`);
    else if (activeTab === 1) navigate(`/questions/${QuestionStatus.APPROVED}`);
    else navigate(`/questions`);
  };

  return (
    <>
      <div className="relative">
        <div className="absolute right-0 top-0">
          <Button
            color="light"
            onClick={() => {
              setShow(true);
              toast("Wow so easy!", {
                theme: "dark",
                position: "bottom-right",
              });
            }}
          >
            <div className="flex justify-center items-center gap-1">
              <IoMdAddCircleOutline size={20} />
              <FormattedMessage id="button.question.add" />
            </div>
          </Button>
        </div>
        <Tabs
          aria-label="Default tabs"
          style="underline"
          onActiveTabChange={onTabChange}
        >
          <Tabs.Item
            active={questionStatus === QuestionStatus.UNAPPROVED}
            title={intl.formatMessage({ id: "tab.label.latest" })}
            icon={FaCrown}
          >
            <TableComponent
              isLoading={isLoading}
              data={tableData}
              headerColumns={headers}
            />
          </Tabs.Item>
          <Tabs.Item
            title={intl.formatMessage({ id: "tab.label.approved" })}
            icon={GoVerified}
            active={questionStatus === QuestionStatus.APPROVED}
          >
            <TableComponent
              isLoading={isLoading}
              data={tableData}
              headerColumns={headers}
            />
          </Tabs.Item>
          <Tabs.Item
            title={intl.formatMessage({ id: "tab.label.myQuestion" })}
            icon={FaUser}
            active={questionStatus === QuestionStatus.MY}
          >
            <TableComponent
              isLoading={isLoading}
              data={tableData}
              headerColumns={headers}
            />
          </Tabs.Item>
        </Tabs>
      </div>

      <NewQuestionModal onClose={() => setShow(false)} show={show} />
    </>
  );
};

export default Questions;
