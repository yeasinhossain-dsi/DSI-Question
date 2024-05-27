import {
  BoldItalicUnderlineToggles,
  CodeToggle,
  ConditionalContents,
  InsertCodeBlock,
  MDXEditor,
  UndoRedo,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { FormattedMessage } from "react-intl";

import "@mdxeditor/editor/style.css";

interface IProps {
  show: boolean;
  onClose: () => void;
}

const NewQuestionModal = ({ show, onClose }: IProps) => {
  return (
    <Modal dismissible show={show} onClose={() => onClose()} size={"8xl"}>
      <Modal.Header>
        <FormattedMessage id="heading.newQuestion" />
      </Modal.Header>
      <Modal.Body>
        <div>
          <form action="">
            <div className="flex flex-col gap-4 mb-6">
              <Label htmlFor="disabledInput1">
                <FormattedMessage id="form.label.title" />
                <span className="text-red-700">*</span>
              </Label>
              <TextInput type="text" id="disabledInput1" />
            </div>

            <MDXEditor
              markdown="# Hello world"
              plugins={[
                headingsPlugin(),
                listsPlugin(),
                linkPlugin(),
                quotePlugin(),
                markdownShortcutPlugin(),
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                      <CodeToggle />
                      <InsertCodeBlock /> <ConditionalContents options={[]} />
                    </>
                  ),
                }),
              ]}
            />
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full justify-end">
          <Button color={"success"} onClick={() => onClose()}>
            <FormattedMessage id="button.save" />
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default NewQuestionModal;
