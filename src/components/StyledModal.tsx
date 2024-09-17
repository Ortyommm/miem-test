import {Backdrop, Box, Fade, Modal} from "@mui/material";
import {ReactNode} from "react";
import {IModalProps} from "../misc/types.ts";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

export function StyledModal({ open, setOpen, children, onClose }: IModalProps & {children: ReactNode}) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
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
            {children}
        </Box>
      </Fade>
    </Modal>
  );
}
