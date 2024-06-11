import Confirm from "@/components/base/confirm/Confirm";
import TableComponent, { IColumn } from "@/components/base/table/Table";
import { Constants } from "@/config/constants";
import useStore from "@/store";
import { IQuestion, QuestionStatus } from "@/store/question";
import { truncateTitle } from "@/utils/common";
import ThreeDots from "@components/icons/ThreeDots";
import { format } from "date-fns";
import { Button, Dropdown, Tabs, Tooltip } from "flowbite-react";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { FaCrown, FaUser } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { ToastOptions, toast } from "react-toastify";
import NewQuestionModal from "./NewQuestionModal";
import useQuestions from "./useQuestions";

const ToastSetting = {
  position: "top-right",
  theme: "colored",
} as ToastOptions;

const Questions = () => {
  const intl = useIntl();
  const [showConfirmApproval, setShowConfirmApproval] = useState(false);
  const [showConfirmRemoval, setShowConfirmRemoval] = useState(false);
  const [showQuestionView, setShowQuestionView] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion>();
  const { questionStatus } = useParams();
  const { questions, userDetails } = useStore();
  const navigate = useNavigate();

  const { isLoading, fetch, remove, approve } = useQuestions();

  useEffect(() => {
    (async () => {
      await fetch(questionStatus as QuestionStatus);
    })();
  }, [questionStatus]);

  const getHeaders = (): IColumn[] => {
    if (questionStatus === QuestionStatus.UNAPPROVED)
      return [
        {
          key: "title",
          label: "Title",
        },
        {
          key: "author",
          label: "Author",
        },
        {
          key: "createdAt",
          label: "Submitted",
        },
        {
          key: "action",
          label: "",
        },
      ] as IColumn[];
    return [
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
        key: "createdAt",
        label: "Submitted",
      },
      {
        key: "action",
        label: "",
      },
    ] as IColumn[];
  };

  const onClickApprove = (selectedQuestion: IQuestion) => {
    setShowConfirmApproval(true);
    setSelectedQuestion(selectedQuestion);
  };

  const onClickRemove = (selectedQuestion: IQuestion) => {
    setShowConfirmRemoval(true);
    setSelectedQuestion(selectedQuestion);
  };

  const onClickView = (selectedQuestion: IQuestion) => {
    setShowQuestionView(true);
    setSelectedQuestion(selectedQuestion);
  };

  const onClose = () => {
    setShowQuestionView(false);
    setShowConfirmRemoval(false);
    setShowConfirmApproval(false);
    setSelectedQuestion(undefined);
  };

  const isMyQuestion = (question: IQuestion) => {
    return question.author.id === userDetails?.data?.id;
  };

  const iHaveApproved = (question: IQuestion) => {
    return question.approvers.some(
      (approver) => approver.id === userDetails?.data?.id
    );
  };

  const prepareTableData = () => {
    return (questions || []).map((question) => {
      return {
        id: question.id,
        title: truncateTitle(question.title),
        author: (
          <div className="flex gap-2 content-center items-center leading-3">
            <img
              className="rounded-full"
              width={36}
              src={question.author.picture}
            />
            <div className="flex flex-col">
              <span className="text-lg text-black">{question.author.name}</span>
              <span className="text-[12px]">{question.author.email}</span>
            </div>
          </div>
        ),
        approver: (
          <div className="flex gap-2">
            {question.approvers.map((approver, key) => {
              return (
                <div key={key}>
                  <Tooltip
                    content={
                      <div className="flex flex-col leading-3 font-light">
                        <span className="text-lg">{approver.name}</span>
                        <span className="text-[12px]">{approver.email}</span>
                      </div>
                    }
                  >
                    <img
                      className="rounded-full"
                      width={36}
                      src={approver.picture}
                    />
                  </Tooltip>
                </div>
              );
            })}
          </div>
        ),
        action: (
          <div className="flex justify-end items-center">
            <Dropdown
              label={<ThreeDots />}
              dismissOnClick={false}
              inline
              arrowIcon={false}
            >
              <Dropdown.Item onClick={() => onClickView(question)}>
                <FormattedMessage id="cta.view" />
              </Dropdown.Item>
              {isMyQuestion(question) && (
                <Dropdown.Item onClick={() => onClickRemove(question)}>
                  <FormattedMessage id="cta.remove" />
                </Dropdown.Item>
              )}

              {!isMyQuestion(question) && !iHaveApproved(question) && (
                <Dropdown.Item onClick={() => onClickApprove(question)}>
                  <FormattedMessage id="cta.approve" />
                </Dropdown.Item>
              )}
            </Dropdown>
          </div>
        ),
        createdAt: format(question.createdAt, Constants.DATE_TIME_FORMAT),
        content: question.content,
      };
    });
  };

  const onTabChange = (activeTab: number) => {
    if (activeTab === 0) navigate(`/questions/${QuestionStatus.UNAPPROVED}`);
    else if (activeTab === 1) navigate(`/questions/${QuestionStatus.APPROVED}`);
    else navigate(`/questions`);
  };

  const handleRemove = async () => {
    const completed = await remove(selectedQuestion?.id as string);
    await fetch(questionStatus as QuestionStatus);

    if (!completed)
      toast.error(
        intl.formatMessage({ id: "notification.error.remove" }),
        ToastSetting
      );
    else
      toast.success(
        intl.formatMessage({ id: "notification.success.remove" }),
        ToastSetting
      );

    onClose();
  };

  const handleApprove = async () => {
    const completed = await approve(selectedQuestion?.id as string);
    await fetch(questionStatus as QuestionStatus);

    if (!completed)
      toast.error(
        intl.formatMessage({ id: "notification.error.approve" }),
        ToastSetting
      );
    else
      toast.success(
        intl.formatMessage({ id: "notification.success.approve" }),
        ToastSetting
      );
    onClose();
  };

  return (
    <>
      <div className="relative">
        <div className="absolute right-0 top-0">
          <Button color="light" onClick={() => setShowQuestionView(true)}>
            <div className="flex justify-center items-center gap-1">
              <IoMdAddCircleOutline size={20} />
              <FormattedMessage id="cta.add" />
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
              data={prepareTableData()}
              headerColumns={getHeaders()}
            />
          </Tabs.Item>
          <Tabs.Item
            title={intl.formatMessage({ id: "tab.label.approved" })}
            icon={GoVerified}
            active={questionStatus === QuestionStatus.APPROVED}
          >
            <TableComponent
              isLoading={isLoading}
              data={prepareTableData()}
              headerColumns={getHeaders()}
            />
          </Tabs.Item>
          <Tabs.Item
            title={intl.formatMessage({ id: "tab.label.myQuestion" })}
            icon={FaUser}
            active={
              questionStatus === QuestionStatus.MY || isEmpty(questionStatus)
            }
          >
            <TableComponent
              isLoading={isLoading}
              data={prepareTableData()}
              headerColumns={getHeaders()}
            />
          </Tabs.Item>
        </Tabs>
      </div>

      <NewQuestionModal
        onClose={onClose}
        show={showQuestionView}
        selectedQuestion={selectedQuestion}
      />

      <Confirm
        onCancel={onClose}
        onConfirm={handleApprove}
        show={showConfirmApproval}
        inProgress={isLoading}
      >
        <FormattedMessage id="confirmation.approve" />
      </Confirm>

      <Confirm
        onCancel={onClose}
        onConfirm={handleRemove}
        show={showConfirmRemoval}
        inProgress={isLoading}
      >
        <FormattedMessage id="confirmation.remove" />
      </Confirm>
    </>
  );
};

export default Questions;
