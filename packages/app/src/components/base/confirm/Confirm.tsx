import { Button, Modal } from "flowbite-react";
import React from "react";
import { FormattedMessage } from "react-intl";

interface IProps {
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  show: boolean;
  inProgress?: boolean;
}

const Confirm = ({
  children,
  show,
  inProgress = false,
  onConfirm,
  onCancel,
}: IProps) => {
  return (
    <Modal dismissible show={show} onClose={onCancel}>
      <Modal.Body>
        {children}
        <div className="flex justify-end gap-4">
          <Button disabled={inProgress} color="gray" onClick={onCancel}>
            <FormattedMessage id="cta.Cancel" />
          </Button>
          <Button disabled={inProgress} color="success" onClick={onConfirm}>
            <FormattedMessage id="cta.Confirm" />
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Confirm;
