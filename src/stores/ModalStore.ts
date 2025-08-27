import { observable, action, decorate } from "mobx";

class ModalStore {
  resetModalData = () => {
    this.originalRowName = "";
    Object.keys(this.modalData).forEach((key) => {
      // Set default values for each field
      switch (key) {
        case "name":
          (this.modalData as any)[key] = "";
          break;
        case "tradingPartner":
          (this.modalData as any)[key] = "test";
          break;
        case "directory":
          (this.modalData as any)[key] = "";
          break;
        case "monitorRecursively":
          (this.modalData as any)[key] = true;
          break;
        case "monitorInterval":
          (this.modalData as any)[key] = 600;
          break;
        case "latencyPeriod":
          (this.modalData as any)[key] = 5;
          break;
        case "owner":
          (this.modalData as any)[key] = "hari";
          break;
        case "enable":
          (this.modalData as any)[key] = true;
          break;
        case "quotaOf":
          (this.modalData as any)[key] = 100;
          break;
        case "monitorFileAdd":
          (this.modalData as any)[key] = true;
          break;
        case "monitorFileChange":
          (this.modalData as any)[key] = true;
          break;
        case "monitorFileDelete":
          (this.modalData as any)[key] = true;
          break;
        case "monitorFailure":
          (this.modalData as any)[key] = true;
          break;
        case "fileExceedsAge":
          (this.modalData as any)[key] = 1;
          break;
        case "fileExceedsAgeDays":
          (this.modalData as any)[key] = "day(s)";
          break;
        case "raiseEventIfMonitor":
          (this.modalData as any)[key] = 1;
          break;
        case "raiseEventIfMonitorDays":
          (this.modalData as any)[key] = "day(s)";
          break;
        case "raiseEventsOn":
          (this.modalData as any)[key] = "first";
          break;
        case "raiseEventsInstance":
          (this.modalData as any)[key] = "";
          break;
        case "tags":
          (this.modalData as any)[key] = ["Security", "API"];
          break;
        case "enableType":
          (this.modalData as any)[key] = "soft";
          break;
        case "quotaUnit":
          (this.modalData as any)[key] = "MiB";
          break;
        case "thirdOption":
          (this.modalData as any)[key] = "option1";
          break;
        default:
          (this.modalData as any)[key] = "";
      }
    });
  };
  isAddMode: boolean = false;
  originalRowName: string = "";
  modalData = observable.object({
    name: "",
    tradingPartner: "test",
    directory: "",
    monitorRecursively: true,
    monitorInterval: 600,
    latencyPeriod: 5,
    owner: "hari",
    enable: true,
    quotaOf: 100,
    monitorFileAdd: true,
    monitorFileChange: true,
    monitorFileDelete: true,
    monitorFailure: true,
    fileExceedsAge: 1,
    fileExceedsAgeDays: "day(s)",
    raiseEventIfMonitor: 1,
    raiseEventIfMonitorDays: "day(s)",
    raiseEventsOn: "first",
    raiseEventsInstance: "",
    tags: ["Security", "API"],
    enableType: "soft",
    quotaUnit: "MiB",
    thirdOption: "option1",
  });

  setModalData = (data: Partial<typeof this.modalData>) => {
    Object.keys(data).forEach((key) => {
      (this.modalData as any)[key] = data[key as keyof typeof data];
    });
  };
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
