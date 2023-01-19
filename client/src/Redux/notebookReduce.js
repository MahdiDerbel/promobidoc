import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Configuration from "../configuration";
var token = localStorage.getItem("x-access-token");

export const notebookAdded = createAsyncThunk("Notebook/addNotebook", async (action) => {
  const response = await fetch(Configuration.BACK_BASEURL + "Notebook/addNotebook", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action)
  });
  const notebook = await response.status;
  return notebook;
});

export const fetchNotebook = createAsyncThunk("Notebook/fetchNotebook", async () => {
    const response = await fetch(Configuration.BACK_BASEURL + "Notebook/allNotebook", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token':token
    },
    /* body: JSON.stringify({a: 1, b: 'Textual content'}) */
  });
  const notebook = await response.json();
  return notebook;
});

  export const getNotebookbyIdPatient = createAsyncThunk("Notebook/getUploadbyIdPatient", async (id1) => {
    const  id  = id1;
    const response = await fetch(Configuration.BACK_BASEURL + "Notebook/getNotebookbyIdPatient/"+id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token':token
      },
    
    });
    const notebook = await response.json();
    return notebook;
  });

const NotebookReduce = createSlice({
  name: "Notebook",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {

    NotebookUpdated(state, action) {
        fetch(Configuration.BACK_BASEURL + "Notebook/addNotebook", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(action.payload)
        });
      },
    NotebookAdded(state, action) {
        
        fetch(Configuration.BACK_BASEURL + "Notebook/addNotebook", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(action.payload)
        });
      },
    notebookDeleted(state, action) {
      const { id } = action.payload;
      fetch(Configuration.BACK_BASEURL + "Notebook/deleteNotebook/"+id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      
     
    },
    
    
  
    
  },
  extraReducers: {
    [fetchNotebook.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchNotebook.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchNotebook.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { notebookDeleted,NotebookUpdated,NotebookAdded } = NotebookReduce.actions;

export default NotebookReduce.reducer;
