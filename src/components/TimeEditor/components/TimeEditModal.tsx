import { StyledModal } from "../../StyledModal.tsx";
import { IModalProps, ITimeEditState } from "../../../misc/types.ts";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "react-datepicker/dist/react-datepicker.css";
import { TimeField } from "@mui/x-date-pickers";

export function TimeEditModal({
  open,
  setOpen,
  state,
  setState,
}: IModalProps & ITimeEditState) {
  const [showCalendar, setShowCalendar] = useState(false);


  const { startTime, endTime, startDate, endDate } = state;

  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setState({ ...state, startDate: start, endDate: end });
  };

  return (
    <StyledModal open={open} setOpen={setOpen}>
      <Typography variant="h6">Редактирование графика работы</Typography>
      <Box>
        <Typography>Даты</Typography>
        <Button
          endIcon={<CalendarTodayIcon />}
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {startDate && endDate
            ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
            : "Выберите даты"}
        </Button>
        <Box sx={{ display: showCalendar ? "flex" : "none" }}>
          <DatePicker
            locale="ru"
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </Box>
      </Box>
      <Box>
        <Box>
          <TimeField
            label="С"
            value={startTime}
            onChange={() =>
              setState({
                ...state,
                startTime,
              })
            }
          />
          <TimeField
            label="До"
            value={endTime}
            onChange={() =>
              setState({
                ...state,
                endTime,
              })
            }
          />
        </Box>
      </Box>
    </StyledModal>
  );
}
