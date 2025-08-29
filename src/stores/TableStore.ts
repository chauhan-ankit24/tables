import { observable, computed, action, decorate, flow } from "mobx";
import { TableRowKeys } from "../constants/table";
import { filterTableData, sortTableData } from "../utils/tableUtils";
import type { DirectoryMonitorRow } from "../constants/table";

export class TableStore {
  page: number = 1;
  pageSize: number = 10;
  columns: string[] = [
    TableRowKeys.name,
    TableRowKeys.directory,
    TableRowKeys.monitorInterval,
    TableRowKeys.quota,
    TableRowKeys.owner,
    TableRowKeys.events,
    TableRowKeys.lastRun,
    TableRowKeys.recursive,
    TableRowKeys.tags,
    TableRowKeys.tradingPartner,
  ];
  data: DirectoryMonitorRow[] = [];
  sortColumn: string = "";
  sortDirection: "asc" | "desc" = "asc";
  nameQuery: string = "";
  directoryQuery: string = "";
  ownerQuery: string = "";
  tradingPartnerQuery: string = "";
  lastRunQuery: string = "";

  constructor() {
    this.fetchData();
  }

  get filteredData() {
    let filtered = filterTableData(this.data, {
      nameQuery: this.nameQuery,
      directoryQuery: this.directoryQuery,
      ownerQuery: this.ownerQuery,
      tradingPartnerQuery: this.tradingPartnerQuery,
      lastRunQuery: this.lastRunQuery,
    });
    filtered = sortTableData(filtered, this.sortColumn, this.sortDirection);
    return filtered;
  }

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  setSort = (col: string, direction: "asc" | "desc") => {
    this.sortColumn = col;
    this.sortDirection = direction;
    this.page = 1;
  };

  setPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
    }
  };

  setNameQuery = (q: string) => {
    this.nameQuery = q;
    this.page = 1;
  };

  setDirectoryQuery = (q: string) => {
    this.directoryQuery = q;
    this.page = 1;
  };

  setOwnerQuery = (q: string) => {
    this.ownerQuery = q;
    this.page = 1;
  };

  setTradingPartnerQuery = (q: string) => {
    this.tradingPartnerQuery = q;
    this.page = 1;
  };

  setLastRunQuery = (q: string) => {
    this.lastRunQuery = q;
    this.page = 1;
  };

  fetchData = flow(function* (this: TableStore) {
    try {
      const { getTests } = yield import("../services/api");
      const result = yield getTests();
      this.data = result;
    } catch (err) {
      console.error("Failed to fetch table data", err);
    }
  });

  addRow = async (row: DirectoryMonitorRow) => {
    try {
      const { addTest } = await import("../services/api");
      await addTest(row);
      await this.fetchData();
    } catch (err) {
      console.error("Add row failed", err);
    }
  };

  updateRow = (updatedRow: DirectoryMonitorRow) => {
    const idx = this.data.findIndex((row) => row.id === updatedRow.id);
    if (idx !== -1) {
      this.data[idx] = { ...this.data[idx], ...updatedRow };
    }
    import("../services/api").then(({ updateTest }) => {
      updateTest(updatedRow.id, updatedRow).then(() => {
        this.fetchData();
      });
    });
  };

  deleteRow = async (id: string) => {
    try {
      const { deleteTest } = await import("../services/api");
      await deleteTest(id);
      this.data = this.data.filter((row) => row["id"] !== id);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };
}

decorate(TableStore, {
  columns: observable,
  data: observable,
  page: observable,
  pageSize: observable,
  totalPages: computed,
  nameQuery: observable,
  directoryQuery: observable,
  ownerQuery: observable,
  tradingPartnerQuery: observable,
  lastRunQuery: observable,
  sortColumn: observable,
  sortDirection: observable,
  filteredData: computed,
  setPage: action,
  addRow: action,
  setNameQuery: action,
  setDirectoryQuery: action,
  setOwnerQuery: action,
  setTradingPartnerQuery: action,
  setLastRunQuery: action,
  setSort: action,
  updateRow: action,
  deleteRow: action,
});

export const tableStore = new TableStore();
