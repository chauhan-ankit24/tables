import { observable, computed, action, decorate } from "mobx";
import tableData from "../Data/tableData";
import { TableRowKeys } from "../constants/table";

export class TableStore {
  page: number = 1;
  pageSize: number = 10;
  columns: string[] = [
    TableRowKeys.name,
    TableRowKeys.directory,
    TableRowKeys.interval,
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

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  get filteredData() {
    return this.data.filter((row) => {
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
  }

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
  filteredData: computed,
  setPage: action,
  addRow: action,
  setNameQuery: action,
  setDirectoryQuery: action,
  setOwnerQuery: action,
  setTradingPartnerQuery: action,
  setLastRunQuery: action,
  updateRow: action,
});

export const tableStore = new TableStore();
