import React from "react";
import { TableRowKeys } from "../../constants/table";
import "./TableRow.css";
import TableActions from "../TableActions/TableActions";

export interface TableRowProps {
  row: Record<string, unknown>;
  columns: string[];
  page: number;
  pageSize: number;
  onEdit: (row: Record<string, unknown>) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  row,
  columns,
  page,
  pageSize,
  onEdit,
}) => {
  return (
    <div className="table-row" key={row[TableRowKeys.name] as string}>
      {columns.map((col, colIdx) => {
        const cellValue = Array.isArray(row[col])
          ? (row[col] as string[]).join(", ")
          : row[col];
        return (
          <div
            className={`table-cell col-${colIdx}`}
            key={col}
            title={cellValue ? String(cellValue) : ""}
          >
            {cellValue}
          </div>
        );
      })}
      <div className="table-cell col-10">
        <TableActions onEdit={() => onEdit(row)} />
      </div>
    </div>
  );
};

export default TableRow;
