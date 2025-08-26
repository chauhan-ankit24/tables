import { observable, computed, action, decorate } from "mobx";
import tableData from "../Data/tableData";

export class TableStore {
  page: number = 1;
  pageSize: number = 10;
  columns: string[] = [
    "Name",
    "Directory",
    "Interval",
    "Quota",
    "Owner",
    "Events",
    "Last Run",
    "Recursive",
    "Tags",
    "Trading Partner",
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
        typeof (row as { Name?: string }).Name === "string" &&
        (row as { Name: string }).Name.toLowerCase().includes(
          this.nameQuery.toLowerCase()
        );
      const dirMatch =
        typeof row.Directory === "string" &&
        row.Directory.toLowerCase().includes(this.directoryQuery.toLowerCase());
      const ownerMatch =
        typeof row.Owner === "string" &&
        row.Owner.toLowerCase().includes(this.ownerQuery.toLowerCase());
      const tradingPartnerMatch =
        typeof row["Trading Partner"] === "string" &&
        row["Trading Partner"]
          .toLowerCase()
          .includes(this.tradingPartnerQuery.toLowerCase());
      const lastRunMatch =
        typeof row["Last Run"] === "string" &&
        row["Last Run"].toLowerCase().includes(this.lastRunQuery.toLowerCase());
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
    this.data.push(row);
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
});

export const tableStore = new TableStore();
