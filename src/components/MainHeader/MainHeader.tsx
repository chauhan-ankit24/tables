import React from "react";
import { modalStore } from "../../stores/ModalStore";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import "./MainHeader.scss";

const MainHeader: React.FC = () => {
  return (
    <div className="table-header-bar">
      <span className="table-header-title">
        Directory Monitor
        <ArrowPathIcon
          className="table-header-refresh"
          onClick={() => window.location.reload()}
        />
      </span>
      <div className="table-header-actions">
        <button
          className="table-header-btn add"
          onClick={() => {
            modalStore.resetModalData();
            modalStore.selectedRowId = "";
            modalStore.isAddMode = true;
            modalStore.openDirectoryMonitorModal();
          }}
        >
          + Add
        </button>
      </div>
    </div>
  );
};

export default MainHeader;
