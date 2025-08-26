import { observable, computed, action, decorate } from "mobx";
import tableData from "./tableData";

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
  data: Array<Record<string, any>> = tableData;

  get totalPages() {
    return Math.ceil(this.data.length / this.pageSize);
  }

  setPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
    }
  };

  addRow = (row: Record<string, any>) => {
    this.data.push(row);
  };
}

decorate(TableStore, {
  columns: observable,
  data: observable,
  page: observable,
  pageSize: observable,
  totalPages: computed,
  setPage: action,
  addRow: action,
});

export const tableStore = new TableStore();
