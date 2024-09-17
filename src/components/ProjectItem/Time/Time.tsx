import { Box, Typography } from "@mui/material";

export function Time({participantsCount}: {participantsCount: number}) {
  return (
    <Box
      sx={{
        background: "rgba(0,0,0,.06)",
        mr: 2,
        whiteSpace: "nowrap",
        p: 1,
        borderRadius: 5,
        mt: "6px",
        alignSelf: "baseline",
      }}
    >
      <Typography variant={"body2"}>10:00 - 10:25</Typography>{" "}
    </Box>
  );
}
