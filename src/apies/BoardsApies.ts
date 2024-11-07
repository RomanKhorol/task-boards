import axios from "axios";
import { BoardDataType } from "../models/TaskProps";
axios.defaults.baseURL = "https://node-js-1zww.onrender.com";
export async function fetchBoards(): Promise<BoardDataType[]> {
  try {
    const response = await axios.get<BoardDataType[]>("api/boards");
    return response.data;
  } catch (error) {
    const e = error as Error;
    throw new Error(`${e.message}`);
  }
}
export async function addBoards(data: BoardDataType) {
  try {
    const response = await axios.post<BoardDataType>("boards", data);
    return response.data;
  } catch (error) {
    const e = error as Error;
    throw new Error(`${e.message}`);
  }
}
export async function fetchBoardsById(id: string): Promise<BoardDataType> {
  try {
    const response = await axios.get<BoardDataType>(`api/boards/${id}`);
    return response.data;
  } catch (error) {
    const e = error as Error;
    throw new Error(`${e.message}`);
  }
}
export async function editBoardsById(id: string, data: BoardDataType) {
  try {
    const response = await axios.put<{
      message: "Updated successfull";
    }>(`api/boards/${id}`, data);
    return response.data;
  } catch (error) {
    const e = error as Error;
    throw new Error(`${e.message}`);
  }
}
export async function deleteBoardsById(id: string) {
  try {
    const response = await axios.delete<{
      message: "Updated successfull";
    }>(`boards/${id}`);
    return response.data;
  } catch (error) {
    const e = error as Error;
    throw new Error(`${e.message}`);
  }
}
