interface FlightItemProps {
  id: string;
  fare: number;
  displayData: {
    source: {
      airport: {
        cityCode: string;
        cityName: string;
        terminal: string;
        airportCode: string;
        airportName: string;
        countryCode: string;
        countryName: string;
      };
      depTime: string;
    };
    airlines: {
      airlineCode: string;
      airlineName: string;
      flightNumber: string;
    }[];
    stopInfo: string;
    destination: {
      airport: {
        cityCode: string;
        cityName: string;
        terminal: string;
        airportCode: string;
        airportName: string;
        countryCode: string;
        countryName: string;
      };
      arrTime: string;
    };
    totalDuration: string;
  };
}
interface SelectedFilghtProps extends FlightItemProps {
  added?: boolean;
  canceled?: boolean;
  note?: string;
}
interface FlightReducerStateTypes {
  flightList: FlightItemProps[];
  selectedFilght: SelectedFilghtProps[];
}
export type {FlightItemProps, SelectedFilghtProps, FlightReducerStateTypes};
