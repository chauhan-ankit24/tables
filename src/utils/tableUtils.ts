import type { DirectoryMonitorRow } from "../constants/table";

export function filterTableData(
  data: DirectoryMonitorRow[],
  queries: {
    nameQuery?: string;
    directoryQuery?: string;
    ownerQuery?: string;
    tradingPartnerQuery?: string;
    lastRunQuery?: string;
  }
) {
  return data.filter((row) => {
    const nameMatch =
      typeof row.name === "string" &&
      row.name.toLowerCase().includes((queries.nameQuery || "").toLowerCase());
    const dirMatch =
      typeof row.directory === "string" &&
      row.directory
        .toLowerCase()
        .includes((queries.directoryQuery || "").toLowerCase());
    const ownerMatch =
      typeof row.owner === "string" &&
      row.owner
        .toLowerCase()
        .includes((queries.ownerQuery || "").toLowerCase());
    const tradingPartnerMatch =
      typeof row.tradingPartner === "string" &&
      row.tradingPartner
        .toLowerCase()
        .includes((queries.tradingPartnerQuery || "").toLowerCase());
    const lastRunMatch =
      typeof row.lastRun === "string" &&
      row.lastRun
        .toLowerCase()
        .includes((queries.lastRunQuery || "").toLowerCase());
    return (
      nameMatch && dirMatch && ownerMatch && tradingPartnerMatch && lastRunMatch
    );
  });
}

export function sortTableData(
  data: DirectoryMonitorRow[],
  sortColumn: string,
  sortDirection: "asc" | "desc"
) {
  if (!sortColumn) return data;
  return data.slice().sort((a, b) => {
    const aVal = a[sortColumn as keyof DirectoryMonitorRow];
    const bVal = b[sortColumn as keyof DirectoryMonitorRow];
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return sortDirection === "asc" ? -1 : 1;
    if (bVal == null) return sortDirection === "asc" ? 1 : -1;
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }
    return sortDirection === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });
}
