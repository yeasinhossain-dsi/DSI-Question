import TableComponent from "@/components/base/table/Table";
import { Button, Tabs } from "flowbite-react";
import { useState } from "react";
import { FaCrown, FaUser } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FormattedMessage, useIntl } from "react-intl";
import { toast } from "react-toastify";
import NewQuestionModal from "./NewQuestionModal";
import useQuestions from "./useQuestions";

const Questions = () => {
  const intl = useIntl();
  const [show, setShow] = useState(false);
  const { headers, tableData, isLoading } = useQuestions();

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
        <Tabs aria-label="Default tabs" style="underline">
          <Tabs.Item
            active
            title={intl.formatMessage({ id: "tab.label.latest" })}
            icon={FaCrown}
          >
            <TableComponent
              isLoading={isLoading}
              data={[]}
              headerColumns={headers}
              noDataText={intl.formatMessage({
                id: "questions.label.noUnApproved",
              })}
            />
          </Tabs.Item>
          <Tabs.Item
            title={intl.formatMessage({ id: "tab.label.approved" })}
            icon={GoVerified}
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
          >
            <TableComponent
              isLoading={isLoading}
              data={[]}
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
