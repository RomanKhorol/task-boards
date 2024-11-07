import { FC } from "react";
import { NavLink } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AdbIcon from "@mui/icons-material/Adb";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItem } from "@mui/material";
import { BoardDataType } from "../../../models/TaskProps";

interface BoardProps {
  board: BoardDataType;
}

const Board: FC<BoardProps> = ({ board }) => {
  return (
    <ListItem>
      <NavLink to={`${board._id}`}>
        <Button key={board._id}>
          <ListItemIcon>
            <AdbIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={board.title} sx={{ color: "white" }} />
        </Button>
      </NavLink>
      <Button
        sx={{ color: "#ffff" }}
        variant="outlined"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
    </ListItem>
  );
};
export default Board;
