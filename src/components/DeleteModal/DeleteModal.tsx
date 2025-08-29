import React from "react";
import "./DeleteModal.scss";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

interface DeleteModalProps {
  isOpen: boolean;
  monitorName: string;
  onOk: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  monitorName,
  onOk,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-container">
        <button
          className="delete-modal-close"
          onClick={onCancel}
          aria-label="Close"
        >
          ×
        </button>
        <div
          className="delete-modal-header"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <h2 className="delete-modal-title">Delete Directory Monitor</h2>
        </div>
        <div className="delete-modal-content">
          <QuestionMarkCircleIcon
            width={20}
            hanging={20}
            className=" text-red-500"
            aria-hidden="true"
          />
          <span className="delete-modal-text">
            Delete monitor “{monitorName}” ?
          </span>
        </div>
        <div className="delete-modal-actions">
          <button className="delete-modal-ok" onClick={onOk}>
            OK
          </button>
          <button className="delete-modal-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
