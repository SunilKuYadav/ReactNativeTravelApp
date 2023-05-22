import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FlightItemProps, FlightReducerStateTypes, SelectedFilghtProps} from '../../types';


// initial state
const initialState: FlightReducerStateTypes = {
  flightList: [],
  selectedFilght: [],
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    resetState: () => initialState,
    addFlightList: (state, action: PayloadAction<FlightItemProps[]>) => {
      state.flightList = action.payload;
    },
    addSelectedFlight: (state, action: PayloadAction<FlightItemProps>) => {
      state.selectedFilght = state.selectedFilght.concat(action.payload);
    },
    updateSelectedFlight: (
      state,
      action: PayloadAction<SelectedFilghtProps>,
    ) => {
      state.selectedFilght = state.selectedFilght.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
  },
});

export const {
  addFlightList,
  resetState,
  addSelectedFlight,
  updateSelectedFlight,
} = flightSlice.actions;
export default flightSlice.reducer;
