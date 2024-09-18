import { IAppStateProps, IModalProps } from "../../../misc/types.ts";
import { StyledModal } from "../../StyledModal.tsx";
import { Box, Button,  TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DateSelector } from "../../DateSelector/DateSelector.tsx";
import { cloneDeep } from "lodash-es";
import {getStringByDate, getUid} from "../../../misc/helpers.ts";

export function BreaksModal({
  open,
  setOpen,
  onClose,
  state,
  setState,
}: IModalProps & IAppStateProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const onChange = (date: Date | null) => {
    setStartDate(date);
  };

  const addBreak = () => {
    if (!startDate) return;
    //TODO add error
    const stateCopy = cloneDeep(state);
    const { projectsByDate } = stateCopy;
    const key = getStringByDate(startDate);
    if (!projectsByDate[key]) projectsByDate[key] = [];

    projectsByDate[key].push({
      type: "break",
      duration: Number(hours) * 60 + Number(minutes),
      id: getUid(),
    });

    setState(stateCopy);
  };

  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  return (
    <StyledModal open={open} setOpen={setOpen} onClose={onClose}>
      <Typography variant="h6">Добавление перерыва</Typography>
      <DateSelector
        selectsRange={false}
        startDate={startDate}
        onChange={onChange}
      />
      <Typography variant="body1">Длительность</Typography>
      <Box sx={{ display: "flex" }}>
        <TextField
          label="час"
          value={hours}
          onChange={(event) => setHours(event.target.value)}
        />
        <TextField
          label="мин"
          value={minutes}
          onChange={(event) => setMinutes(event.target.value)}
        />
      </Box>
      <Button onClick={addBreak}>Добавить</Button>
    </StyledModal>
  );
}
