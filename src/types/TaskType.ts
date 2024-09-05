export interface TaskType {
  id: string;
  title: string;
  description: string;
  completed: [0, 1, 2];
  id_user: string;
}

export interface TaskTypeRegister {
  title: string;
  description: string;
  id_user: string;
}
