import { FC } from "react";
import { TaskItemProps } from "../../../models/TaskProps";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Paper from "@mui/material/Paper";
import { styles } from "./TaskItem.styles";
import { Draggable } from "react-beautiful-dnd";
interface TaskProps {
  data: TaskItemProps;
  index: number;
}
const TaskItem: FC<TaskProps> = ({ data, index }) => {
  return (
    <Draggable key={data._id} draggableId={data._id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Paper sx={styles.listItem}>
            <h3>{data.title}</h3>
            <p>{data.description}</p>

            <IconButton aria-label="delete" size="large">
              <BorderColorIcon fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="delete" size="large">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Paper>
        </li>
      )}
    </Draggable>
  );
};
export default TaskItem;
