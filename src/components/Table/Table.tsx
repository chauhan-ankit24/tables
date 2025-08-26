import React from "react";
import { observer } from "mobx-react";
import { tableStore } from "../../stores/TableStore";
import Pagination from "../Pagination/Pagination";
import "./Table.css";
import TableAboveRow from "../TableAboveRow/TableAboveRow";

export interface TableProps {
  columns: string[];
  data: Array<Record<string, unknown>>;
}

const Table: React.FC<TableProps> = observer(({ columns }) => {
  const {
    page,
    pageSize,
    nameQuery,
    directoryQuery,
    ownerQuery,
    tradingPartnerQuery,
    lastRunQuery,
    setNameQuery,
    setDirectoryQuery,
    setOwnerQuery,
    setTradingPartnerQuery,
    setLastRunQuery,
    filteredData,
  } = tableStore;
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="table-flex">
      <TableAboveRow
        columns={columns}
        nameQuery={nameQuery}
        directoryQuery={directoryQuery}
        ownerQuery={ownerQuery}
        tradingPartnerQuery={tradingPartnerQuery}
        lastRunQuery={lastRunQuery}
        setNameQuery={setNameQuery}
        setDirectoryQuery={setDirectoryQuery}
        setOwnerQuery={setOwnerQuery}
        setTradingPartnerQuery={setTradingPartnerQuery}
        setLastRunQuery={setLastRunQuery}
      />
      <div className="table-scroll">
        {paginatedData.map((row, idx) => (
          <div className="table-row" key={idx + (page - 1) * pageSize}>
            {columns.map((col, colIdx) => (
              <div className={`table-cell col-${colIdx}`} key={col}>
                {row[col]}
              </div>
            ))}
            {/* 11th cell for actions */}
            <div className="table-cell col-10">
              <div className="table-row-actions">
                <button className="table-action-btn">View Triggers</button>
                <button className="table-action-btn">Run</button>
                <button className="table-action-btn">Edit</button>
                <span className="table-action-dots">
                  <img
                    src={process.env.PUBLIC_URL + "/dots-vertical.svg"}
                    alt="more"
                    width={20}
                    height={20}
                  />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination />
    </div>
  );
});

export default Table;
