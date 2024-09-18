import {addDays, format, isWithinInterval, parse} from "date-fns";
import {getTimeFrom, getTimeTo} from "../components/ProjectItemList/components/DayView/helpers.ts";
import {IAppState} from "./types.ts";
import {cloneDeep} from "lodash-es";
//Common helpers for whole app
export const uniqueDateFormat = 'dd.MM.yyyy'

export const itemBoxShadow = '0px 0px 12px 0px rgba(51, 22, 0, 0.08)'

export function getStringByDate(date: Date) {
    return format(date, uniqueDateFormat);
}

let lastId = 100
export const getUid = () => ++lastId

export const stateDateProtection = (state: IAppState) => {
    const stateCopy = cloneDeep(state);
    Object.keys(stateCopy.projectsByDate).forEach((key) => {
        if (key === "reserve") return;
        if (
            !isWithinInterval(parse(key, uniqueDateFormat, new Date()), {
                start: addDays(stateCopy.calendar.startDate, -1),
                end: stateCopy.calendar.endDate,
            })
        ) {
            stateCopy.projectsByDate.reserve = [
                ...stateCopy.projectsByDate.reserve,
                ...stateCopy.projectsByDate[key],
            ];
            stateCopy.projectsByDate[key] = [];
        }
        //Перемещаем проект в резерв, если он выходит за рамки времени

        stateCopy.projectsByDate[key] = stateCopy.projectsByDate[key].filter((project, i) => {
            const timeFrom = getTimeFrom(stateCopy.projectsByDate[key], i, stateCopy.calendar.startTime);
            const timeTo = getTimeTo(stateCopy.projectsByDate[key], i, stateCopy.calendar.startTime);

            const timeFormat = "HH:mm";

            if (
                timeFrom.getDate() === timeTo.getDate() &&
                parse(format(timeTo, timeFormat), timeFormat, new Date()).valueOf() <=
                parse(format(stateCopy.calendar.endTime, timeFormat), timeFormat, new Date()).valueOf()
            ) {
                return true;
            } else {
                stateCopy.projectsByDate.reserve = [...stateCopy.projectsByDate.reserve, project];
                return false;
            }
        });
    });
    return stateCopy
}
