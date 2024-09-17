import { Box, Typography } from "@mui/material";

export function ProjectItemPrimaryText({projectId, name}: {projectId: number, name: string}) {
  return (
    <Box sx={{ display: "flex" }}>

      <Typography
        variant={"body1"}
        sx={{ fontSize: 14, fontWeight: 500, mr: 1 }}
      >
          <span
              style={{ color: "#FF6D00", fontSize: 14, fontWeight: 500 }}
          >
              {projectId}
          </span> {name}

      </Typography>
    </Box>
  );
}
