import React from "react";
import type { TaskType } from "./types";
import { COMPLETED } from "./constants";

type EachTaskProps = {
  task: TaskType;
  handleComplete?: (taskId: string) => void;
  handleEdit: (taskId: string) => void;
  handleDelete: (taskId: string) => void;
};

const EachTask = ({
  task,
  handleComplete,
  handleEdit,
  handleDelete,
}: EachTaskProps) => {
  return (
    <div className="each-task">
      <h3>Title: {task.title || ""}</h3>
      <p>Description: {task?.description || ""}</p>
      <p>Priority: {task?.priority || ""}</p>
      <p>Date: {task?.date?.toDateString() || ""}</p>
      {handleComplete && task.status !== COMPLETED && (
        <button onClick={() => handleComplete(task.id)}>
          Mark as Completed
        </button>
      )}
      <button onClick={() => handleEdit(task.id)}>Edit</button>
      <button onClick={() => handleDelete(task.id)}>Delete</button>
    </div>
  );
};

export default EachTask;
