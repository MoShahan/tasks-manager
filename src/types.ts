import type { Priority, Status } from "./constants";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: Date;
};

export type TaskDraft = Omit<Task, "id">;

export type TaskFilters = {
  search: string;
  status: Status | "all";
  priority: Priority | "all";
};

export type SortDirection = "asc" | "desc";

export type ViewMode = "board" | "list";

export type ListSortKey = "title" | "status" | "priority" | "dueDate";
