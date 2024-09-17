import {Dispatch, SetStateAction} from "react";

export interface IProject {
    uid: number;
    name: string;
    participantsCount: number;
    projectId: number
    //Add time
}

export interface IModalProps {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}

export interface IAppState {
    reserveProjects: IProject[]
    projectsByDate: {[prop: string]: IProject[]}
    calendar: {
        startTime: Date
        endTime: Date
        startDate: Date
        endDate: Date
    }

}
export interface ITimeEditState {state: IAppState["calendar"], setState: Dispatch<IAppState['calendar']>}
