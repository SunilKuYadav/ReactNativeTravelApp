import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import {FlightListCard} from '../components';
import {useAppSelector} from '../redux';
import {Utils} from '../utils';
import {Constants} from '../config';

const FlightList = () => {
  const flightList = useAppSelector(state => state.flight.flightList);

  const airlines = flightList.map(item =>
    item.displayData.airlines.map(_ => _.airlineName),
  );

  const [filterFLight, setfilterFLight] = useState(() => flightList);

  return (
    <View style={styles.container}>
      <View style={styles.rowWrapper}>
        <SelectDropdown
          defaultButtonText={Constants.flight_list.filter_by_airline}
          data={[...new Set(airlines.flat())]}
          onSelect={selectedItem => {
            setfilterFLight(() =>
              Utils.filterFlightByAirline(flightList, selectedItem),
            );
          }}
          buttonStyle={styles.selectText}
        />
        <SelectDropdown
          defaultButtonText={Constants.flight_list.sort_by_price}
          data={['Price ass', 'Price des']}
          onSelect={selectedItem => {
            setfilterFLight(() =>
              Utils.sortFlightByPrice(
                filterFLight,
                selectedItem === 'Price ass',
              ),
            );
          }}
          buttonStyle={styles.selectText}
        />
      </View>
      <View style={styles.divider} />
      <FlatList
        data={filterFLight}
        renderItem={({item}) => <FlightListCard {...item} />}
        keyExtractor={item => item.id}
        style={{height: '90%'}}
      />
    </View>
  );
};

export default FlightList;

const styles = StyleSheet.create({
  container: {marginHorizontal: 10},
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 35,
    borderRadius: 5,
    width: '45%',
    backgroundColor: '#fff',
  },
  divider: {height: 1, backgroundColor: '#030A74', marginVertical: 5},
});
