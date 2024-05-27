import { Button, Tabs } from "flowbite-react";
import { FaCrown, FaUser } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { useParams } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import NewQuestionModal from "./NewQuestionModal";
import { useState } from "react";

const Questions = () => {
  const params = useParams();
  console.log(params);

  const [show, setShow] = useState(false);

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
          <Tabs.Item active title="Latest" icon={FaCrown}>
            Approved Questions
          </Tabs.Item>
          <Tabs.Item title="Approved" icon={GoVerified}>
            Latest Questions
          </Tabs.Item>
          <Tabs.Item title="My Questions" icon={FaUser}>
            My questions
          </Tabs.Item>
        </Tabs>
      </div>

      <NewQuestionModal onClose={() => setShow(false)} show={show} />
    </>
  );
};

export default Questions;
