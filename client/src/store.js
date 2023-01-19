import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Redux/usersReduce";
import roleReducer from "./Redux/roleReduce";
import settingsReducer from "./Redux/settingsReduce";
import equipeReducer from "./Redux/equipeReduce";
import patientReducer from "./Redux/patientReduce";
import uploadReducer from "./Redux/uploadReduce";
import notebookReducer from "./Redux/notebookReduce";
export default configureStore({
  reducer: {
    users: usersReducer,
    role: roleReducer,
    settings: settingsReducer,
    equipe: equipeReducer,
    patient: patientReducer,
    upload: uploadReducer,
    notebook: notebookReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false,}),
});
