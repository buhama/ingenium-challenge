export interface User {
  id: string;
  name: string;
  account_created: number;
  class_id?: string;
  role: UserRole;
  tasks?: { taskId: string; amount: number; goal: number }[];
}

export enum UserRole {
  ADMIN = "admin",
  TEACHER = "teacher",
  STUDENT = "student",
}