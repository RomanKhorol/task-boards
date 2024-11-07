import React, { ReactElement } from "react";
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
interface CustomDroppableProps {
  droppableId: string;
  direction?: "horizontal" | "vertical"; // Опциональный параметр для направления
  children: (
    provided: DroppableProvided,
    snapshot: DroppableStateSnapshot
  ) => ReactElement; // Указание, что children возвращает всегда ReactElement
}
const CustomDroppable: React.FC<CustomDroppableProps> = ({
  children,
  droppableId,
  direction = "vertical",
  ...props
}) => {
  return (
    <Droppable droppableId={droppableId} direction={direction} {...props}>
      {(provided, snapshot) => children(provided, snapshot)}
    </Droppable>
  );
};

export default CustomDroppable;
