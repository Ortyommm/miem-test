import "./App.css";
import { Container, Snackbar } from "@mui/material";
import { useState } from "react";
import { IAppState } from "./misc/types.ts";
import { ProjectItemList } from "./components/ProjectItemList/ProjectItemList.tsx";
import { TimeEditor } from "./components/TimeEditor/TimeEditor.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import { setDefaultOptions } from "date-fns";
import { cloneDeep } from "lodash-es";
import { stateDateProtection } from "./misc/helpers.ts";
registerLocale("ru", ru);
setDefaultOptions({ locale: ru });

const startTime = new Date();
const endTime = new Date();
startTime.setHours(10);
startTime.setMinutes(0);
endTime.setHours(18);
endTime.setMinutes(0);

const startDate = new Date();
const endDate = new Date(new Date().getTime() + 604800000 /*Неделя в милисекундах*/);

function App() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [state, setState] = useState<IAppState>({
    projectsByDate: {
      reserve: [
        {
          type: "project",
          projectId: 858,
          participantsCount: 1,
          name: "DataFlow вычислительная система: Телекоммуникационная система суперкомпьютера",
          id: 0,
        },
        {
          type: "project",
          projectId: 858,
          participantsCount: 3,
          name: "Проект 2",
          id: 1,
        },
        {
          type: "project",
          projectId: 20,
          participantsCount: 4,
          name: "Проект 3",
          id: 2,
        },
        {
          type: "project",
          projectId: 858,
          participantsCount: 2,
          name: "Проект 4",
          id: 3,
        },
        {
          type: "project",
          projectId: 20,
          participantsCount: 1,
          name: "Проект 5",
          id: 4,
        },
      ],
    },

    calendar: {
      startTime,
      endTime,
      startDate,
      endDate,
    },
    // breaks: [],
  });

  const toggleSnackbar = (newState: IAppState, oldState: IAppState) => {
    if (newState.projectsByDate.reserve.length > oldState.projectsByDate.reserve.length) {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false)
      }, 3000)
    }
  }

  function onDragEnd({ source, destination, draggableId }: DropResult) {
    if (!destination) return;
    const stateCopy = cloneDeep(state);
    const projectsByDate = stateCopy.projectsByDate;

    if (!projectsByDate[destination.droppableId]) projectsByDate[destination.droppableId] = [];

    const handledProject = projectsByDate[source.droppableId].find(
      (project) => project.id.toString() === draggableId,
    )!;

    projectsByDate[source.droppableId] = projectsByDate[source.droppableId].filter((project) => {
      return project.id.toString() !== draggableId;
    });

    projectsByDate[destination.droppableId].splice(destination.index, 0, handledProject);
    // if(source.droppableId !== destination.droppableId)
    const updatedState = stateDateProtection(stateCopy);
    toggleSnackbar(updatedState, stateCopy)


    setState(updatedState);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={5000}
          message="Некоторые проекты/перерывы были перемещены в резервный список"
        />
        <Container>
          <TimeEditor state={state} setState={setState} toggleSnackbar={toggleSnackbar} />
          <ProjectItemList state={state} />
        </Container>
      </LocalizationProvider>
    </DragDropContext>
  );
}

export default App;
