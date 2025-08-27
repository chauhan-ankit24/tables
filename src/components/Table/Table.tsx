import React from "react";
import DirectoryMonitorModal from "../DirectoryMonitorModal/DirectoryMonitorModal";
import { observer } from "mobx-react";
import { tableStore } from "../../stores/TableStore";
import { TableRowKeys } from "../../constants/table";
import { modalStore } from "../../stores/ModalStore";
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
                <button
                  className="table-action-btn"
                  onClick={() => {
                    modalStore.resetModalData();
                    modalStore.openDirectoryMonitorModal();
                    modalStore.setModalData(row);
                    modalStore.originalRowName = row[
                      TableRowKeys.name
                    ] as string;
                    modalStore.isAddMode = false;
                    console.log(
                      "Clicked row name:",
                      modalStore.originalRowName
                    );
                  }}
                >
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
            </div>
          </div>
        ))}
      </div>

      <DirectoryMonitorModal
        isOpen={modalStore.isDirectoryMonitorModalOpen}
        onClose={() => {
          modalStore.closeDirectoryMonitorModal();
        }}
        data={modalStore.modalData}
        onFieldChange={(field, value) => {
          modalStore.setModalData({ [field]: value });
        }}
        onOk={() => {
          if (modalStore.isAddMode) {
            // Add new row at the top
            tableStore.data.unshift({ ...modalStore.modalData });
            // Reset all filters so new row is visible
            tableStore.setNameQuery("");
            tableStore.setDirectoryQuery("");
            tableStore.setOwnerQuery("");
            tableStore.setTradingPartnerQuery("");
            tableStore.setLastRunQuery("");
            console.log("Added Row:", modalStore.modalData);
          } else {
            // Only update keys present in the table row
            const rowIdx = tableStore.data.findIndex(
              (row) => row[TableRowKeys.name] === modalStore.originalRowName
            );
            if (rowIdx !== -1) {
              const row = tableStore.data[rowIdx];
              Object.keys(row).forEach((key) => {
                if (key in modalStore.modalData) {
                  (row as any)[key] = (modalStore.modalData as any)[key];
                }
              });
              modalStore.originalRowName = "";
              console.log("Updated Row:", modalStore.originalRowName, row);
            }
          }
          modalStore.closeDirectoryMonitorModal();
          modalStore.originalRowName = "";
          modalStore.setModalData({});
        }}
        onCancel={() => {
          modalStore.closeDirectoryMonitorModal();
        }}
      />
      <Pagination />
    </div>
  );
});

export default Table;
