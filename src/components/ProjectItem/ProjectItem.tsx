import ListItem from "@mui/material/ListItem";
import { ListItemText } from "@mui/material";
import { ProjectItemPrimaryText } from "./components/ProjectItemPrimaryText.tsx";
import { ProjectItemSecondaryText } from "./components/ProjectItemSecondaryText/ProjectItemSecondaryText.tsx";
import {Time} from "./Time/Time.tsx";

export function ProjectItem({
  projectId,
  name,
  participantsCount,
}: {
  projectId: number;
  name: string;
  participantsCount: number;
}) {
  return (
    <ListItem sx={{ background: "#fff" }}>
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
