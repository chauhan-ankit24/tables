import React from "react";
import { observer } from "mobx-react";

// Components
import DirectoryMonitorModal from "../DirectoryMonitorModal/DirectoryMonitorModal";
import TableAboveRow from "../TableAboveRow/TableAboveRow";
import TableRow from "../TableRow/TableRow";
import Pagination from "../Pagination/Pagination";

// Styles
import "./Table.scss";
import { useStores } from "../../hooks/useStores";
import { DirectoryMonitorRow } from "../../constants/table";

const Table: React.FC = observer(() => {
  const { tableStore, modalStore, dropdownStore } = useStores();

  const {
    columns,
    data,
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
    sortColumn,
    sortDirection,
    setSort,
  } = tableStore;

  // Use MobX dropdownStore for dropdown state

  // Memoize paginated data for performance
  const paginatedData = React.useMemo(
    () => filteredData.slice((page - 1) * pageSize, page * pageSize),
    [filteredData, page, pageSize]
  );

  // Handlers
  const handleEdit = (row: DirectoryMonitorRow) => {
    modalStore.resetModalData();
    modalStore.openDirectoryMonitorModal();
    // Convert tags to array if needed
    const safeRow = {
      ...row,
      tags: Array.isArray(row.tags) ? row.tags : [row.tags],
    };
    modalStore.setModalData(safeRow as Partial<typeof modalStore.modalData>);
    modalStore.selectedRowId = row.id as string;
    modalStore.isAddMode = false;
    // Optionally remove console.log in production
    // console.log("Clicked row id:", modalStore.selectedRowId);
  };

  const handleModalOk = () => {
    if (modalStore.isAddMode) {
      // Ensure tags is array and id is set
      const { raiseEventsOn, ...rest } = modalStore.modalData;
      const newRow: DirectoryMonitorRow = {
        ...rest,
        tags: Array.isArray(modalStore.modalData.tags)
          ? (modalStore.modalData.tags as any)
          : [modalStore.modalData.tags],
        id: String(Date.now()),
        recursive: "",
        events: raiseEventsOn,
        lastRun: new Date().toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };
      tableStore.addRow(newRow).then(() => {
        // tableStore.setNameQuery("");
        // tableStore.setDirectoryQuery("");
        // tableStore.setOwnerQuery("");
        // tableStore.setTradingPartnerQuery("");
        // tableStore.setLastRunQuery("");
      });
    } else {
      // Use store method for update
      const { raiseEventsOn, ...rest } = modalStore.modalData;
      const updatedRow: DirectoryMonitorRow = {
        ...rest,
        tags: Array.isArray(modalStore.modalData.tags)
          ? (modalStore.modalData.tags as any)
          : [modalStore.modalData.tags],
        id: modalStore.selectedRowId,
        recursive: "",
        events: raiseEventsOn,
        lastRun: new Date().toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };
      tableStore.updateRow(updatedRow);
      // tableStore.setNameQuery("");
      // tableStore.setDirectoryQuery("");
      // tableStore.setOwnerQuery("");
      // tableStore.setTradingPartnerQuery("");
      // tableStore.setLastRunQuery("");
    }
    modalStore.closeDirectoryMonitorModal();
    modalStore.selectedRowId = "";
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
        onSort={tableStore.setSort}
        sortColumn={tableStore.sortColumn}
        sortDirection={tableStore.sortDirection}
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
            openDropdownRowId={dropdownStore.openRowId ?? undefined}
            setOpenDropdownRowId={dropdownStore.setOpenRowId}
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
