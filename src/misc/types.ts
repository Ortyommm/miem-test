import { Dispatch, SetStateAction } from "react";

export type DraggableType = 'project' | 'break'

export interface IProject {
  id: number;
  name: string;
  participantsCount: number;
  projectId: number;
  type: DraggableType
  //Add time
}

export interface IBreak {
  id: number
  duration: number
  type: DraggableType
}


export interface IModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}


export interface IAppState {
  projectsByDate: { reserve: (IProject|IBreak)[]; [prop: string]: (IProject|IBreak)[] };
  calendar: {
    startTime: Date;
    endTime: Date;
    startDate: Date;
    endDate: Date;
  };
}
export interface IAppStateProps {
  state: IAppState;
  setState: Dispatch<IAppState>;
}
