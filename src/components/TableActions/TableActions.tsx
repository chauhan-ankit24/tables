import React from "react";
import "./TableActions.css";

export interface TableActionsProps {
  onEdit: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({ onEdit }) => (
  <div className="table-row-actions">
    <button className="table-action-btn">View Triggers</button>
    <button className="table-action-btn">Run</button>
    <button className="table-action-btn" onClick={onEdit}>
      Edit
    </button>
    <span className="table-action-dots">
      <img
        src={process.env.PUBLIC_URL + "/dots-vertical.svg"}
        alt="more"
        width={20}
        height={20}
      />
    </span>
  </div>
);

export default TableActions;
