import { List, Typography } from "@mui/material";
import { ProjectItem } from "../../ProjectItem/ProjectItem.tsx";
import { IProject } from "../../../misc/types.ts";
import { Draggable, Droppable } from "react-beautiful-dnd";
import ListItem from "@mui/material/ListItem";

export function DayView({
  heading,
  projects,
  droppableId,
}: {
  heading: string;
  droppableId: string;
  projects: IProject[] | null;
}) {
  return (
    <>
      <Typography variant={'h5'} sx={{textAlign: 'center'}}>{heading}</Typography>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <List sx={{minHeight: 50}} ref={provided.innerRef} {...provided.droppableProps}>
            {projects?.map(({ id, projectId, participantsCount, name }, i) => {
              return (
                <Draggable key={id} draggableId={id.toString()} index={i}>
                  {(provided) => (
                    <ProjectItem
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      projectId={projectId}
                      participantsCount={participantsCount}
                      name={name}
                      refProp={provided.innerRef}
                    ></ProjectItem>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </>
  );
}
