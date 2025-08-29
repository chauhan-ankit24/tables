import { TableStore } from "./TableStore";
import { DropdownStore } from "./DropdownStore";
import { ModalStore } from "./ModalStore";
import { DirectoryMonitorModalUIStore } from "./DirectoryMonitorModalUIStore";

export class RootStore {
  tableStore: TableStore;
  dropdownStore: DropdownStore;
  modalStore: ModalStore;
  directoryMonitorModalUIStore: DirectoryMonitorModalUIStore;
  constructor() {
    this.tableStore = new TableStore();
    this.dropdownStore = new DropdownStore();
    this.modalStore = new ModalStore();
    this.directoryMonitorModalUIStore = new DirectoryMonitorModalUIStore();
  }
}

export const rootStore = new RootStore();
