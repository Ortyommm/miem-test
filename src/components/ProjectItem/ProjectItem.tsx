import ListItem from "@mui/material/ListItem";
import { ListItemText } from "@mui/material";
import { ProjectItemPrimaryText } from "./components/ProjectItemPrimaryText.tsx";
import { ProjectItemSecondaryText } from "./components/ProjectItemSecondaryText/ProjectItemSecondaryText.tsx";
import { Ref } from "react";
import {Time} from "../Time/Time.tsx";

export function ProjectItem(
  {
    projectId,
    name,
    participantsCount,
    refProp,
    timeFrom,
      timeTo,
    ...rest
  }: {
    projectId: number;
    name: string;
    participantsCount: number;
    timeFrom: Date;
    timeTo: Date;
    refProp: Ref<any>;
    [x: string]: any;
  } /*& DraggableProvidedDraggableProps & DraggableProvidedDragHandleProps*/,
) {
  return (
    <ListItem {...rest} sx={{ background: "#fff" }} ref={refProp}>
      <Time timeFrom={timeFrom} timeTo={timeTo} />
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
