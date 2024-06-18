import { Button, Label, Modal, TextInput } from "flowbite-react";
import { FormattedMessage, useIntl } from "react-intl";

import { IQuestionForm, QuestionStatus } from "@/store/question";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useQuestions from "./useQuestions";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import useStore from "@/store";
import "highlight.js/styles/github.css"; // Import Highlight.js styles
import { isEmpty } from "lodash";
import { useParams } from "react-router-dom";

import DOMPurify from "dompurify";

interface IProps {
  show: boolean;
  onClose: () => void;
  selectedQuestion?: IQuestionForm;
}

const NewQuestionModal = ({ show, onClose, selectedQuestion }: IProps) => {
  const [title, setTitle] = useState<string>(selectedQuestion?.title || "");
  const intl = useIntl();
  const [content, setContent] = useState<string>(
    selectedQuestion?.content || ""
  );
  const { isLoading, save, fetch } = useQuestions();
  const { questionStatus } = useParams();
  const {
    userDetails: { data: userDetails },
    questions,
  } = useStore();

  const sanitizedHtml = DOMPurify.sanitize(selectedQuestion?.content || "");

  useEffect(() => {
    setTitle(selectedQuestion?.title || "");
    setContent(selectedQuestion?.content || "");
  }, [selectedQuestion]);

  const errorNotify = () =>
    toast.error(intl.formatMessage({ id: "notification.error.saveQuestion" }), {
      position: "top-right",
      theme: "colored",
    });

  const successNotify = () =>
    toast.success(
      intl.formatMessage({ id: "notification.success.questionSaved" }),
      {
        position: "top-right",
        theme: "colored",
      }
    );

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onContentChange = (content: string) => {
    setContent(content);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await save({
      id: selectedQuestion?.id,
      title,
      content,
    } as IQuestionForm);
    await fetch(questionStatus as QuestionStatus);
    if (isEmpty(response)) {
      errorNotify();
      return;
    }
    successNotify();
    onClose();
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      ["link", "image"],
      ["code-block"], // Add code block button to the toolbar
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "script",
    "sub",
    "super",
    "align",
    "color",
    "background",
    "link",
    "image",
    "code-block", // Add code block to formats
  ];

  const isMyQuestion = () => {
    const selectedQuestionDetails = questions.find(
      (question) => question.id === selectedQuestion?.id
    );
    if (isEmpty(selectedQuestionDetails)) return true;
    return selectedQuestionDetails.author?.id === userDetails?.id;
  };

  return (
    <Modal dismissible show={show} onClose={() => onClose()} size={"8xl"}>
      {!isMyQuestion() && (
        <>
          <Modal.Header>{selectedQuestion?.title}</Modal.Header>
          <Modal.Body>
            <div className="flex flex-col min-h-[60vh] max-h-[60vh]">
              <div
                className="html-content"
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
              />
            </div>
          </Modal.Body>
        </>
      )}
      {isMyQuestion() && (
        <form onSubmit={onSubmit}>
          <Modal.Header>
            <FormattedMessage id="heading.newQuestion" />
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col min-h-[60vh] max-h-[60vh]">
              <div className="flex flex-col gap-4 mb-6">
                <Label htmlFor="title">
                  <FormattedMessage id="form.label.title" />
                  <span className="text-red-700">*</span>
                </Label>
                <TextInput
                  className="border-none"
                  type="text"
                  id="title"
                  onChange={onChangeTitle}
                  value={title}
                />
              </div>

              <div className="flex flex-grow pb-12 overflow-hidden">
                <ReactQuill
                  className="flex-1"
                  theme="snow"
                  value={content}
                  onChange={onContentChange}
                  modules={modules}
                  formats={formats}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex w-full justify-end">
              <Button color={"success"} type="submit" disabled={isLoading}>
                <FormattedMessage id="cta.save" />
              </Button>
            </div>
          </Modal.Footer>
        </form>
      )}
    </Modal>
  );
};

export default NewQuestionModal;
