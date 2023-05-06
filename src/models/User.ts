export interface User {
  id: string;
  name: string;
  account_created: number;
  class_id?: string;
  role: "student" | "teacher";
}
