import { FC, useEffect, useState } from "react";
import { DropResult, DragDropContext } from "react-beautiful-dnd";
import TaskListItem from "../task-list-item/TaskListItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { BoardDataType } from "../../../models/TaskProps";
import { useParams } from "react-router-dom";
import { editBoardsById, fetchBoardsById } from "../../../apies/BoardsApies";
import { Box, Typography } from "@mui/material";
import { cleanBoardData } from "../../../helpers/cleanFetchBoardDetails";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
// Создаем маппинг droppableId на ключи BoardDataType
const listMap: { [key: string]: keyof BoardDataType } = {
  toDo: "toDo",
  inProgress: "inProgress",
  done: "done",
};
const BoadrDetail: FC = () => {
  const [boardState, setBoardState] = useState<BoardDataType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  useEffect(() => {
    async function getBoardById() {
      try {
        setLoading(true);
        if (id === undefined) {
          return;
        }
        const boardDetails = await fetchBoardsById(id);
        const cleanedboardDetails = cleanBoardData(boardDetails);
        setBoardState(cleanedboardDetails);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(
            `Failed to fetch detail. ${error.message}. Please try again later.`
          );
        } else {
          setError("An unknown error occurred. Please try again later.");
        }
      }
    }
    getBoardById();
  }, [id]);
  useEffect(() => {
    if (boardState && boardState._id) {
      editBoardsById(boardState._id, boardState);
    }
  }, [boardState]);
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    // Если нет места назначения (за пределы списка), то не делаем ничего
    if (!destination || !boardState) return;

    // Если элемент перемещен в то же место, то не делаем ничего
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceListKey = listMap[source.droppableId] as keyof BoardDataType;
    const destinationListKey = listMap[
      destination.droppableId
    ] as keyof BoardDataType;

    // Если droppableId не соответствует полям BoardDataType, то ничего не делаем
    if (!sourceListKey || !destinationListKey) return;
    // Проверка на существование массивов по ключам
    if (
      !Array.isArray(boardState[sourceListKey]) ||
      !Array.isArray(boardState[destinationListKey])
    ) {
      console.error("Invalid list keys:", sourceListKey, destinationListKey);
      return;
    }
    // Копируем массивы для изменения

    const sourceList = [...boardState[sourceListKey]];
    const [movedItem] = sourceList.splice(source.index, 1);
    const destinationList =
      sourceListKey === destinationListKey
        ? sourceList // Если перемещение внутри одного списка
        : [...boardState[destinationListKey]];

    destinationList.splice(destination.index, 0, movedItem);
    // Обновляем состояние
    setBoardState((prevState) => ({
      ...prevState!,
      [sourceListKey]: sourceList,
      [destinationListKey]: destinationList,
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <>
        {error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : (
          <Box>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                <Typography>{boardState?.title}</Typography>
                {boardState && (
                  <Stack direction="row" spacing={5} sx={{ listStyle: "none" }}>
                    <Item sx={{ bgcolor: "grey" }}>
                      <TaskListItem data={boardState.toDo} name="toDo" />
                    </Item>
                    <Item sx={{ bgcolor: "grey" }}>
                      <TaskListItem
                        data={boardState.inProgress}
                        name="inProgress"
                      />
                    </Item>
                    <Item sx={{ bgcolor: "grey" }}>
                      <TaskListItem data={boardState.done} name="done" />
                    </Item>
                  </Stack>
                )}
              </>
            )}
          </Box>
        )}
      </>
    </DragDropContext>
  );
};
export default BoadrDetail;
