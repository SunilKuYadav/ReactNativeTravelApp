import {FlightItemProps} from '../types';

const getFormattedDate = (date: string) => {
  const objectDate = new Date(date);

  const day = objectDate.getDate();

  const month = objectDate.getMonth();

  const year = objectDate.getFullYear();
  return day + '/' + month + '/' + year;
};

const getFormattedDateTime = (date: string) => {
  return new Date(date).toLocaleString();
};

const filterFlightByAirline = (data: FlightItemProps[], airline: string) => {
  return data.filter(item =>
    item.displayData.airlines.some(_ => _.airlineName === airline),
  );
};
const sortFlightByPrice = (data: FlightItemProps[], type: Boolean) => {
  const _ = [...data];
  return _.sort((a, b) => {
    if (a.fare > b.fare) {
      return type ? 1 : -1;
    }
    if (a.fare == b.fare) {
      return type ? -1 : 1;
    }
    return 0;
  });
};
export const Utils = {
  getFormattedDate,
  getFormattedDateTime,
  filterFlightByAirline,
  sortFlightByPrice,
};
