import { observable, action, decorate } from "mobx";


export class DropdownStore {
  isOptionsOpen = false;
  openRowId: string | null = null;

  openOptions = () => {
    this.isOptionsOpen = true;
  };

  closeOptions = () => {
    this.isOptionsOpen = false;
    this.openRowId = null;
  };

  toggleOptions = () => {
    this.isOptionsOpen = !this.isOptionsOpen;
  };

  setOpenRowId = (rowId: string | null) => {
    this.openRowId = rowId;
    this.isOptionsOpen = !!rowId;
  };
}

decorate(DropdownStore, {
  isOptionsOpen: observable,
  openRowId: observable,
  openOptions: action,
  closeOptions: action,
  toggleOptions: action,
  setOpenRowId: action,
});

export const dropdownStore = new DropdownStore();
