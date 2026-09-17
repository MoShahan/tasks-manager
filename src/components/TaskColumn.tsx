import type { Task } from "../types";

import TaskCard from "./TaskCard";

type TaskColumnProps = {
  title: string;
  tasks: Task[];
  onComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDuplicate: (taskId: string) => void;
  onDelete: (taskId: string) => void;
};

const TaskColumn = ({
  title,
  tasks,
  onComplete,
  onEdit,
  onDuplicate,
  onDelete,
}: TaskColumnProps) => {
  return (
    <section className="column" aria-label={title}>
      <header className="column-header">
        <h2>{title}</h2>
        <span className="column-count">{tasks.length}</span>
      </header>

      <div className="column-body">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={onComplete}
              onEdit={onEdit}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="column-empty">No tasks in this column</p>
        )}
      </div>
    </section>
  );
};

export default TaskColumn;
