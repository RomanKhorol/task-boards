import { FC } from "react";
import { TaskListItemProps } from "../../../models/TaskProps";
import TaskItem from "../task-item/TaskItem";
import { styles } from "./TaskListItem.styles";
import { Box, Button, List } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomDroppable from "../../customDroppable/CustomDroppable";

const TaskListItem: FC<TaskListItemProps> = ({ data, name }) => {
  return (
    <>
      <CustomDroppable droppableId={name}>
        {(provided) => (
          <List
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              ...styles.list,
            }}
          >
            <h3>{name}</h3>
            {data.map((task, index) => {
              return <TaskItem key={task._id} data={task} index={index} />;
            })}

            {provided.placeholder}
          </List>
        )}
      </CustomDroppable>
      <Box>
        <Button variant="contained" sx={styles.btn}>
          <AddIcon />
        </Button>
      </Box>
    </>
  );
};
export default TaskListItem;
