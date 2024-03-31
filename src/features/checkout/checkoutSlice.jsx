import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  }
);

const initialState = {
  info: [],

  address: "",
};

function getInfoFromLocalStorage() {
  return JSON.parse(localStorage.getItem("info")) || initialState;
}

const checkoutSlice = createSlice({
  name: "user",
  initialState: getInfoFromLocalStorage(),
  reducers: {
    getInfo(state, action) {
      state.info.push(action.payload);
      localStorage.setItem("info", JSON.stringify(state));
    },

    clearInfo(state) {
      state.info = [];
    },
  },
  extraReducers: (builder) => {
    // Thunk actions will be handled here
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.address = action.payload.address;
    });
  },
});

export const { getInfo, clearInfo } = checkoutSlice.actions;
export default checkoutSlice.reducer;
