import { StyledModal } from "../../StyledModal.tsx";
import { IAppStateProps, IModalProps } from "../../../misc/types.ts";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "react-datepicker/dist/react-datepicker.css";
import { TimeField } from "@mui/x-date-pickers";
import {DateSelector} from "../../DateSelector/DateSelector.tsx";

export function TimeEditModal({
  open,
  setOpen,
  state,
  setState,
  onClose,
}: IModalProps & IAppStateProps) {

  const { startTime, endTime, startDate, endDate } = state.calendar;

  const onChange = (dates: [Date|null, Date|null]) => {
    const [start, end] = dates;
    setState({
      ...state,
      calendar: { ...state.calendar, startDate: start, endDate: end },
    });
  };

  return (
    <StyledModal open={open} setOpen={setOpen} onClose={onClose}>
      <Typography variant="h6">Редактирование графика работы</Typography>
      <Box>
        <Typography>Даты</Typography>
        <DateSelector startDate={startDate} endDate={endDate} onChange={onChange} selectsRange={true}/>
      </Box>
      <Box>
        <Box>
          <TimeField
            label="С"
            value={startTime}
            onChange={() =>
              setState({
                ...state,
                calendar: { ...state.calendar, startTime },
              })
            }
          />
          <TimeField
            label="До"
            value={endTime}
            onChange={() =>
              setState({
                ...state,
                calendar: { ...state.calendar, endTime },
              })
            }
          />
        </Box>
      </Box>
    </StyledModal>
  );
}
