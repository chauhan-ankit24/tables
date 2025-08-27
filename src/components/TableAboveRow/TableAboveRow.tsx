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

interface RenderSearchBarProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icons: Array<{ src: string; alt: string }>;

  input?: boolean;
  style?: React.CSSProperties;
  placeholder?: string;
}

const renderSearchBar = (props: RenderSearchBarProps) => (
  <div className="table-search-bar" style={props.style}>
    {props.input && (
      <input
        type="text"
        className="table-search-input"
        value={props.value}
        onChange={props.onChange}
        onMouseEnter={(e) =>
          e.currentTarget.setAttribute(
            "placeholder",
            props.placeholder || "Search"
          )
        }
        onMouseLeave={(e) => e.currentTarget.setAttribute("placeholder", "")}
      />
    )}
    {props.icons.map((icon, idx) => (
      <span className="table-search-icon" key={icon.alt + idx}>
        <img
          src={process.env.PUBLIC_URL + icon.src}
          alt={icon.alt}
          width={16}
          height={16}
        />
      </span>
    ))}
  </div>
);

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
        {columns.map((col, colIdx) => {
          let header = col.charAt(0).toUpperCase() + col.slice(1);
          if (col === "monitorInterval") header = "Interval";
          if (col === "lastRun") header = "Last Run";
          if (col === "tradingPartner") header = "Trading Partner";
          return (
            <div className={`table-heading-cell col-${colIdx}`} key={colIdx}>
              {header}
            </div>
          );
        })}
        <div className="table-above-row-28-spacer"></div>
      </div>
      <div className="table-above-row-22">
        {columns.map((col, colIdx) => {
          const noBorder =
            colIdx === 2 || colIdx === 3 || colIdx === 5
              ? "table-above-row-22-cell--no-border"
              : "";
          let searchBar = null;
          if (colIdx === 0)
            searchBar = renderSearchBar({
              value: nameQuery,
              onChange: (e) => setNameQuery(e.target.value),
              input: true,
              icons: [
                { src: "/search.svg", alt: "search" },
                { src: "/cheveron-down.svg", alt: "chevron down" },
              ],
            });
          else if (colIdx === 1)
            searchBar = renderSearchBar({
              value: directoryQuery,
              onChange: (e) => setDirectoryQuery(e.target.value),
              input: true,
              icons: [
                { src: "/search.svg", alt: "search" },
                { src: "/cheveron-down.svg", alt: "chevron down" },
              ],
            });
          else if (colIdx === 4)
            searchBar = renderSearchBar({
              value: ownerQuery,
              onChange: (e) => setOwnerQuery(e.target.value),
              input: true,
              icons: [
                { src: "/search.svg", alt: "search" },
                { src: "/cheveron-down.svg", alt: "chevron down" },
              ],
            });
          else if (colIdx === 6)
            searchBar = renderSearchBar({
              value: lastRunQuery,
              onChange: (e) => setLastRunQuery(e.target.value),
              input: true,
              icons: [
                { src: "/calendar.svg", alt: "calendar" },
                { src: "/cheveron-down.svg", alt: "chevron down" },
              ],
              placeholder: "dd/mm/yyyy hh:mm",
            });
          else if (colIdx === 7 || colIdx === 8)
            searchBar = renderSearchBar({
              input: false,
              icons: [{ src: "/cheveron-down.svg", alt: "chevron down" }],
              style: { marginLeft: "auto" },
            });
          else if (colIdx === 9)
            searchBar = renderSearchBar({
              value: tradingPartnerQuery,
              onChange: (e) => setTradingPartnerQuery(e.target.value),
              input: true,
              icons: [
                { src: "/search.svg", alt: "search" },
                { src: "/cheveron-down.svg", alt: "chevron down" },
              ],
            });
          return (
            <div
              className={`table-above-row-22-cell col-${colIdx} ${noBorder}`}
              key={col + "-22"}
            >
              {searchBar}
            </div>
          );
        })}
        <div className="table-above-row-28-spacer"></div>
      </div>
    </div>
  );
};

export default TableAboveRow;
