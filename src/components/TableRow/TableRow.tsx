import React from "react";
import { TableRowKeys } from "../../constants/table";
import "./TableRow.scss";
import "../TableCellWidths.scss";
import TableActions from "../TableActions/TableActions";

export interface TableRowProps {
  row: import("../../constants/table").DirectoryMonitorRow;
  columns: string[];
  page: number;
  pageSize: number;
  onEdit: (row: import("../../constants/table").DirectoryMonitorRow) => void;
  openDropdownRowId?: string;
  setOpenDropdownRowId?: (rowId: string | null) => void;
}


const TableRow: React.FC<TableRowProps> = ({
  row,
  columns,
  page,
  pageSize,
  onEdit,
  openDropdownRowId,
  setOpenDropdownRowId
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
        <TableActions
          onEdit={() => onEdit(row)}
          rowId={row[TableRowKeys.name] as string}
          row={row}
          openDropdownRowId={openDropdownRowId}
          setOpenDropdownRowId={setOpenDropdownRowId}
        />
      </td>
    </tr>
  );
};

export default TableRow;
