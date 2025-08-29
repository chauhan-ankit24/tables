import { observable, action, decorate } from "mobx";
import { getDefaultModalData } from "../utils/modalUtils";


class ModalStore {
  public isAddMode: boolean = false;
  public selectedRowId: string = "";
  public isDirectoryMonitorModalOpen: boolean = false;
  public isDeleteModalOpen: boolean = false;
  public deleteMonitorName: string = "";
  public deleteMonitorId: string = "";
  public modalData = observable.object(getDefaultModalData());

  public resetModalData = () => {
    this.selectedRowId = "";
    const defaults = getDefaultModalData();
    Object.keys(defaults).forEach((key) => {
      (this.modalData as any)[key] = (defaults as any)[key];
    });
  };

  public setModalData = (
    data: Partial<typeof this.modalData> & {
      selectedRowId?: string;
      id?: string;
    }
  ) => {
    if (data.selectedRowId !== undefined) {
      this.selectedRowId = data.selectedRowId;
    } else if (data.id !== undefined) {
      this.selectedRowId = data.id;
    }
    Object.keys(data).forEach((key) => {
      if (key !== "selectedRowId" && key !== "id") {
        (this.modalData as any)[key] = data[key as keyof typeof data];
      }
    });
  };

  public openDirectoryMonitorModal = () => {
    this.isDirectoryMonitorModalOpen = true;
  };

  public closeDirectoryMonitorModal = () => {
    this.isDirectoryMonitorModalOpen = false;
  };

  public openDeleteModal = (monitorName: string, monitorId: string) => {
    this.isDeleteModalOpen = true;
    this.deleteMonitorName = monitorName;
    this.deleteMonitorId = monitorId;
  };

  public closeDeleteModal = () => {
    this.isDeleteModalOpen = false;
    this.deleteMonitorName = "";
    this.deleteMonitorId = "";
  };
}

decorate(ModalStore, {
  isDirectoryMonitorModalOpen: observable,
  isDeleteModalOpen: observable,
  deleteMonitorName: observable,
  deleteMonitorId: observable,
  openDirectoryMonitorModal: action,
  closeDirectoryMonitorModal: action,
  openDeleteModal: action,
  closeDeleteModal: action,
});

export const modalStore = new ModalStore();
