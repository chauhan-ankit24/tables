import { observable, action, decorate } from 'mobx';

class ModalStore {
  isDirectoryMonitorModalOpen = false;

  openDirectoryMonitorModal = () => {
    this.isDirectoryMonitorModalOpen = true;
  };

  closeDirectoryMonitorModal = () => {
    this.isDirectoryMonitorModalOpen = false;
  };
}

decorate(ModalStore, {
  isDirectoryMonitorModalOpen: observable,
  openDirectoryMonitorModal: action,
  closeDirectoryMonitorModal: action,
});

export const modalStore = new ModalStore();
