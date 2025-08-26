import React from "react";
import "./TableAboveRow.css";

interface TableAboveRowProps {
  columns: string[];
}

const TableAboveRow: React.FC<TableAboveRowProps> = ({ columns }) => {
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
              {(colIdx === 0 ||
                colIdx === 1 ||
                colIdx === 4 ||
                colIdx === 9) && (
                <div className="table-search-bar">
                  <input
                    type="text"
                    className="table-search-input"
                    placeholder=""
                    onMouseEnter={(e) =>
                      ((e.target as HTMLInputElement).placeholder = "Search")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLInputElement).placeholder = "")
                    }
                    onFocus={(e) =>
                      ((e.target as HTMLInputElement).placeholder = "Search")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLInputElement).placeholder = "")
                    }
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
                    placeholder=""
                    onMouseEnter={(e) =>
                      ((e.target as HTMLInputElement).placeholder =
                        "dd/mm/yyyy hh:mm")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLInputElement).placeholder = "")
                    }
                    onFocus={(e) =>
                      ((e.target as HTMLInputElement).placeholder =
                        "dd/mm/yyyy hh:mm")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLInputElement).placeholder = "")
                    }
                  />
                  <span className="table-search-icon">
                    <img
                      src={process.env.PUBLIC_URL + "/calendar.svg"}
                      alt="calendar"
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
            </div>
          );
        })}
      <div className="table-above-row-28-spacer"></div>
      </div>
    </div>
  );
};

export default TableAboveRow;
