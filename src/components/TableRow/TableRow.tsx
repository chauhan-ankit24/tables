import React from "react";
import { TableRowKeys } from "../../constants/table";
import "./TableRow.css";
import "../TableCellWidths.css";
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
    <tr key={row[TableRowKeys.name] as string} className="table-row">
      {columns.map((col, colIdx) => {
        let cellValue;
        if (col === "recursive") {
          const val = row["monitorRecursively"];
          cellValue = typeof val === "boolean" ? String(val) : "";
        } else {
          cellValue = Array.isArray(row[col])
            ? (row[col] as string[]).join(", ")
            : row[col];
        }
        return (
          <td
            className={` table-cell-width-${colIdx} table-cell`}
            key={col}
            title={cellValue ? String(cellValue) : ""}
            style={colIdx === 0 ? { color: "#047E90" } : {}}
          >
            {cellValue}
          </td>
        );
      })}
      <td className="table-cell-width-spacer">
        <TableActions onEdit={() => onEdit(row)} />
      </td>
    </tr>
  );
};

export default TableRow;
