import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ReusableModal.scss';

type ModalProps = {
  isOpen: boolean;
  toggle: () => void;
  header: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

const ReusableModal: React.FC<ModalProps> = ({
  isOpen,
  toggle,
  header,
  children,
  footer,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{header}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </Modal>
  );
};

export default ReusableModal;
