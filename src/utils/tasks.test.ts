import type { Task } from "../types";

import {
  addTask,
  completeTask,
  deleteTask,
  deserializeTasks,
  duplicateTask,
  filterTasks,
  insertTask,
  serializeTasks,
  sortTasks,
  sortTasksBy,
  updateTask,
  validateTaskTitle,
} from "./tasks";

const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Write API contract",
    description: "Document endpoints",
    status: "pending",
    priority: "high",
    dueDate: new Date("2026-09-20T12:00:00"),
  },
  {
    id: "2",
    title: "Fix login token expiry",
    description: "Auth TTL",
    status: "in-progress",
    priority: "high",
    dueDate: new Date("2026-09-18T12:00:00"),
  },
  {
    id: "3",
    title: "Update onboarding README",
    description: "Docs",
    status: "completed",
    priority: "low",
    dueDate: new Date("2026-09-10T12:00:00"),
  },
];

describe("validateTaskTitle", () => {
  it("rejects empty or whitespace titles", () => {
    expect(validateTaskTitle("")).toBe("Title is required.");
    expect(validateTaskTitle("   ")).toBe("Title is required.");
  });

  it("accepts a non-empty title", () => {
    expect(validateTaskTitle("Ship filters")).toBeNull();
  });
});

describe("filterTasks", () => {
  it("searches by title only", () => {
    const result = filterTasks(sampleTasks, {
      search: "login",
      status: "all",
      priority: "all",
    });

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Fix login token expiry");
  });

  it("does not match description text", () => {
    const result = filterTasks(sampleTasks, {
      search: "Document",
      status: "all",
      priority: "all",
    });

    expect(result).toHaveLength(0);
  });

  it("filters by status and priority together", () => {
    const result = filterTasks(sampleTasks, {
      search: "",
      status: "pending",
      priority: "high",
    });

    expect(result.map((task) => task.id)).toEqual(["1"]);
  });
});

describe("sortTasks", () => {
  it("sorts by due date without mutating the original array", () => {
    const originalOrder = sampleTasks.map((task) => task.id);
    const ascending = sortTasks(sampleTasks, "asc");
    const descending = sortTasks(sampleTasks, "desc");

    expect(ascending.map((task) => task.id)).toEqual(["3", "2", "1"]);
    expect(descending.map((task) => task.id)).toEqual(["1", "2", "3"]);
    expect(sampleTasks.map((task) => task.id)).toEqual(originalOrder);
  });
});

describe("task mutations", () => {
  it("adds a task with a generated id", () => {
    const next = addTask(sampleTasks, {
      title: "New board column",
      description: "",
      status: "pending",
      priority: "medium",
      dueDate: new Date("2026-09-22T12:00:00"),
    }, "task-new");

    expect(next).toHaveLength(4);
    expect(next[3].id).toBe("task-new");
    expect(next[3].title).toBe("New board column");
  });

  it("updates and completes a task immutably", () => {
    const updated = updateTask(sampleTasks, "1", { title: "Write OpenAPI spec" });
    const completed = completeTask(updated, "1");

    expect(sampleTasks[0].title).toBe("Write API contract");
    expect(updated[0].title).toBe("Write OpenAPI spec");
    expect(completed[0].status).toBe("completed");
  });

  it("deletes a task by id", () => {
    const next = deleteTask(sampleTasks, "2");
    expect(next.map((task) => task.id)).toEqual(["1", "3"]);
  });

  it("duplicates a task after the original", () => {
    const next = duplicateTask(sampleTasks, "1", "1-copy");

    expect(next.map((task) => task.id)).toEqual(["1", "1-copy", "2", "3"]);
    expect(next[1].title).toBe("Write API contract (copy)");
    expect(sampleTasks).toHaveLength(3);
  });

  it("inserts a task back at the original index", () => {
    const removed = sampleTasks[1];
    const without = deleteTask(sampleTasks, "2");
    const restored = insertTask(without, removed, 1);

    expect(restored.map((task) => task.id)).toEqual(["1", "2", "3"]);
  });
});

describe("sortTasksBy", () => {
  it("sorts by title and priority", () => {
    const byTitle = sortTasksBy(sampleTasks, "title", "asc");
    const byPriority = sortTasksBy(sampleTasks, "priority", "desc");

    expect(byTitle.map((task) => task.id)).toEqual(["2", "3", "1"]);
    expect(byPriority[0].priority).toBe("high");
  });
});

describe("serialization", () => {
  it("round-trips dates through JSON", () => {
    const restored = deserializeTasks(serializeTasks(sampleTasks));

    expect(restored).not.toBeNull();
    expect(restored![1].dueDate).toBeInstanceOf(Date);
    expect(restored![1].title).toBe("Fix login token expiry");
  });
});
