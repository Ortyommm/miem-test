import { List, Typography } from "@mui/material";
import { ProjectItem } from "../../ProjectItem/ProjectItem.tsx";
import {IProject} from "../../../misc/types.ts";

export function DayView({heading, projects}: {heading: string, projects: IProject[] | null}) {
  return (
    <>
      <Typography>{heading}</Typography>
      {
        <List>
          {projects?.map(({ uid, projectId, participantsCount, name }) => {
            return (
              <ProjectItem
                key={uid}
                projectId={projectId}
                participantsCount={participantsCount}
                name={name}
              />
            );
          })}
        </List>
      }
    </>
  );
}
