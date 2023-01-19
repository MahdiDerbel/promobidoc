import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Configuration from "../configuration";
var token = localStorage.getItem("x-access-token");

export const fetchFile = createAsyncThunk("FileUpload/file", async (file) => {
  const response = await fetch(Configuration.BACK_BASEURL + "FileUpload/file/" + file, {
    method: "GET",
    responseType: "blob",
    //Force to receive data in a Blob Format
  })
    .then((response) => {
      return response.url;
    })
    .catch((error) => {
      console.log(error);
    })
    const document = await response;
    return document;
});
export const getUpload = createAsyncThunk("/FileUpload/getUpload", async (id1) => {
  const id=id1
  const response = await fetch(Configuration.BACK_BASEURL + "FileUpload/getUpload", {
    method: 'POST',
    headers: {
      'id':id,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token':token
    },
    
  
  });
  const upload = await response.json();
  return upload;
});
export const getUploadbyIdPatient = createAsyncThunk("upload/getUploadbyIdPatient", async (id1) => {
  const  id  = id1;
  const response = await fetch(Configuration.BACK_BASEURL + "FileUpload/getUploadbyIdPatient/"+id, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token':token
    },
  
  });
  const upload = await response.json();
  return upload;
});


export const getFile = createAsyncThunk("/FileUpload/getFile", async (file) => { 
  const response = await fetch(Configuration.BACK_BASEURL + "FileUpload/getFile/"+file.file, {
    method: 'GET',  
    responseType: 'blob'
  })
  return response;
});
const uploadReduce = createSlice({
  name: "upload",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    uploadUpdated(state, action) {

      
      fetch(Configuration.BACK_BASEURL + "FileUpload/saveFile", {
        method: 'POST',
        headers: {'Accept': 'application/*',
        },
        body:action.payload.dataArray
      });

      fetch(Configuration.BACK_BASEURL + "FileUpload/addUpload", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          
        }, 
        body:JSON.stringify(action.payload.settingsObj)
      });
    },
    fileDeleted(state, action) {
        const { id } = action.payload;
        fetch(Configuration.BACK_BASEURL + "FileUpload/deleteFile/"+id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });
      },
    
   
    

  },
  extraReducers: {
    [getUpload.pending]: (state, action) => {
      state.loading = true;
    },
    [getUpload.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, action.payload];
    },
    [getUpload.rejected]: (state, action) => {
      state.loading = false;
    },
    [getFile.pending]: (state, action) => {
      state.loading = true;
    },
    [getFile.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, action.payload];
    },
    [getFile.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { uploadUpdated,fileDeleted } = uploadReduce.actions;

export default uploadReduce.reducer;

