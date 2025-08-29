import React from "react";
import { TagDropdown } from "../TagDropdown/TagDropdown";
import { useStores } from "../../hooks/useStores";
import { observer } from "mobx-react";
import CustomCheckbox from "./CustomCheckbox";
import "./DirectoryMonitorModal.scss";

interface DirectoryMonitorProps {
  onClose?: () => void;
  onOk?: () => void;
  onCancel?: () => void;
  isOpen?: boolean;
  data: DirectoryMonitorData;
  onFieldChange: (field: keyof DirectoryMonitorData, value: any) => void;
}

export interface DirectoryMonitorData {
  name: string;
  tradingPartner: string;
  directory: string;
  monitorRecursively: boolean;
  monitorInterval: number;
  latencyPeriod: number;
  owner: string;
  enable: boolean;
  quotaOf: number;
  monitorFileAdd: boolean;
  monitorFileChange: boolean;
  monitorFileDelete: boolean;
  monitorFailure: boolean;
  fileExceedsAge: number;
  fileExceedsAgeDays: string;
  raiseEventIfMonitor: number;
  raiseEventIfMonitorDays: string;
  raiseEventsOn: string;
  raiseEventsInstance: string;
  tags: string[];
  enableType?: string;
  quotaUnit?: string;
  thirdOption?: string;
}

const DirectoryMonitor: React.FC<DirectoryMonitorProps> = ({
  onClose,
  onOk,
  onCancel,
  isOpen = true,
  data,
  onFieldChange,
}) => {
  const { modalStore, directoryMonitorModalUIStore } = useStores();
  const handleInputChange = (field: keyof DirectoryMonitorData, value: any) => {
    onFieldChange(field, value);
  };
  const handleCheckboxChange = (field: keyof DirectoryMonitorData) => {
    onFieldChange(field, !data[field]);
  };
  const handleOk = () => {
    onOk?.();
  };
  const handleCancel = () => {
    onCancel?.();
  };
  const hiddenDirInputRef = React.useRef<HTMLInputElement>(null);

  const handleTagSelect = (tag: string) => {
    if (!data.tags.includes(tag)) {
      handleInputChange("tags", [...data.tags, tag]);
    }
    directoryMonitorModalUIStore.setShowTagDropdown(false);
  };

  if (!isOpen) return null;
  return (
    <div className="directory-monitor-overlay">
      <div className="directory-monitor-dialog">
        <div className="dialog-header">
          <h3>Add Directory Monitor</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="dialog-content">
          <p className="dialog-description">
            Setup directory monitor parameters.
          </p>

          {/* Basic Section */}
          <div className="section">
            <h4>Basic</h4>

            <div className="form-group">
              <label htmlFor="name">
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  value={data.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="trading-partner">Use trading partner</label>
              <div className="input-wrapper input-flex">
                <CustomCheckbox
                  checked={true}
                  onChange={() => {}}
                  id="use-trading-partner-check"
                />
                <select
                  id="trading-partner"
                  value={data.tradingPartner}
                  onChange={(e) =>
                    handleInputChange("tradingPartner", e.target.value)
                  }
                  className="form-input"
                >
                  <option value="test">test</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="directory">
                Directory <span style={{ color: "red" }}>*</span>
              </label>
              <div className="input-wrapper">
                <div className="input-with-button">
                  <input
                    type="text"
                    id="directory"
                    value={data.directory}
                    onChange={(e) =>
                      handleInputChange("directory", e.target.value)
                    }
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="browse-button"
                    onClick={() => {
                      if (hiddenDirInputRef.current)
                        hiddenDirInputRef.current.click();
                    }}
                  >
                    Browse
                  </button>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={hiddenDirInputRef}
                    // @ts-ignore
                    webkitdirectory="true"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        const fullPath =
                          (files[0] as any).webkitRelativePath || files[0].name;
                        const dirPath = fullPath.includes("/")
                          ? fullPath.split("/")[0]
                          : fullPath;
                        handleInputChange("directory", dirPath);
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group checkbox-group">
              <div className="input-wrapper input-flex">
                <label htmlFor="monitor-recursively">Monitor recursively</label>
                <CustomCheckbox
                  checked={data.monitorRecursively}
                  onChange={() => handleCheckboxChange("monitorRecursively")}
                  id="monitor-recursively"
                />
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="section">
            <h4>Settings</h4>

            <div className="form-group checkbox-inline">
              <label htmlFor="monitor-interval">Monitor interval</label>
              <CustomCheckbox
                checked={true}
                onChange={() => {}}
                id="monitor-interval-check"
              />
              <input
                type="number"
                id="monitor-interval"
                value={data.monitorInterval}
                onChange={(e) =>
                  handleInputChange("monitorInterval", parseInt(e.target.value))
                }
                className="form-input-small"
              />
              <span className="unit-label">sec</span>
            </div>

            <div className="form-group checkbox-inline">
              <label htmlFor="latency-period">Latency period</label>
              <CustomCheckbox
                checked={true}
                onChange={() => {}}
                id="latency-period-check"
              />
              <input
                type="number"
                id="latency-period"
                value={data.latencyPeriod}
                onChange={(e) =>
                  handleInputChange("latencyPeriod", parseInt(e.target.value))
                }
                className="form-input-small"
              />
              <span className="unit-label">sec</span>
            </div>

            <div className="form-group checkbox-inline">
              <label htmlFor="owner">Owner</label>
              <div className="input-wrapper input-flex">
                <CustomCheckbox
                  checked={true}
                  onChange={() => {}}
                  id="use-trading-partner-check"
                />
                <select
                  id="owner"
                  value={data.owner}
                  onChange={(e) => handleInputChange("owner", e.target.value)}
                  className="form-select"
                >
                  <option value="hari">hari</option>
                  <option value="ankit">ankit</option>
                  <option value="admin">admin</option>
                </select>
              </div>
            </div>

            <div className="form-group checkbox-inline">
              <label htmlFor="enable">Enable</label>
              <div className="input-wrapper input-flex">
                <CustomCheckbox
                  checked={data.enable}
                  onChange={() => handleCheckboxChange("enable")}
                  id="enable-check"
                />
                <select
                  id="enable-type"
                  value={data.enableType || "soft"}
                  onChange={(e) =>
                    handleInputChange("enableType", e.target.value)
                  }
                  className="form-select"
                >
                  <option value="soft">Soft</option>
                  <option value="hard">Hard</option>
                  <option value="none">None</option>
                </select>
                <span className="quota-of-text">quota of</span>
                <select
                  id="quota-unit"
                  value={data.quotaUnit || "MiB"}
                  onChange={(e) =>
                    handleInputChange("quotaUnit", e.target.value)
                  }
                  className="form-select"
                >
                  <option value="MiB">MiB</option>
                  <option value="GiB">GiB</option>
                </select>
                <select
                  id="third-option"
                  value={data.thirdOption || "option1"}
                  onChange={(e) =>
                    handleInputChange("thirdOption", e.target.value)
                  }
                  className="form-select"
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="section">
            <h4>Events</h4>

            <div className="form-group checkbox-group">
              <label htmlFor="monitor-file-add">Monitor file add</label>
              <CustomCheckbox
                checked={data.monitorFileAdd}
                onChange={() => handleCheckboxChange("monitorFileAdd")}
                id="monitor-file-add"
              />
            </div>

            <div className="form-group checkbox-group">
              <label htmlFor="monitor-file-change">Monitor file change</label>
              <CustomCheckbox
                checked={data.monitorFileChange}
                onChange={() => handleCheckboxChange("monitorFileChange")}
                id="monitor-file-change"
              />
            </div>

            <div className="form-group checkbox-group">
              <label htmlFor="monitor-file-delete">Monitor file delete</label>
              <CustomCheckbox
                checked={data.monitorFileDelete}
                onChange={() => handleCheckboxChange("monitorFileDelete")}
                id="monitor-file-delete"
              />
            </div>

            <div className="form-group checkbox-group">
              <label htmlFor="monitor-failure">Monitor failure</label>
              <CustomCheckbox
                checked={data.monitorFailure}
                onChange={() => handleCheckboxChange("monitorFailure")}
                id="monitor-failure"
              />
            </div>

            <div className="form-group checkbox-inline">
              <label htmlFor="file-exceeds-age">File exceeds age of</label>
              <CustomCheckbox
                checked={true}
                onChange={() => {}}
                id="file-exceeds-age-check"
              />
              <input
                type="number"
                id="file-exceeds-age"
                value={data.fileExceedsAge}
                onChange={(e) =>
                  handleInputChange("fileExceedsAge", parseInt(e.target.value))
                }
                className="form-input-small"
              />
              <select
                value={data.fileExceedsAgeDays}
                onChange={(e) =>
                  handleInputChange("fileExceedsAgeDays", e.target.value)
                }
                className="form-select-small"
              >
                <option value="day(s)">day(s)</option>
                <option value="hour(s)">hour(s)</option>
                <option value="minute(s)">minute(s)</option>
              </select>
            </div>

            <div className="form-group checkbox-inline">
              <label htmlFor="raise-event">Raise an event if monitor...</label>
              <CustomCheckbox
                checked={true}
                onChange={() => {}}
                id="raise-event-check"
              />
              <input
                type="number"
                value={data.raiseEventIfMonitor}
                onChange={(e) =>
                  handleInputChange(
                    "raiseEventIfMonitor",
                    parseInt(e.target.value)
                  )
                }
                className="form-input-small"
              />
              <select
                value={data.raiseEventIfMonitorDays}
                onChange={(e) =>
                  handleInputChange("raiseEventIfMonitorDays", e.target.value)
                }
                className="form-select-small"
              >
                <option value="day(s)">day(s)</option>
                <option value="hour(s)">hour(s)</option>
                <option value="minute(s)">minute(s)</option>
              </select>
            </div>

            <div className="form-group inline-group">
              <label htmlFor="raise-events-on">Raise events on</label>
              <select
                id="raise-events-on"
                value={data.raiseEventsOn}
                onChange={(e) =>
                  handleInputChange("raiseEventsOn", e.target.value)
                }
                className="form-select"
              >
                <option value="first">first</option>
                <option value="all">all</option>
              </select>
              <label htmlFor="raiseEventsInstance" className="instance-label">
                instance (s)
              </label>
            </div>
          </div>

          {/* Tags Section */}
          <div className="section">
            <h4>Tags</h4>
            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <div className="tags-container">
                <TagDropdown
                  tags={data.tags}
                  onTagsChange={(tags) => handleInputChange("tags", tags)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="dialog-footer">
          <button className="btn btn-primary" onClick={handleOk}>
            {modalStore.isAddMode ? "OK" : "Update"}
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(DirectoryMonitor);
