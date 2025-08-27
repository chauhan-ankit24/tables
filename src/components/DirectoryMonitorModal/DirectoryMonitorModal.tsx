import React, { useState } from "react";
import CustomCheckbox from "./CustomCheckbox";
import "./DirectoryMonitorModal.css";

interface DirectoryMonitorProps {
  onClose?: () => void;
  onOk?: (data: DirectoryMonitorData) => void;
  onCancel?: () => void;
  isOpen?: boolean;
}

interface DirectoryMonitorData {
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
}) => {
  const [formData, setFormData] = useState<DirectoryMonitorData>({
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

  const handleInputChange = (field: keyof DirectoryMonitorData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field: keyof DirectoryMonitorData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleOk = () => {
    onOk?.(formData);
  };

  const handleCancel = () => {
    onCancel?.();
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
              <label htmlFor="name">Name *</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
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
                  // type="text"
                  id="trading-partner"
                  value={formData.tradingPartner}
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
              <label htmlFor="directory">Directory *</label>
              <div className="input-wrapper">
                <div className="input-with-button">
                  <input
                    type="text"
                    id="directory"
                    value={formData.directory}
                    onChange={(e) =>
                      handleInputChange("directory", e.target.value)
                    }
                    className="form-input"
                  />
                  <button type="button" className="browse-button">
                    Browse
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group checkbox-group">
              <div className="input-wrapper input-flex">
                <label htmlFor="monitor-recursively">Monitor recursively</label>
                <CustomCheckbox
                  checked={formData.monitorRecursively}
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
                value={formData.monitorInterval}
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
                value={formData.latencyPeriod}
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
                  value={formData.owner}
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
                  checked={formData.enable}
                  onChange={() => handleCheckboxChange("enable")}
                  id="enable-check"
                />
                <select
                  id="enable-type"
                  value={formData.enableType || "soft"}
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
                  value={formData.quotaUnit || "MiB"}
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
                  value={formData.thirdOption || "option1"}
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
                checked={formData.monitorFileAdd}
                onChange={() => handleCheckboxChange("monitorFileAdd")}
                id="monitor-file-add"
              />
            </div>

            <div className="form-group checkbox-group">
              <label htmlFor="monitor-file-change">Monitor file change</label>
              <CustomCheckbox
                checked={formData.monitorFileChange}
                onChange={() => handleCheckboxChange("monitorFileChange")}
                id="monitor-file-change"
              />
            </div>

            <div className="form-group checkbox-group">
              <label htmlFor="monitor-file-delete">Monitor file delete</label>
              <CustomCheckbox
                checked={formData.monitorFileDelete}
                onChange={() => handleCheckboxChange("monitorFileDelete")}
                id="monitor-file-delete"
              />
            </div>

            <div className="form-group checkbox-group">
              <label htmlFor="monitor-failure">Monitor failure</label>
              <CustomCheckbox
                checked={formData.monitorFailure}
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
                value={formData.fileExceedsAge}
                onChange={(e) =>
                  handleInputChange("fileExceedsAge", parseInt(e.target.value))
                }
                className="form-input-small"
              />
              <select
                value={formData.fileExceedsAgeDays}
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
                value={formData.raiseEventIfMonitor}
                onChange={(e) =>
                  handleInputChange(
                    "raiseEventIfMonitor",
                    parseInt(e.target.value)
                  )
                }
                className="form-input-small"
              />
              <select
                value={formData.raiseEventIfMonitorDays}
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
                value={formData.raiseEventsOn}
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
                <div className="tags-input">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                      <button
                        type="button"
                        className="tag-remove"
                        onClick={() => {
                          const newTags = formData.tags.filter(
                            (_, i) => i !== index
                          );
                          handleInputChange("tags", newTags);
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <button type="button" className="dropdown-button">
                  ▼
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="dialog-footer">
          <button className="btn btn-primary" onClick={handleOk}>
            OK
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirectoryMonitor;
