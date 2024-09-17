import "./App.css";
import { Container } from "@mui/material";
import { useState } from "react";
import { IAppState } from "./misc/types.ts";
import { ProjectItemList } from "./components/ProjectItemList/ProjectItemList.tsx";
import { TimeEditor } from "./components/TimeEditor/TimeEditor.tsx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {registerLocale} from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import {setDefaultOptions} from "date-fns";
registerLocale("ru", ru);
setDefaultOptions({locale: ru})

const startTime = new Date()
const endTime = new Date()
startTime.setHours(10)
startTime.setMinutes(0)
endTime.setHours(18)
endTime.setMinutes(0)

const startDate = new Date()
const endDate = new Date(new Date().getTime() + 604800000/*Неделя в милисекундах*/)


function App() {
  const [state, setState] = useState<IAppState>({
    reserveProjects: [
      {
        projectId: 858,
        participantsCount: 1,
        name: "DataFlow вычислительная система: Телекоммуникационная система суперкомпьютера",
        uid: 0,
      },
    ],
    projectsByDate: {

    },

    calendar: {
      startTime,
      endTime,
      startDate,
      endDate
    }
    // breaks: [],
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <Container>
        <TimeEditor
          state={state.calendar}
          setState={(calendar: IAppState["calendar"]) => setState({...state, calendar })}
        />
        <ProjectItemList state={state} setState={setState} />
      </Container>
    </LocalizationProvider>
  );
}

export default App;
