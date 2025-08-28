import { observable, computed, action, decorate } from "mobx";
import tableData from "../Data/tableData";
import { TableRowKeys } from "../constants/table";

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
  data: Array<Record<string, unknown>> = tableData;

  nameQuery: string = "";
  directoryQuery: string = "";
  ownerQuery: string = "";
  tradingPartnerQuery: string = "";
  lastRunQuery: string = "";

  sortColumn: string = "";
  sortDirection: 'asc' | 'desc' = 'asc';

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  get filteredData() {
    // Filtering
    let filtered = this.data.filter((row) => {
      const nameMatch =
        typeof row[TableRowKeys.name] === "string" &&
        (row[TableRowKeys.name] as string)
          .toLowerCase()
          .includes(this.nameQuery.toLowerCase());
      const dirMatch =
        typeof row[TableRowKeys.directory] === "string" &&
        (row[TableRowKeys.directory] as string)
          .toLowerCase()
          .includes(this.directoryQuery.toLowerCase());
      const ownerMatch =
        typeof row[TableRowKeys.owner] === "string" &&
        (row[TableRowKeys.owner] as string)
          .toLowerCase()
          .includes(this.ownerQuery.toLowerCase());
      const tradingPartnerMatch =
        typeof row[TableRowKeys.tradingPartner] === "string" &&
        (row[TableRowKeys.tradingPartner] as string)
          .toLowerCase()
          .includes(this.tradingPartnerQuery.toLowerCase());
      const lastRunMatch =
        typeof row[TableRowKeys.lastRun] === "string" &&
        (row[TableRowKeys.lastRun] as string)
          .toLowerCase()
          .includes(this.lastRunQuery.toLowerCase());
      return (
        nameMatch &&
        dirMatch &&
        ownerMatch &&
        tradingPartnerMatch &&
        lastRunMatch
      );
    });
    // Sorting
    if (this.sortColumn) {
      filtered = filtered.slice().sort((a, b) => {
        const aVal = a[this.sortColumn];
        const bVal = b[this.sortColumn];
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return this.sortDirection === 'asc' ? -1 : 1;
        if (bVal == null) return this.sortDirection === 'asc' ? 1 : -1;
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return this.sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
        return this.sortDirection === 'asc'
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }
    return filtered;
  }
  setSort = (col: string, direction: 'asc' | 'desc') => {
    this.sortColumn = col;
    this.sortDirection = direction;
    this.page = 1;
  };

  setPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
    }
  };

  addRow = (row: Record<string, unknown>) => {
    this.data.unshift(row);
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

  updateRow = (updatedRow: Record<string, unknown>) => {
    const idx = this.data.findIndex(
      (row) => row[TableRowKeys.name] === updatedRow[TableRowKeys.name]
    );
    if (idx !== -1) {
      this.data[idx] = { ...this.data[idx], ...updatedRow };
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
});

export const tableStore = new TableStore();
