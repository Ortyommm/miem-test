import { StyledModal } from "../../StyledModal.tsx";
import { IAppStateProps, IModalProps, ToggleSnackbarFunction } from "../../../misc/types.ts";
import { Alert, Box, Button } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import { TimeField } from "@mui/x-date-pickers";
import { DateSelector } from "../../DateSelector/DateSelector.tsx";
import { useState } from "react";
import { stateDateProtection } from "../../../misc/helpers.ts";

export function TimeEditModal({
  open,
  setOpen,
  state,
  setState,
  toggleSnackbar,
}: IModalProps & IAppStateProps & { toggleSnackbar: ToggleSnackbarFunction }) {
  const { startTime, endTime, startDate, endDate } = state.calendar;

  const [localStartDate, setLocalStartDate] = useState<Date>(startDate);
  const [localEndDate, setLocalEndDate] = useState<Date>(endDate);
  const [localStartTime, setLocalStartTime] = useState<Date>(startTime);
  const [localEndTime, setLocalEndTime] = useState<Date>(endTime);
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (!start || !end) return;
    setLocalStartDate(start);
    setLocalEndDate(end);
  };

  const onSave = () => {
    if (!localStartDate || !localEndDate || !localStartTime || !localEndTime) {
      setErrorMessage("Введите все поля");
      return;
    }

    if (localStartTime.valueOf() >= localEndTime.valueOf()) {
      setErrorMessage('Время "С" не может быть позже или равно времени "До"');
      return;
    }

    setErrorMessage("");

    setOpen(false);
    const stateShallowCopy = {
      ...state,
      calendar: {
        ...state.calendar,
        startTime: localStartTime || startTime,
        endTime: localEndTime || endTime,
        startDate: localStartDate || startDate,
        endDate: localEndDate || endDate,
      },
    };
    //Перемещаем проект в резерв, если он проходит в день, не находящимся в диапазоне допустимых дней
    const updatedState = stateDateProtection(stateShallowCopy);
    toggleSnackbar(updatedState, stateShallowCopy);
    setState(updatedState);
  };

  const onCancel = () => {
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
    setLocalStartTime(startTime);
    setLocalEndTime(endTime);
  };

  return (
    <StyledModal open={open} setOpen={setOpen} heading="Редактирование графика работы">
      <Box>
        <DateSelector
          startDate={localStartDate}
          endDate={localEndDate}
          onChange={onChange}
          selectsRange={true}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <TimeField
          label="С"
          value={localStartTime}
          onChange={(date) => {
            if (date) setLocalStartTime(date);
          }}
        />
        <TimeField
          label="До"
          value={localEndTime}
          onChange={(date) => {
            if (date) setLocalEndTime(date);
          }}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button onClick={onSave} variant="contained">
          Сохранить
        </Button>
        <Button onClick={onCancel}>Сбросить</Button>
      </Box>
      {errorMessage && (
        <Alert sx={{ mt: 2 }} severity="error">
          {errorMessage}
        </Alert>
      )}
    </StyledModal>
  );
}
