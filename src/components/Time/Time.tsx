import { Box, Typography } from "@mui/material";
import {format} from "date-fns";

export function Time({timeFrom, timeTo}: {timeFrom: Date, timeTo: Date}) {
    const timeFormat = (date: Date) => format(date, 'HH:mm')

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
      <Typography variant={"body2"}>{timeFormat(timeFrom)} - {timeFormat(timeTo)}</Typography>{" "}
    </Box>
  );
}
