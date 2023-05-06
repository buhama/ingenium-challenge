export interface User {
  id: string;
  name: string;
  account_created: number;
  class_id?: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = "admin",
  TEACHER = "teacher",
  STUDENT = "student",
}