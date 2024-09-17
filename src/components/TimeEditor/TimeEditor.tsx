import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box, Button } from "@mui/material";
import { useState} from "react";
import { TimeEditModal } from "./components/TimeEditModal.tsx";
import { ITimeEditState} from "../../misc/types.ts";

export function TimeEditor({state, setState}: ITimeEditState) {
  const [openTimeEditModal, setOpenTimeEditModal] = useState(false);

  return (
    <>
      <TimeEditModal open={openTimeEditModal} setOpen={setOpenTimeEditModal} state={state} setState={setState} />
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
