import type { Task } from "../types";

type TaskActionsProps = {
  task: Task;
  onComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDuplicate: (taskId: string) => void;
  onDelete: (taskId: string) => void;
};

const TaskActions = ({
  task,
  onComplete,
  onEdit,
  onDuplicate,
  onDelete,
}: TaskActionsProps) => {
  return (
    <div className="task-actions">
      <span className="complete-slot">
        {task.status !== "completed" ? (
          <button
            type="button"
            className="btn btn-subtle"
            onClick={() => onComplete(task.id)}
          >
            Mark completed
          </button>
        ) : null}
      </span>
      <button type="button" className="btn btn-ghost" onClick={() => onEdit(task)}>
        Edit
      </button>
      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => onDuplicate(task.id)}
      >
        Duplicate
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskActions;
