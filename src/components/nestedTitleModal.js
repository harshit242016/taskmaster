import React, { useState } from 'react';
import { Modal, Input } from 'antd';

const NestedTitleModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = () => {
    onSave(title);
    setTitle('');
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      closeIcon={<span className="modal-close-icon" style= {{display : "none"}}>X</span>} // Custom close icon
    >
      <Input placeholder="Nested Todo Title" value={title} onChange={handleTitleChange} />
    </Modal>
  );
};

export default NestedTitleModal;
