import ListItem from "@mui/material/ListItem";
import { ListItemText } from "@mui/material";
import { ProjectItemPrimaryText } from "./components/ProjectItemPrimaryText.tsx";
import { ProjectItemSecondaryText } from "./components/ProjectItemSecondaryText/ProjectItemSecondaryText.tsx";
import { Time } from "./Time/Time.tsx";
import { Ref } from "react";
// import {
//   DraggableProvidedDraggableProps,
//   DraggableProvidedDragHandleProps,
// } from "react-beautiful-dnd";

export function ProjectItem({
  projectId,
  name,
  participantsCount,
  refProp,
  ...rest
}: {
  projectId: number;
  name: string;
  participantsCount: number;
  refProp: Ref<any>;
  [x: string]: any
} /*& DraggableProvidedDraggableProps & DraggableProvidedDragHandleProps*/) {
  return (
    <ListItem {...rest} sx={{ background: "#fff" }} ref={refProp}>
      <Time participantsCount={participantsCount} />
      <ListItemText
        primary={<ProjectItemPrimaryText projectId={projectId} name={name} />}
        secondary={
          <ProjectItemSecondaryText participantsCount={participantsCount} />
        }
        disableTypography={true}
      />
    </ListItem>
  );
}
