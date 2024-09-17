import { Dispatch, SetStateAction } from "react";

export interface IProject {
  id: number;
  name: string;
  participantsCount: number;
  projectId: number;
  //Add time
}



export interface IModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}


export interface IAppState {
  projectsByDate: { reserve: IProject[]; [prop: string]: IProject[] };
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
