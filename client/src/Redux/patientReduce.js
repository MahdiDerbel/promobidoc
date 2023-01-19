import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Configuration from "../configuration";
var token = localStorage.getItem("x-access-token");

export const patientAdded = createAsyncThunk("patient/addPatient", async (action) => {
  const response = await fetch(Configuration.BACK_BASEURL + "patient/addPatient", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action)
  });
  const patient = await response.status;
  return patient;
});

export const fetchPatient = createAsyncThunk("patient/fetchPatient", async () => {
  const response = await fetch(Configuration.BACK_BASEURL + "patient/allPatient", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token':token
    },
    /* body: JSON.stringify({a: 1, b: 'Textual content'}) */
  });
  const patient = await response.json();
  return patient;
});

export const patientGetById = createAsyncThunk("patient/patientGetById", async (id1) => {
  const  id  = id1;
  const response = await fetch(Configuration.BACK_BASEURL + "patient/getPatient", {
    method: 'POST',
    headers: {
      'id':id,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token':token
    },
  
  });
  const patientBase = await response.json();
  return patientBase;
});

const PatientsReduce = createSlice({
  name: "patients",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    patientDeleted(state, action) {
      const { id } = action.payload;
      fetch(Configuration.BACK_BASEURL + "patient/deletePatient/"+id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
    },
    
  },
  extraReducers: {
    [fetchPatient.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchPatient.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchPatient.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { patientDeleted } = PatientsReduce.actions;

export default PatientsReduce.reducer;
