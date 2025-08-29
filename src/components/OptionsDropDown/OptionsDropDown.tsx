import "./OptionsDropDown.scss";

import React from "react";
import {
  DropdownOptionEnum,
  DROPDOWN_OPTIONS,
  DropdownOption,
} from "../../constants/dropdown";
import { observer } from "mobx-react";
import { modalStore } from "../../stores/ModalStore";
import DeleteModal from "../DeleteModal/DeleteModal";
import { dropdownStore } from "../../stores/DropdownStore";

interface OptionsDropDownProps {
  row?: Record<string, unknown>;
  handleMouseLeaveDropdown?: () => void;
  onEdit?: () => void;
  setOpenDropdownRowId?: (rowId: string | null) => void;
}


const OptionsDropDown: React.FC<OptionsDropDownProps> = observer(({ row, handleMouseLeaveDropdown, onEdit, setOpenDropdownRowId }) => {
  const { tableStore } = require("../../stores/TableStore");
  const options = DROPDOWN_OPTIONS;

  const handleOptionClick = (option: DropdownOption) => {
    if (option.divider) return;
    if (setOpenDropdownRowId) setOpenDropdownRowId(null);
    dropdownStore.closeOptions();
    switch (option.value) {
      case DropdownOptionEnum.Edit:
        if (onEdit) onEdit();
        break;
      case DropdownOptionEnum.Delete:
        modalStore.openDeleteModal(row?.name as string || "", row?.id as string || "");
        break;
      case DropdownOptionEnum.Run:
        // Implement run logic here
        break;
      case DropdownOptionEnum.Events:
        // Implement events logic here
        break;
      case DropdownOptionEnum.ViewTriggers:
        // Implement view triggers logic here
        break;
      default:
        break;
    }
  };

  const handleDeleteOk = async () => {
    if (modalStore.deleteMonitorId) {
      await tableStore.deleteRow(modalStore.deleteMonitorId);
    }
    modalStore.closeDeleteModal();
    dropdownStore.closeOptions();
    if (setOpenDropdownRowId) setOpenDropdownRowId(null);
  };

  const handleDeleteCancel = () => {
    modalStore.closeDeleteModal();
    dropdownStore.closeOptions();
    if (setOpenDropdownRowId) setOpenDropdownRowId(null);
  };

  return (
    <>
      <div
        className="options-dropdown-outer"
        role="menu"
        onMouseLeave={handleMouseLeaveDropdown}
      >
        <ul className="options-dropdown-list">
          {options.map((option, idx) =>
            option.divider ? (
              <li key={idx} className="dropdown-divider" />
            ) : (
              <li
                key={option.value}
                className="options-dropdown-item"
                role="menuitem"
                tabIndex={0}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
});

export default OptionsDropDown;
