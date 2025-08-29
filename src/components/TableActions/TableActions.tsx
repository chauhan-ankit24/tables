import { useStores } from "../../hooks/useStores";
import DeleteModal from "../DeleteModal/DeleteModal";
import React from "react";
import { observer } from "mobx-react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import "./TableActions.scss";
import OptionsDropDown from "../OptionsDropDown/OptionsDropDown";
import { createPortal } from "react-dom";

export interface TableActionsProps {
  onEdit: () => void;
  rowId: string;
  row: Record<string, unknown>;
  openDropdownRowId?: string;
  setOpenDropdownRowId?: (rowId: string | null) => void;
}

const TableActions: React.FC<TableActionsProps> = observer(
  ({ onEdit, rowId, row, openDropdownRowId, setOpenDropdownRowId }) => {
    const { modalStore } = useStores();
    const dotsRef = React.useRef<HTMLSpanElement>(null);
    // Use dropdownStore for open/close, but keep dropdownCoords local for position
    const [dropdownCoords, setDropdownCoords] = React.useState<{
      left: number;
      top: number;
    } | null>(null);

    const handleDotsClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (dotsRef.current) {
        const rect = dotsRef.current.getBoundingClientRect();
        setDropdownCoords({
          left: rect.left,
          top: rect.bottom,
        });
      }
      setOpenDropdownRowId && setOpenDropdownRowId(rowId);
    };

    const handleMouseLeaveDropdown = () => {
      setOpenDropdownRowId && setOpenDropdownRowId(null);
    };

    const handleDeleteOk = async () => {
      if (modalStore.deleteMonitorId) {
        const { tableStore } = require("../../stores/TableStore");
        await tableStore.deleteRow(modalStore.deleteMonitorId);
      }
      modalStore.closeDeleteModal();
    };

    const handleDeleteCancel = () => {
      modalStore.closeDeleteModal();
    };

    return (
      <>
        <div className="table-row-actions">
          <button className="table-action-btn">View Trigger</button>
          <button className="table-action-btn">Run</button>
          <button className="table-action-btn" onClick={onEdit}>
            Edit
          </button>
          <span
            className="table-action-dots clickable"
            ref={dotsRef}
            onClick={handleDotsClick}
          >
            <EllipsisVerticalIcon width={20} height={20} aria-label="more" />
            {openDropdownRowId === rowId &&
              dropdownCoords &&
              createPortal(
                (() => {
                  const dropdownWidth = 160;
                  const dropdownHeight = 240; // estimate, adjust as needed
                  const iconWidth = 20;
                  const viewportWidth = window.innerWidth;
                  const viewportHeight = window.innerHeight;
                  let left = dropdownCoords.left - dropdownWidth + iconWidth;
                  let top = dropdownCoords.top;
                  if (left < 8) left = 8;
                  if (left + dropdownWidth > viewportWidth)
                    left = viewportWidth - dropdownWidth - 8;
                  if (top + dropdownHeight > viewportHeight)
                    top = viewportHeight - dropdownHeight - 8;
                  return (
                    <div
                      className="options-dropdown"
                      onMouseLeave={handleMouseLeaveDropdown}
                      style={{
                        position: "fixed",
                        left,
                        top,
                        zIndex: 2147483647,
                        background: "#222",
                        color: "#fff",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                      }}
                    >
                      <OptionsDropDown
                        row={row}
                        handleMouseLeaveDropdown={handleMouseLeaveDropdown}
                        onEdit={onEdit}
                      />
                    </div>
                  );
                })(),
                document.body
              )}
          </span>
        </div>
        <DeleteModal
          isOpen={modalStore.isDeleteModalOpen}
          monitorName={modalStore.deleteMonitorName}
          onOk={handleDeleteOk}
          onCancel={handleDeleteCancel}
        />
      </>
    );
  }
);

export default TableActions;
