import {format} from "date-fns";

export function getStringByDate(date: Date) {
    return format(date, 'dd-mm-yyyy');
}
