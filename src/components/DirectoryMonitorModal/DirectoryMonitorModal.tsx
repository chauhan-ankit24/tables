import React from "react";
import "./DirectoryMonitorModal.css";

interface DirectoryMonitorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DirectoryMonitorModal: React.FC<DirectoryMonitorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Directory Monitor</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <p className="modal-desc">Setup directory monitor parameters.</p>
        <form className="modal-form">
          <fieldset className="modal-section">
            <legend>Basic</legend>
            <label>Name<span className="required">*</span></label>
            <input type="text" placeholder="Name" />
            <label>Use trading partner</label>
            <select><option>test</option></select>
            <label>Directory<span className="required">*</span></label>
            <div className="directory-row">
              <input type="text" placeholder="Directory" />
              <button type="button">Browse</button>
            </div>
            <label className="checkbox-row">
              <input type="checkbox" /> Monitor recursively
            </label>
          </fieldset>
          <fieldset className="modal-section">
            <legend>Settings</legend>
            <label>Monitor interval</label>
            <div className="input-row">
              <input type="number" value={600} min={0} /> sec
            </div>
            <label>Latency period</label>
            <div className="input-row">
              <input type="number" value={5} min={0} /> sec
            </div>
            <label>Owner</label>
            <input type="text" placeholder="hari" />
            <label>Enable</label>
            <select>
              <option>Soft</option>
            </select>
            quota of <input type="number" value={100} min={0} />
            <select>
              <option>MiB</option>
            </select>
          </fieldset>
          <fieldset className="modal-section">
            <legend>Events</legend>
            <label className="checkbox-row">
              <input type="checkbox" checked readOnly /> Monitor file add
            </label>
            <label className="checkbox-row">
              <input type="checkbox" checked readOnly /> Monitor file change
            </label>
            <label className="checkbox-row">
              <input type="checkbox" checked readOnly /> Monitor file delete
            </label>
            <label className="checkbox-row">
              <input type="checkbox" checked readOnly /> Monitor failure
            </label>
            <label>File exceeds age of</label>
            <div className="input-row">
              <input type="number" value={1} min={0} />
              <select><option>days(s)</option></select>
            </div>
            <label>Raise an event if monitor...</label>
            <div className="input-row">
              <input type="number" value={1} min={0} />
              <select><option>days(s)</option></select>
            </div>
            <label>Raise events on</label>
            <select><option>first</option></select> instance(s)
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default DirectoryMonitorModal;
