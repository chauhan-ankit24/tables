export enum DropdownOptionEnum {
  Edit = "edit",
  Delete = "delete",
  Run = "run",
  Events = "events",
  ViewTriggers = "viewTriggers",
}

export interface DropdownOption {
  value: DropdownOptionEnum | "divider";
  label: string;
  divider?: boolean;
}

export const DROPDOWN_OPTIONS: DropdownOption[] = [
  { value: DropdownOptionEnum.Edit, label: "Edit" },
  { value: DropdownOptionEnum.Delete, label: "Delete" },
  { value: "divider", label: "", divider: true },
  { value: DropdownOptionEnum.Run, label: "Run" },
  { value: DropdownOptionEnum.Events, label: "Events" },
  { value: DropdownOptionEnum.ViewTriggers, label: "View Triggers" },
];

export const TAG_OPTIONS = [
  "Security",
  "Finance",
  "HR",
  "IT",
  "Admin",
  "Legal",
  "Compliance",
  "Operations",
  "Support",
];
