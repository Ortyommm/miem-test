import { IAppState } from "../../misc/types.ts";
import { addDays, format, intervalToDuration } from "date-fns";
import { DayView } from "./components/DayView/DayView.tsx";
import { getStringByDate } from "../../misc/helpers.ts";

export function ProjectItemList({
  state,
}: {
  state: IAppState;
}) {
  const getDateDiff = () =>
    intervalToDuration({
      start: state.calendar.startDate,
      end: state.calendar.endDate,
    }).days || 0;

  const days = [];
  for (let i = 0; i <= getDateDiff(); i++) {
    const currentDate = addDays(state.calendar.startDate, i);

    days.push(
      <DayView
        droppableId={getStringByDate(currentDate)}
        key={getStringByDate(currentDate)}
        heading={format(currentDate, "dd LLL")}
        items={state.projectsByDate[getStringByDate(currentDate)] || null}
        startTime={state.calendar.startTime}
      />,
    );
  }

  return (
    <>
      <DayView
        droppableId="reserve"
        heading="Резервный список"
        items={state.projectsByDate.reserve}
        startTime={state.calendar.startTime}
      />
      {days}
    </>
  );
}
