import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Board from "../board/Board";
import { useEffect, useState } from "react";
import { fetchBoards } from "../../../apies/BoardsApies";
import { BoardDataType } from "../../../models/TaskProps";

export default function SelectedListItem() {
  const [boards, setBoards] = useState<BoardDataType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function getBoards() {
      try {
        setLoading(true);
        const boardList = await fetchBoards();
        setBoards(boardList);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(
            `Failed to fetch boards: ${error.message}. Please try again later.`
          );
        } else {
          setError("An unknown error occurred. Please try again later.");
        }
      }
    }
    getBoards();
  }, []);

  return (
    <Box sx={{ maxWidth: 360, bgcolor: "black" }}>
      {error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <List component="nav" aria-label="main mailbox folders">
          {loading ? (
            <div>Loading...</div>
          ) : (
            boards.map((board) => <Board key={board._id} board={board} />)
          )}
        </List>
      )}
    </Box>
  );
}
