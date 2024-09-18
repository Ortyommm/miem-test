import { IAppStateProps, IModalProps, ToggleSnackbarFunction } from "../../../misc/types.ts";
import { StyledModal } from "../../StyledModal.tsx";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DateSelector } from "../../DateSelector/DateSelector.tsx";
import { cloneDeep } from "lodash-es";
import { getStringByDate, getUid, stateDateProtection } from "../../../misc/helpers.ts";

export function BreaksModal({
  open,
  setOpen,
  state,
  setState,
  toggleSnackbar,
}: IModalProps & IAppStateProps & { toggleSnackbar: ToggleSnackbarFunction }) {
  const [startDate, setStartDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (date: Date | null) => {
    if (date) setStartDate(date);
  };

  const addBreak = () => {
    if (+minutes > 59 || +minutes < 0 || isNaN(+minutes)) {
      setErrorMessage("Введите количество минут от 0 до 59");
      return;
    }

    if (+hours > 5 || +hours < 0 || isNaN(+hours)) {
      setErrorMessage("Введите количество часов от 0 до 5");
      return;
    }

    if(+hours === 0 && +minutes === 0) {
      setErrorMessage("Введите время");
      return;
    }

    if (!startDate) {
      setErrorMessage("Введите все поля");
      return;
    }

    setErrorMessage("");

    setOpen(false);
    setHours('0')
    setMinutes('0')
    const stateCopy = cloneDeep(state);
    const { projectsByDate } = stateCopy;
    const key = getStringByDate(startDate);
    if (!projectsByDate[key]) projectsByDate[key] = [];

    projectsByDate[key].push({
      type: "break",
      duration: Number(hours) * 60 + Number(minutes),
      id: getUid(),
    });

    const updatedState = stateDateProtection(stateCopy);
    toggleSnackbar(updatedState, stateCopy);
    setState(updatedState);
  };

  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  return (
    <StyledModal open={open} setOpen={setOpen} heading="Добавление перерыва">
      <Box>
        <DateSelector selectsRange={false} startDate={startDate} onChange={onChange} />
      </Box>
      <Typography sx={{ mt: 2 }} variant="body1">
        Длительность
      </Typography>
      <Box sx={{ display: "flex", mt: 2, gap: 1 }}>
        <TextField label="час" value={hours} onChange={(event) => setHours(event.target.value)} />
        <TextField
          label="мин"
          value={minutes}
          onChange={(event) => setMinutes(event.target.value)}
        />
      </Box>
      <Button sx={{ mt: 2 }} variant="contained" onClick={addBreak}>
        Добавить
      </Button>
      {errorMessage && (
        <Alert sx={{ mt: 2 }} severity="error">
          {errorMessage}
        </Alert>
      )}
    </StyledModal>
  );
}
