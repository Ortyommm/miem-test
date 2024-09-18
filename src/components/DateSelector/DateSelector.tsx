import { Box, Button } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";

export function DateSelector(
  props:
    | {
        selectsRange: false;
        startDate: Date | null;
        endDate?: undefined;
        onChange: (dates: Date | null) => void;
      }
    | {
        selectsRange: true;
        onChange: (dates: [Date | null, Date | null]) => void;
        startDate: Date | null;
        endDate: Date | null;
      },
) {
  const { startDate, endDate, selectsRange, onChange } = props;

  const [showCalendar, setShowCalendar] = useState(false);
  useEffect(() => {
      //Close calendar after date select
    if (!selectsRange) setShowCalendar(false);
  }, [startDate]);


  const getDateText = () => {
    if (selectsRange && startDate && endDate) {
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    }
    if (selectsRange) return "Выберите даты";
    if (startDate) return `${startDate.toLocaleDateString()}`;
    return "Выберите дату";
  };

  return (
    <>
      <Button
        endIcon={<CalendarTodayIcon />}
        onClick={() => setShowCalendar(!showCalendar)}
      >
        {getDateText()}
      </Button>
      <Box sx={{ display: showCalendar ? "flex" : "none" }}>
        {selectsRange ? (
          <DatePicker
            locale="ru"
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        ) : (
          <DatePicker
            locale="ru"
            selected={startDate}
            onChange={onChange}
            inline
          />
        )}
      </Box>{" "}
    </>
  );
}
