import { useState } from "react";
import "./App.css";

import { v4 as uuidv4 } from "uuid";
import type { TaskType } from "./types";
import Column from "./Column";
import { COMPLETED, IN_PROGRESS, PENDING } from "./constants";

const demo_tasks: TaskType[] = [
  {
    id: "1",
    title: "task 1",
    status: PENDING,
    description: "This is task 1",
    priority: "high",
    date: new Date(),
  },
  {
    id: "2",
    title: "task 2",
    status: IN_PROGRESS,
    description: "This is task 2",
    priority: "low",
    date: new Date(),
  },
  {
    id: "2",
    title: "abc",
    status: IN_PROGRESS,
    description: "This is task 2",
    priority: "medium",
    date: new Date(),
  },
  {
    id: "2",
    title: "def",
    status: IN_PROGRESS,
    description: "This is task 2",
    priority: "high",
    date: new Date(),
  },
  {
    id: "3",
    title: "task 3",
    status: COMPLETED,
    description: "This is task 3",
    priority: "low",
    date: new Date(),
  },
];

function App() {
  const [tasks, setTasks] = useState<TaskType[]>(demo_tasks);
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>(tasks);

  const [searchWord, setSearchWord] = useState<string>("");

  const handleAddTask = () => {
    setTasks((prev) => [
      ...prev,
      { id: uuidv4(), title: "New Title", status: PENDING },
    ]);
  };

  const handleComplete = (taskId: string) => {
    const idx = tasks.findIndex((task) => task.id === taskId);
    const tempTasks = [...tasks];
    tempTasks[idx].status = COMPLETED;
    setTasks(tempTasks);
  };

  const handleEdit = () => {};

  const handleDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleSearch = () => {
    const newTasks = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchWord.toLowerCase()),
    );
    setFilteredTasks(newTasks);
  };

  const clearSearch = () => {
    setSearchWord("");
    setFilteredTasks(tasks);
  };

  const handleFilter = (arg: "status" | "priority", value: string) => {
    switch (arg) {
      case "priority":
        setFilteredTasks(tasks.filter((task) => task.priority === value));
        return;
      case "status":
        setFilteredTasks(tasks.filter((task) => task.status === value));
        return;
    }
  };

  return (
    <main>
      <div>
        Search:{" "}
        <input
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={clearSearch}>Clear Search</button>
      </div>

      <div>
        Filter by Priority:{" "}
        <button onClick={() => handleFilter("priority", "high")}>High</button>
        <button onClick={() => handleFilter("priority", "medium")}>
          Medium
        </button>
        <button onClick={() => handleFilter("priority", "low")}>Low</button>
      </div>

      <button onClick={handleAddTask}>Add Task</button>
      <div className="column-container">
        <Column
          title="Pending"
          tasks={filteredTasks.filter((task) => task.status === PENDING)}
          handleComplete={handleComplete}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <Column
          title="In Progress"
          tasks={filteredTasks.filter((task) => task.status === IN_PROGRESS)}
          handleComplete={handleComplete}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <Column
          title="Completed"
          tasks={filteredTasks.filter((task) => task.status === COMPLETED)}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </main>
  );
}

export default App;
