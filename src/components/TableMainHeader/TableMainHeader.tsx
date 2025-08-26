import React from "react";
import { modalStore } from "../../stores/ModalStore";
import "./TableMainHeader.css";

const TableHeader: React.FC = () => {
  return (
    <div className="table-header-bar">
      <span className="table-header-title">Directory Monitor</span>
      <div className="table-header-actions">
        <button
          className="table-header-btn add"
          onClick={modalStore.openDirectoryMonitorModal}
        >
          + Add
        </button>
      </div>
    </div>
  );
};

export default TableHeader;
