export enum TableRowKeys {
  name = "name",
  directory = "directory",
  quota = "quota",
  owner = "owner",
  events = "events",
  lastRun = "lastRun",
  recursive = "recursive",
  tags = "tags",
  tradingPartner = "tradingPartner",
  monitorInterval = "monitorInterval",
}

export interface DirectoryMonitorRow {
  id: string;
  name: string;
  directory: string;
  owner: string;
  tradingPartner: string;
  tags: string;
  recursive: string;
  interval?: string;
  quota?: string;
  events?: string;
  lastRun?: string;
  monitorRecursively?: boolean;
  monitorInterval?: number;
  latencyPeriod?: number;
  enable?: boolean;
  quotaOf?: number;
  monitorFileAdd?: boolean;
  monitorFileChange?: boolean;
  monitorFileDelete?: boolean;
  monitorFailure?: boolean;
  fileExceedsAge?: number;
  fileExceedsAgeDays?: string;
  raiseEventIfMonitor?: number;
  raiseEventIfMonitorDays?: string;
  raiseEventsOn?: string;
  raiseEventsInstance?: string;
  enableType?: string;
  quotaUnit?: string;
  thirdOption?: string;
  [key: string]: any;
}
