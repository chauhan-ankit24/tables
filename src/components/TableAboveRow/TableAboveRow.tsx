import React from "react";
import "./TableAboveRow.css";

interface TableAboveRowProps {
  columns: string[];
  nameQuery: string;
  directoryQuery: string;
  ownerQuery: string;
  tradingPartnerQuery: string;
  lastRunQuery: string;
  setNameQuery: (q: string) => void;
  setDirectoryQuery: (q: string) => void;
  setOwnerQuery: (q: string) => void;
  setTradingPartnerQuery: (q: string) => void;
  setLastRunQuery: (q: string) => void;
}

const TableAboveRow: React.FC<TableAboveRowProps> = ({
  columns,
  nameQuery,
  directoryQuery,
  ownerQuery,
  tradingPartnerQuery,
  lastRunQuery,
  setNameQuery,
  setDirectoryQuery,
  setOwnerQuery,
  setTradingPartnerQuery,
  setLastRunQuery,
}) => {
  return (
    <div className="table-above-row">
      <div className="table-above-row-28">
        {columns.map((col, colIdx) => (
          <div className={`table-heading-cell col-${colIdx}`} key={colIdx}>
            {col}
          </div>
        ))}
        <div className="table-above-row-28-spacer"></div>
      </div>
      <div className="table-above-row-22">
        {columns.map((col, colIdx) => {
          const noBorder =
            colIdx === 2 || colIdx === 3 || colIdx === 5
              ? "table-above-row-22-cell--no-border"
              : "";
          return (
            <div
              className={`table-above-row-22-cell col-${colIdx} ${noBorder}`}
              key={col + "-22"}
            >
              {colIdx === 0 && (
                <div className="table-search-bar">
                  <input
                    type="text"
                    className="table-search-input"
                    value={nameQuery}
                    placeholder="Search"
                    onChange={(e) => setNameQuery(e.target.value)}
                  />
                  <span className="table-search-icon">
                    <img
                      src={process.env.PUBLIC_URL + "/search.svg"}
                      alt="search"
                      width={16}
                      height={16}
                    />
                  </span>
                  <span className="table-search-icon">
                    <img
                      src={process.env.PUBLIC_URL + "/cheveron-down.svg"}
                      alt="chevron down"
                      width={16}
                      height={16}
                    />
                  </span>
                </div>
              )}
              {colIdx === 1 && (
                <div className="table-search-bar">
                  <input
                    type="text"
                    className="table-search-input"
                    value={directoryQuery}
                    placeholder="Search"
                    onChange={(e) => setDirectoryQuery(e.target.value)}
                  />
                  <span className="table-search-icon">
                    <img
                      src={process.env.PUBLIC_URL + "/search.svg"}
                      alt="search"
                      width={16}
                      height={16}
                    />
                  </span>
                  <span className="table-search-icon">
                    <img
                      src={process.env.PUBLIC_URL + "/cheveron-down.svg"}
                      alt="chevron down"
                      width={16}
                      height={16}
                    />
                  </span>
                </div>
              )}
              {/* ...existing code for other columns... */}
              {colIdx === 4 && (
                <div className="table-search-bar">
                  <input
                    type="text"
                    className="table-search-input"
                    value={ownerQuery}
                    placeholder="Search"
                    onChange={(e) => setOwnerQuery(e.target.value)}
                  />
                  <span className="table-search-icon">
                    <img
                      src={process.env.PUBLIC_URL + "/search.svg"}
                      alt="search"
                      width={16}
                      height={16}
                    />
                  </span>
                  <span className="table-search-icon">
                    <img
                      src={process.env.PUBLIC_URL + "/cheveron-down.svg"}
                      alt="chevron down"
                      width={16}
                      height={16}
                    />
                  </span>
                </div>
              )}
              {colIdx === 6 && (
                <div className="table-search-bar">
                  <input
                    type="text"
                    className="table-search-input"
                    value={lastRunQuery}
                    placeholder="Search"
                    onChange={(e) => setLastRunQuery(e.target.value)}
                  />
                  <span className="table-search-icon">
                    <img
                      src={process.env.PUBLIC_URL + "/calendar.svg"}
                      alt="calendar"
                      width={16}
                      height={16}
                    />
                  </span>
                  <span className="table-search-icon">
                    <img
                      src={process.env.PUBLIC_URL + "/cheveron-down.svg"}
                      alt="chevron down"
                      width={16}
                      height={16}
                    />
                  </span>
                </div>
              )}
              {(colIdx === 7 || colIdx === 8) && (
                <div className="table-search-bar">
                  <span
                    className="table-search-icon"
                    style={{ marginLeft: "auto" }}
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/cheveron-down.svg"}
                      alt="chevron down"
                      width={16}
                      height={16}
                    />
                  </span>
                </div>
              )}
              {colIdx === 9 && (
                <div className="table-search-bar">
                  <input
                    type="text"
                    className="table-search-input"
                    value={tradingPartnerQuery}
                    placeholder="Search"
                    onChange={(e) => setTradingPartnerQuery(e.target.value)}
                  />
                  <span className="table-search-icon">
                    <img
                      src={process.env.PUBLIC_URL + "/search.svg"}
                      alt="search"
                      width={16}
                      height={16}
                    />
                  </span>
                  <span className="table-search-icon">
                    <img
                      src={process.env.PUBLIC_URL + "/cheveron-down.svg"}
                      alt="chevron down"
                      width={16}
                      height={16}
                    />
                  </span>
                </div>
              )}
            </div>
          );
        })}
        <div className="table-above-row-28-spacer"></div>
      </div>
    </div>
  );
};

export default TableAboveRow;
