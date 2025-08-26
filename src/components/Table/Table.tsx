import React from "react";
import "./Table.css";
import TableAboveRow from "../TableAboveRow/TableAboveRow";

export interface TableProps {
  columns: string[];
  data: Array<Record<string, any>>;
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="table-flex">
      <TableAboveRow columns={columns} />
      {data.map((row, idx) => (
        <div className="table-row" key={idx}>
          {columns.map((col, colIdx) => (
            <div className={`table-cell col-${colIdx}`} key={col}>
              {row[col]}
            </div>
          ))}
          <div className="table-row-actions">
            <button className="table-action-btn">View Triggers</button>
            <button className="table-action-btn">Run</button>
            <button className="table-action-btn">Edit</button>
            <span className="table-action-dots">
              <img src={process.env.PUBLIC_URL + "/dots-vertical.svg"} alt="more" width={20} height={20} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
