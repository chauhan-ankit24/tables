import React from "react";
import { observer } from "mobx-react";

// Stores and constants
import { tableStore } from "../../stores/TableStore";
import { modalStore } from "../../stores/ModalStore";
import { TableRowKeys } from "../../constants/table";

// Components
import DirectoryMonitorModal from "../DirectoryMonitorModal/DirectoryMonitorModal";
import TableAboveRow from "../TableAboveRow/TableAboveRow";
import TableRow from "../TableRow/TableRow";
import Pagination from "../Pagination/Pagination";

// Styles
import "./Table.css";

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

  // Memoize paginated data for performance
  const paginatedData = React.useMemo(
    () => filteredData.slice((page - 1) * pageSize, page * pageSize),
    [filteredData, page, pageSize]
  );

  // Handlers
  const handleEdit = (row: Record<string, unknown>) => {
    modalStore.resetModalData();
    modalStore.openDirectoryMonitorModal();
    modalStore.setModalData(row);
    modalStore.originalRowName = row[TableRowKeys.name] as string;
    modalStore.isAddMode = false;
    // Optionally remove console.log in production
    // console.log("Clicked row name:", modalStore.originalRowName);
  };

  const handleModalOk = () => {
    if (modalStore.isAddMode) {
      tableStore.data.unshift({ ...modalStore.modalData });
      tableStore.setNameQuery("");
      tableStore.setDirectoryQuery("");
      tableStore.setOwnerQuery("");
      tableStore.setTradingPartnerQuery("");
      tableStore.setLastRunQuery("");
      // console.log("Added Row:", modalStore.modalData);
    } else {
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
        // console.log("Updated Row:", modalStore.originalRowName, row);
      }
    }
    modalStore.closeDirectoryMonitorModal();
    modalStore.originalRowName = "";
    modalStore.setModalData({});
  };

  const handleModalCancel = () => {
    modalStore.closeDirectoryMonitorModal();
  };

  const handleFieldChange = (field: string, value: unknown) => {
    modalStore.setModalData({ [field]: value });
  };

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
          <TableRow
            key={idx + (page - 1) * pageSize}
            row={row}
            columns={columns}
            page={page}
            pageSize={pageSize}
            onEdit={handleEdit}
          />
        ))}
      </div>

      <DirectoryMonitorModal
        isOpen={modalStore.isDirectoryMonitorModalOpen}
        onClose={handleModalCancel}
        data={modalStore.modalData}
        onFieldChange={handleFieldChange}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      />
      <Pagination />
    </div>
  );
});

export default Table;
