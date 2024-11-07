import { BoardDataType } from "../models/TaskProps";

type CleanedBoardData = Omit<BoardDataType, "updatedAt" | "__v">;

export function cleanBoardData(data: BoardDataType): CleanedBoardData {
  return {
    _id: data._id,
    title: data.title,
    toDo: data.toDo,
    inProgress: data.inProgress,
    done: data.done,
  };
}
