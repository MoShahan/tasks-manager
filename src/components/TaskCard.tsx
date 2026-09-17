import { PRIORITY_LABELS } from "../constants";
import type { Task } from "../types";
import { formatDueDate, isOverdue } from "../utils/tasks";

import TaskActions from "./TaskActions";

type TaskCardProps = {
  task: Task;
  onComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDuplicate: (taskId: string) => void;
  onDelete: (taskId: string) => void;
};

const TaskCard = ({
  task,
  onComplete,
  onEdit,
  onDuplicate,
  onDelete,
}: TaskCardProps) => {
  const overdue = isOverdue(task);

  return (
    <article className="task-card">
      <div className="task-card-top">
        <span className={`chip chip-${task.priority}`}>
          {PRIORITY_LABELS[task.priority]}
        </span>
        <time
          className={`due-date${overdue ? " overdue" : ""}`}
          dateTime={task.dueDate.toISOString()}
        >
          {overdue ? "Overdue · " : ""}
          {formatDueDate(task.dueDate)}
        </time>
      </div>

      <h3 className="task-title">{task.title}</h3>
      {task.description ? (
        <p className="task-description">{task.description}</p>
      ) : null}

      <TaskActions
        task={task}
        onComplete={onComplete}
        onEdit={onEdit}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
      />
    </article>
  );
};

export default TaskCard;
