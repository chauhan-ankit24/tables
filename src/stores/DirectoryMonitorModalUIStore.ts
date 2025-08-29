import { observable, action, decorate } from "mobx";

export class DirectoryMonitorModalUIStore {
  showTagDropdown = false;

  setShowTagDropdown = (value: boolean) => {
    this.showTagDropdown = value;
  };

  toggleTagDropdown = () => {
    this.showTagDropdown = !this.showTagDropdown;
  };
}

decorate(DirectoryMonitorModalUIStore, {
  showTagDropdown: observable,
  setShowTagDropdown: action,
  toggleTagDropdown: action,
});

export const directoryMonitorModalUIStore = new DirectoryMonitorModalUIStore();
