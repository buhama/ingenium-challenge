import { Task } from "./Tasks";

export interface Classroom {
  id: string;
  name: string;
  created_at: number;
  simple_id: string;
  tasks: Task[];
  trees?: Tree[];
}

export interface Tree {
  id: string;
  studentId: string;
  taskId: string;
  opacityClass: string;
  rightClass: string;
  bottomClass: string;
}
