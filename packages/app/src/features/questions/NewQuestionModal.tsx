import {
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  InsertTable,
  MDXEditor,
  UndoRedo,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { FormattedMessage } from "react-intl";

import "@mdxeditor/editor/style.css";
import { useRef, useState } from "react";

interface IProps {
  show: boolean;
  onClose: () => void;
}

const NewQuestionModal = ({ show, onClose }: IProps) => {
  const [title, setTitle] = useState("");
  const [content, setMarkdownContent] = useState("");

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeMarkdown = (content: string) => {
    setMarkdownContent(content);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ title, content });
  };

  return (
    <Modal dismissible show={show} onClose={() => onClose()} size={"8xl"}>
      <form onSubmit={onSubmit}>
        <Modal.Header>
          <FormattedMessage id="heading.newQuestion" />
        </Modal.Header>
        <Modal.Body>
          <div className="min-h-[60vh] max-h-[60vh]">
            <div className="flex flex-col gap-4 mb-6">
              <Label htmlFor="title">
                <FormattedMessage id="form.label.title" />
                <span className="text-red-700">*</span>
              </Label>
              <TextInput type="text" id="title" onChange={onChangeTitle} />
            </div>

            <MDXEditor
              onChange={onChangeMarkdown}
              markdown=""
              plugins={[
                headingsPlugin(),
                listsPlugin(),
                linkPlugin(),
                quotePlugin(),
                markdownShortcutPlugin(),
                tablePlugin(),
                linkDialogPlugin(),
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                      <CodeToggle />
                      <InsertTable />
                      <CreateLink />
                    </>
                  ),
                }),
              ]}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full justify-end">
            <Button color={"success"} type="submit">
              <FormattedMessage id="button.save" />
            </Button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default NewQuestionModal;
