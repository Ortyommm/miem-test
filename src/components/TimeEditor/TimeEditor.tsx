import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { TimeEditModal } from "./components/TimeEditModal.tsx";
import {IAppStateProps, ToggleSnackbarFunction} from "../../misc/types.ts";
import { BreaksModal } from "./components/BreaksModal.tsx";

export function TimeEditor({ state, setState, toggleSnackbar }: IAppStateProps & {toggleSnackbar: ToggleSnackbarFunction}) {
  const [openTimeEditModal, setOpenTimeEditModal] = useState(false);
  const [openBreaksModal, setOpenBreaksModal] = useState(false);



  return (
    <>
      <TimeEditModal
        open={openTimeEditModal}
        setOpen={setOpenTimeEditModal}
        state={state}
        setState={setState}
        toggleSnackbar={toggleSnackbar}
      />
      <BreaksModal
        open={openBreaksModal}
        setOpen={setOpenBreaksModal}
        state={state}
        setState={setState}
        toggleSnackbar={toggleSnackbar}
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
          onClick={() => setOpenBreaksModal(true)}
        >
          Добавить перерыв
        </Button>
      </Box>
    </>
  );
}
