import { Box, Button, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { getStringByDate } from "../../misc/helpers.ts";

export function DateSelector(
  props:
    | {
        selectsRange: false;
        startDate: Date ;
        endDate?: undefined;
        onChange: (dates: Date | null) => void;
      }
    | {
        selectsRange: true;
        onChange: (dates: [Date | null, Date | null]) => void;
        startDate: Date ;
        endDate: Date ;
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
      return `${getStringByDate(startDate)} - ${getStringByDate(endDate)}`;
    }
    if (selectsRange) return "Выберите даты";
    if (startDate) return `${getStringByDate(startDate)}`;
    return "Выберите дату";
  };

  return (
    <Box>
      <Typography variant="body1">{selectsRange ? "Даты:" : "Дата:"}</Typography>
      <Button
        sx={{ pl: 0 }}
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
          <DatePicker locale="ru" selected={startDate} onChange={onChange} inline />
        )}
      </Box>
    </Box>
  );
}
