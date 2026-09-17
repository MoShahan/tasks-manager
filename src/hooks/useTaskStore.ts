import { useEffect, useState } from "react";

import { STORAGE_KEY } from "../constants";
import { demoTasks } from "../data/demoTasks";
import type { Task, TaskDraft } from "../types";
import {
  addTask,
  completeTask,
  deleteTask,
  deserializeTasks,
  duplicateTask,
  insertTask,
  serializeTasks,
  updateTask,
} from "../utils/tasks";

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return demoTasks;
    }

    const parsed = deserializeTasks(raw);
    return parsed ?? demoTasks;
  } catch {
    return demoTasks;
  }
}

export function useTaskStore() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, serializeTasks(tasks));
  }, [tasks]);

  const create = (draft: TaskDraft) => {
    setTasks((current) => addTask(current, draft));
  };

  const update = (taskId: string, updates: Partial<TaskDraft>) => {
    setTasks((current) => updateTask(current, taskId, updates));
  };

  const complete = (taskId: string) => {
    setTasks((current) => completeTask(current, taskId));
  };

  const remove = (taskId: string) => {
    setTasks((current) => deleteTask(current, taskId));
  };

  const duplicate = (taskId: string) => {
    setTasks((current) => duplicateTask(current, taskId));
  };

  const restore = (task: Task, index: number) => {
    setTasks((current) => insertTask(current, task, index));
  };

  return { tasks, create, update, complete, remove, duplicate, restore };
}
