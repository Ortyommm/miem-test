import {IBreak, IProject} from "../../../misc/types.ts";
import {addMinutes} from "date-fns";

export const getProjectDuration = (participantsCount: number) =>
    20 + 5 * participantsCount;

export const getTimeFrom = (
    items: (IProject | IBreak)[],
    itemI: number,
    startTime: Date,
) => {
    let timeFrom = startTime;

    for (let i = 0; i < itemI; i++) {
        const item = items[i];
        if (item.type === "project") {
            timeFrom = addMinutes(
                timeFrom,
                getProjectDuration((item as IProject).participantsCount),
            );
        } else {
            timeFrom = addMinutes(timeFrom, (item as IBreak).duration);
        }
    }

    return timeFrom;
};

export const getTimeTo = (
    items: (IProject | IBreak)[],
    itemI: number,
    startTime: Date,
) => {
    const timeFrom = getTimeFrom(items, itemI, startTime);
    const item = items[itemI];
    return addMinutes(
        timeFrom,
        item.type === "project"
            ? getProjectDuration((item as IProject).participantsCount)
            : (item as IBreak).duration,
    );
};
