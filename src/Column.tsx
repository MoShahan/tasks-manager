import { useEffect, useState } from "react";
import EachTask from "./EachTask";
import type { TaskType } from "./types";

type ColumnProps = {
  title: string;
  tasks: TaskType[];
  handleComplete?: (taskId: string) => void;
  handleEdit: (taskId: string) => void;
  handleDelete: (taskId: string) => void;
};

const Column = ({
  title,
  tasks,
  handleComplete,
  handleEdit,
  handleDelete,
}: ColumnProps) => {
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>(tasks);

  const handleSort = (sortBy: "date" | "title") => {
    switch (sortBy) {
      case "date":
        return;
      case "title":
        console.log("Sorting by title");
        setFilteredTasks(
          tasks.sort((a, b) =>
            a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
          ),
        );
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    console.log({ filteredTasks });
  }, [filteredTasks]);

  return (
    <div className="each-column">
      <h1>{title}</h1>

      <div>
        <p>Sort</p>
        <button
          onClick={() => {
            handleSort("date");
          }}
        >
          Date
        </button>
        <button
          onClick={() => {
            handleSort("title");
          }}
        >
          Title
        </button>
      </div>

      <div>
        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <EachTask
              task={task}
              handleComplete={handleComplete}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>No tasks available now</p>
        )}
      </div>
    </div>
  );
};

export default Column;
