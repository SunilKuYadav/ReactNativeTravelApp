import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {Utils} from '../../utils';
import {useAppDispatch} from '../../redux';
import {addSelectedFlight} from '../../redux/reducer';
import {FlightItemProps} from '../../types';
import {Constants} from '../../config';

const FlightListCard = (props: FlightItemProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const {displayData, fare} = props;
  const handleFlightSelect = () => {
    dispatch(addSelectedFlight(props));
    navigation.navigate('Home');
  };
  return (
    <Pressable style={styles.container} onPress={handleFlightSelect}>
      <View>
        <View style={styles.row}>
          <Text style={styles.title}>
            {displayData.airlines[0].airlineName} {' - '}
          </Text>
          <Text style={styles.title}>
            {displayData.airlines[0].airlineCode}
            {displayData.airlines[0].flightNumber}
          </Text>
        </View>
        <View style={styles.row}>
          <Text>
            {displayData.source.airport.airportCode}{' '}
            {`(${displayData.source.airport.countryCode})`} {' - '}
          </Text>
          <Text>
            {displayData.destination.airport.airportCode}
            {`(${displayData.destination.airport.countryCode})`}
          </Text>
        </View>
        <Text>
          {Constants.flight_card.dep}{' '}
          {Utils.getFormattedDateTime(displayData.source.depTime)}
        </Text>
        <Text>
          {Constants.flight_card.arr}{' '}
          {Utils.getFormattedDateTime(displayData.destination.arrTime)}
        </Text>
      </View>
      <View style={styles.alignEnd}>
        <Text style={styles.title}>
          {Constants.flight_card.rs} {fare}
        </Text>
        <Text>{displayData.totalDuration}</Text>
        <Text>
          {Constants.flight_card.termial} {displayData.source.airport.terminal}
        </Text>
        <Text>
          {Constants.flight_card.termial}{' '}
          {displayData.destination.airport.terminal}
        </Text>
      </View>
    </Pressable>
  );
};

export default FlightListCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  title: {fontSize: 20, fontWeight: '500', lineHeight: 30, color: '#030A74'},
  row: {flexDirection: 'row'},
  alignEnd: {alignItems: 'flex-end'},
});
