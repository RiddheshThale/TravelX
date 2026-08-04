import { configureStore, createSlice } from "@reduxjs/toolkit";
import { DESTINATIONS, REVIEWS, INDIA_FEATURED } from "./data/travelData.js";

const destinationsSlice = createSlice({
  name: "destinations",
  initialState: { index: 0 },
  reducers: {
    next: (state) => {
      state.index = (state.index + 1) % DESTINATIONS.length;
    },
    prev: (state) => {
      state.index = (state.index - 1 + DESTINATIONS.length) % DESTINATIONS.length;
    },
  },
});

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { index: 0 },
  reducers: {
    next: (state) => {
      state.index = (state.index + 1) % REVIEWS.length;
    },
    prev: (state) => {
      state.index = (state.index - 1 + REVIEWS.length) % REVIEWS.length;
    },
  },
});

const indiaSlice = createSlice({
  name: "india",
  initialState: { index: 0 },
  reducers: {
    next: (state) => {
      state.index = (state.index + 1) % INDIA_FEATURED.length;
    },
    prev: (state) => {
      state.index = (state.index - 1 + INDIA_FEATURED.length) % INDIA_FEATURED.length;
    },
  },
});

export const destinationsActions = destinationsSlice.actions;
export const reviewsActions = reviewsSlice.actions;
export const indiaActions = indiaSlice.actions;

export const store = configureStore({
  reducer: {
    destinations: destinationsSlice.reducer,
    reviews: reviewsSlice.reducer,
    india: indiaSlice.reducer,
  },
});

export default store;
