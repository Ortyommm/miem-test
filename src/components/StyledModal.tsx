import {
  Backdrop,
  Box,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { IModalProps } from "../misc/types.ts";
import { Cancel } from "@mui/icons-material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export function StyledModal({
  open,
  setOpen,
  children,
  heading,
}: IModalProps & { heading: string; children: ReactNode }) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{mb: 3}}>{heading}</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <Cancel />
            </IconButton>
          </Box>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
}
