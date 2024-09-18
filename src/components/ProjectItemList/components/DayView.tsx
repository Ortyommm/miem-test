import { List, Typography } from "@mui/material";
import { ProjectItem } from "../../ProjectItem/ProjectItem.tsx";
import { IBreak, IProject } from "../../../misc/types.ts";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BreakItem } from "../../BreakItem/BreakItem.tsx";
import { addMinutes } from "date-fns";

const getProjectDuration = (participantsCount: number) =>
  20 + 5 * participantsCount;

const getTimeFrom = (
  items: (IProject | IBreak)[],
  itemI: number,
  startTime: Date,
) => {
  let timeFrom = startTime;

  for (let i = 0; i < itemI; i++) {
    const item = items[i];
    if (item.type === "project") {
      timeFrom = addMinutes(
        timeFrom,
        getProjectDuration((item as IProject).participantsCount),
      );
    } else {
      timeFrom = addMinutes(timeFrom, (item as IBreak).duration);
    }
  }

  return timeFrom;
};

const getTimeTo = (
  items: (IProject | IBreak)[],
  itemI: number,
  startTime: Date,
) => {
  const timeFrom = getTimeFrom(items, itemI, startTime);
  const item = items[itemI];
  return addMinutes(
    timeFrom,
    item.type === "project"
      ? getProjectDuration((item as IProject).participantsCount)
      : (item as IBreak).duration,
  );
};

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
      <Typography variant={"h5"} sx={{ textAlign: "center" }}>
        {heading}
      </Typography>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <List
            sx={{ minHeight: 50 }}
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
                const { id, duration } = item as IBreak;

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
                //TODO add draggable
              }
            })}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </>
  );
}
