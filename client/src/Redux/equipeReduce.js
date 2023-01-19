import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Configuration from "../configuration";
var token = localStorage.getItem("x-access-token");

export const equipeAdded = createAsyncThunk("equipe/addEquipe", async (action) => {
  const response = await fetch(Configuration.BACK_BASEURL + "equipe/addEquipe", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action)
  });
  const equipe = await response.status;
  return equipe;
});
export const fetchEquipes = createAsyncThunk("equipe/fetchEquipes", async () => {
  const response = await fetch(Configuration.BACK_BASEURL + "equipe/allEquipe", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token':token
    },
    /* body: JSON.stringify({a: 1, b: 'Textual content'}) */
  });
  const equipes = await response.json();
  return equipes;
});

export const equipeGetById = createAsyncThunk("equipe/equipeGetById", async (id1) => {
  const  id  = id1;
  const response = await fetch(Configuration.BACK_BASEURL + "equipe/getEquipe", {
    method: 'POST',
    headers: {
      'id':id,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token':token
    },
  
  });
  const equipeBase = await response.json();
  return equipeBase;
});
export const getActiveEquipe = createAsyncThunk("equipe/getActive", async () => {
  const response = await fetch(Configuration.BACK_BASEURL + "equipe/getActive", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token':token
    },
  
  });
  const equipe = await response.json();
  return equipe;
});
const equipesReduce = createSlice({
  name: "equipes",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    equipeDeleted(state, action) {
      const { id } = action.payload;
      fetch(Configuration.BACK_BASEURL + "equipe/deleteEquipe/"+id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
    },
  },
  extraReducers: {
    [fetchEquipes.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchEquipes.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchEquipes.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { equipeDeleted } = equipesReduce.actions;

export default equipesReduce.reducer;
