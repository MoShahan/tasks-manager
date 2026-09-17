import type { ListSortKey, SortDirection, Task, TaskDraft, TaskFilters } from "../types";

export function validateTaskTitle(title: string): string | null {
  if (!title.trim()) {
    return "Title is required.";
  }

  return null;
}

export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  const search = filters.search.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesSearch =
      search.length === 0 || task.title.toLowerCase().includes(search);
    const matchesStatus =
      filters.status === "all" || task.status === filters.status;
    const matchesPriority =
      filters.priority === "all" || task.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}

export function sortTasks(tasks: Task[], direction: SortDirection): Task[] {
  return [...tasks].sort((a, b) => {
    const diff = a.dueDate.getTime() - b.dueDate.getTime();
    return direction === "asc" ? diff : -diff;
  });
}

export function getVisibleTasks(
  tasks: Task[],
  filters: TaskFilters,
  direction: SortDirection,
): Task[] {
  return sortTasks(filterTasks(tasks, filters), direction);
}

export function addTask(tasks: Task[], draft: TaskDraft, id?: string): Task[] {
  return [
    ...tasks,
    { ...draft, id: id ?? crypto.randomUUID(), title: draft.title.trim() },
  ];
}

export function updateTask(
  tasks: Task[],
  taskId: string,
  updates: Partial<TaskDraft>,
): Task[] {
  return tasks.map((task) =>
    task.id === taskId
      ? {
          ...task,
          ...updates,
          title: updates.title !== undefined ? updates.title.trim() : task.title,
        }
      : task,
  );
}

export function completeTask(tasks: Task[], taskId: string): Task[] {
  return tasks.map((task) =>
    task.id === taskId ? { ...task, status: "completed" } : task,
  );
}

export function deleteTask(tasks: Task[], taskId: string): Task[] {
  return tasks.filter((task) => task.id !== taskId);
}

export function insertTask(tasks: Task[], task: Task, index: number): Task[] {
  const next = [...tasks];
  const insertAt = Math.min(Math.max(index, 0), next.length);
  next.splice(insertAt, 0, task);
  return next;
}

export function duplicateTask(tasks: Task[], taskId: string, id?: string): Task[] {
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index === -1) {
    return tasks;
  }

  const original = tasks[index];
  const copy: Task = {
    ...original,
    id: id ?? crypto.randomUUID(),
    title: `${original.title} (copy)`,
  };
  const next = [...tasks];
  next.splice(index + 1, 0, copy);
  return next;
}

const PRIORITY_RANK = { high: 3, medium: 2, low: 1 } as const;
const STATUS_RANK = {
  pending: 0,
  "in-progress": 1,
  completed: 2,
} as const;

export function sortTasksBy(
  tasks: Task[],
  key: ListSortKey,
  direction: SortDirection,
): Task[] {
  return [...tasks].sort((a, b) => {
    let diff = 0;

    switch (key) {
      case "title":
        diff = a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
        break;
      case "status":
        diff = STATUS_RANK[a.status] - STATUS_RANK[b.status];
        break;
      case "priority":
        diff = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
        break;
      case "dueDate":
        diff = a.dueDate.getTime() - b.dueDate.getTime();
        break;
    }

    return direction === "asc" ? diff : -diff;
  });
}

export function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fromDateInputValue(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

export function formatDueDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function isOverdue(task: Task, now = new Date()): boolean {
  if (task.status === "completed") {
    return false;
  }

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const due = new Date(task.dueDate);
  due.setHours(0, 0, 0, 0);
  return due < today;
}

type SerializedTask = Omit<Task, "dueDate"> & { dueDate: string };

export function serializeTasks(tasks: Task[]): string {
  const payload: SerializedTask[] = tasks.map((task) => ({
    ...task,
    dueDate: task.dueDate.toISOString(),
  }));
  return JSON.stringify(payload);
}

export function deserializeTasks(raw: string): Task[] | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return null;
    }

    return parsed.map((item: SerializedTask) => ({
      ...item,
      dueDate: new Date(item.dueDate),
    }));
  } catch {
    return null;
  }
}
