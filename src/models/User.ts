export interface User {
  id: string;
  name: string;
  account_created: number;
  class_id?: string;
  role: UserRole;
  tasks?: UserTask[];
}

export enum UserRole {
  ADMIN = "admin",
  TEACHER = "teacher",
  STUDENT = "student",
}

export interface UserTask {
  taskId: string;
  amount: number;
  goal: number;
}