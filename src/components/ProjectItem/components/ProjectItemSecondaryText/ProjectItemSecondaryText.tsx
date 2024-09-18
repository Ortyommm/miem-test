import { Typography } from "@mui/material";
import {getSecondaryText} from "./helpers.ts";

export function ProjectItemSecondaryText({participantsCount}: {participantsCount: number}) {
  return (
      <Typography
        variant={"body1"}
        sx={{ color: "#ccc", fontSize: 12, fontWeight: 300 }}
      >
        {participantsCount} {getSecondaryText(participantsCount)}
      </Typography>
  );
}
