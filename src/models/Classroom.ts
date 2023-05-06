import { Task } from "./Tasks";

export interface Classroom {
  id: string;
  name: string;
  created_at: number;
  simple_id: string;
  tasks: Task[];
}
