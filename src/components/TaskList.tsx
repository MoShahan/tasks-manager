import { PRIORITY_LABELS, STATUS_LABELS } from "../constants";
import type { ListSortKey, SortDirection, Task } from "../types";
import { formatDueDate, isOverdue } from "../utils/tasks";

import TaskActions from "./TaskActions";

type TaskListProps = {
  tasks: Task[];
  sortKey: ListSortKey;
  sortDirection: SortDirection;
  onSort: (key: ListSortKey) => void;
  onComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDuplicate: (taskId: string) => void;
  onDelete: (taskId: string) => void;
};

const columns: { key: ListSortKey; label: string }[] = [
  { key: "title", label: "Title" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "dueDate", label: "Due date" },
];

const TaskList = ({
  tasks,
  sortKey,
  sortDirection,
  onSort,
  onComplete,
  onEdit,
  onDuplicate,
  onDelete,
}: TaskListProps) => {
  return (
    <div className="task-table-wrap">
      <table className="task-table">
        <thead>
          <tr>
            {columns.map((column) => {
              const active = sortKey === column.key;
              const ariaSort = active
                ? sortDirection === "asc"
                  ? "ascending"
                  : "descending"
                : "none";

              return (
                <th key={column.key} className={`col-${column.key}`} aria-sort={ariaSort}>
                  <button
                    type="button"
                    className={`sort-header${active ? " is-active" : ""}`}
                    onClick={() => onSort(column.key)}
                    aria-label={`Sort by ${column.label}`}
                  >
                    {column.label}
                    {active ? (sortDirection === "asc" ? " ↑" : " ↓") : ""}
                  </button>
                </th>
              );
            })}
            <th className="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const overdue = isOverdue(task);

            return (
              <tr key={task.id}>
                <td className="col-title">
                  <p className="task-title">{task.title}</p>
                  {task.description ? (
                    <p className="task-description">{task.description}</p>
                  ) : null}
                </td>
                <td className="col-status">{STATUS_LABELS[task.status]}</td>
                <td className="col-priority">
                  <span className={`chip chip-${task.priority}`}>
                    {PRIORITY_LABELS[task.priority]}
                  </span>
                </td>
                <td className="col-dueDate">
                  <time
                    className={`due-date${overdue ? " overdue" : ""}`}
                    dateTime={task.dueDate.toISOString()}
                  >
                    {overdue ? "Overdue · " : ""}
                    {formatDueDate(task.dueDate)}
                  </time>
                </td>
                <td className="col-actions">
                  <TaskActions
                    task={task}
                    onComplete={onComplete}
                    onEdit={onEdit}
                    onDuplicate={onDuplicate}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
