import { List, Typography } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {getTimeFrom, getTimeTo} from "./helpers.ts";
import {IBreak, IProject} from "../../../../misc/types.ts";
import {ProjectItem} from "../../../ProjectItem/ProjectItem.tsx";
import {BreakItem} from "../../../BreakItem/BreakItem.tsx";



export function DayView({
  heading,
  items,
  droppableId,
  startTime,
}: {
  heading: string;
  droppableId: string;
  items: (IProject | IBreak)[] | null;
  startTime: Date;
}) {
  return (
    <>
      <Typography variant={"h5"} sx={{ textAlign: "center", mt: 5 }}>
        {heading}
      </Typography>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <List
            sx={{ minHeight: 60, }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items?.map((item, i) => {
              if (item.type === "project") {
                const { id, projectId, participantsCount, name } =
                  item as IProject;
                return (
                  <Draggable key={id} draggableId={id.toString()} index={i}>
                    {(provided) => {
                      return (
                        <ProjectItem
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          projectId={projectId}
                          participantsCount={participantsCount}
                          name={name}
                          refProp={provided.innerRef}
                          timeFrom={getTimeFrom(items, i, startTime)}
                          timeTo={getTimeTo(items, i, startTime)}
                        ></ProjectItem>
                      );
                    }}
                  </Draggable>
                );
              } else {
                const { id } = item as IBreak;

                return (
                  <Draggable key={id} draggableId={id.toString()} index={i}>
                    {(provided) => (
                      <BreakItem
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        timeFrom={getTimeFrom(items, i, startTime)}
                        timeTo={getTimeTo(items, i, startTime)}
                        refProp={provided.innerRef}
                      />
                    )}
                  </Draggable>
                );
              }
            })}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </>
  );
}
