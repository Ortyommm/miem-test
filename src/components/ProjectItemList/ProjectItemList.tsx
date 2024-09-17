import { IAppState } from "../../misc/types.ts";
import { Dispatch, SetStateAction } from "react";
import { addDays, format, intervalToDuration } from "date-fns";
import { DayView } from "./components/DayView.tsx";
import { getStringByDate } from "../../misc/helpers.ts";

export function ProjectItemList({
  state,
  setState,
}: {
  state: IAppState;
  setState: Dispatch<SetStateAction<IAppState>>;
}) {
  const getDateDiff = () =>
    intervalToDuration({
      start: state.calendar.startDate,
      end: state.calendar.endDate,
    }).days || 0;

  const days = [];
  for (let i = 0; i < getDateDiff(); i++) {
    const currentDate = addDays(state.calendar.startDate, i);

    days.push(
      <DayView
        droppableId={getStringByDate(currentDate)}
        key={getStringByDate(currentDate)}
        heading={format(currentDate, "dd LLL")}
        projects={state.projectsByDate[getStringByDate(currentDate)] || null}
      />,
    );
  }

  return (
    <>
      <DayView
        droppableId="reserve"
        heading="Резервный список"
        projects={state.projectsByDate.reserve}
      />
      {days}
    </>
  );
}
