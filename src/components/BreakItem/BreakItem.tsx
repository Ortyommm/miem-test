import { Ref } from "react";
import ListItem from "@mui/material/ListItem";
import { ListItemText } from "@mui/material";
import { intervalToDuration } from "date-fns";
import { Time } from "../Time/Time.tsx";
import { itemBoxShadow } from "../../misc/helpers.ts";

export function BreakItem({
  timeFrom,
  timeTo,
  refProp,
  ...rest
}: {
  timeFrom: Date;
  timeTo: Date;
  refProp: Ref<any>;
  [x: string]: any;
}) {
  const interval = intervalToDuration({ start: timeFrom, end: timeTo });
  const hours = interval.hours;
  const minutes = interval.minutes;

  return (
    <ListItem
      {...rest}
      ref={refProp}
      sx={{ background: "rgba(255, 109, 0, 0.15)", boxShadow: itemBoxShadow }}
    >
      <Time timeFrom={timeFrom} timeTo={timeTo} />
      <ListItemText
        primary={`Перерыв`}
        secondary={`${hours ? hours + " ч" : ""} ${minutes ? minutes + " мин" : ""}`}
      />
    </ListItem>
  );
}
