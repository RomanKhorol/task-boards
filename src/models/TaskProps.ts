export interface TaskItemProps {
  title: string;
  description: string;
  _id: string;
}
export interface TaskListItemProps {
  data: TaskItemProps[];
  name: string;
}
export interface BoardDataType {
  _id?: string;
  title: string;
  toDo: TaskItemProps[];
  inProgress: TaskItemProps[];
  done: TaskItemProps[];
  updatedAt?: string;
  __v?: number;
}
export interface EditBoardDataType {
  toDo?: TaskItemProps[];
  inProgress?: TaskItemProps[];
  done?: TaskItemProps[];
}
