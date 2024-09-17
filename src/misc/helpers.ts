import {format} from "date-fns";

export const uniqueDateFormat = 'dd.MM.yyyy'

export function getStringByDate(date: Date) {
    return format(date, uniqueDateFormat);
}
