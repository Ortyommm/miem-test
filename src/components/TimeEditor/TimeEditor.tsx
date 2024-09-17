import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { TimeEditModal } from "./components/TimeEditModal.tsx";
import { IAppStateProps } from "../../misc/types.ts";
import { cloneDeep } from "lodash-es";
import { addDays, isWithinInterval, parse } from "date-fns";
import { uniqueDateFormat } from "../../misc/helpers.ts";

export function TimeEditor({ state, setState }: IAppStateProps) {
  const [openTimeEditModal, setOpenTimeEditModal] = useState(false);

  const onClose = () => {
    setOpenTimeEditModal(false);
    const stateCopy = cloneDeep(state);
    //Перемещаем проект в резерв, если он проходит в день, не находящимся в диапазоне допустимых дней
    Object.keys(stateCopy.projectsByDate).forEach((key) => {
      if (key === "reserve") return;
      if (
        !isWithinInterval(parse(key, uniqueDateFormat, new Date()), {
          start: addDays(state.calendar.startDate, -1),
          end: state.calendar.endDate,
        })
      ) {
        stateCopy.projectsByDate.reserve = [
          ...stateCopy.projectsByDate.reserve,
          ...stateCopy.projectsByDate[key],
        ];
        stateCopy.projectsByDate[key] = [];
      }
    });
    setState(stateCopy)
  };

  return (
    <>
      <TimeEditModal
        open={openTimeEditModal}
        setOpen={setOpenTimeEditModal}
        state={state}
        setState={setState}
        onClose={onClose}
      />
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          gap: 2,
          margin: "20px 0",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditOutlinedIcon />}
          onClick={() => setOpenTimeEditModal(true)}
        >
          Редактировать график
        </Button>
        <Button
          variant={"outlined"}
          size="small"
          startIcon={<AddOutlinedIcon />}
        >
          Добавить перерыв
        </Button>
      </Box>
    </>
  );
}
