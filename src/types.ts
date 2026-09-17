export type TaskType = {
  id: string;
  title: string;
  description?: string;
  status?: "pending" | "in-progress" | "completed";
  priority?: "low" | "medium" | "high";
  date?: Date | null;
};
