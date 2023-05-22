import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {Utils} from '../../utils';
import {useAppDispatch} from '../../redux';
import {updateSelectedFlight} from '../../redux/reducer';
import TextInputField from '../inputField/TextInputField';
import PrimaryButton from '../buttons/PrimaryButton';
import {FlightService} from '../../sevices';
import {SelectedFilghtProps} from '../../types';
import {Constants} from '../../config';

const EditFlightCard = (props: SelectedFilghtProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const {displayData, fare, added, note, canceled} = props;

  const [notes, setNotes] = useState(note || '');

  const handleButtonClicked = async () => {
    try {
      if (!added) {
        const res = await FlightService._saveFlight();
        Alert.alert(res.data.id);
        dispatch(updateSelectedFlight({...props, note: notes, added: true}));
      } else {
        const res = await FlightService._deleteFlight();
        Alert.alert(res.data.id);
        dispatch(
          updateSelectedFlight({
            ...props,
            note: notes,
            added: true,
            canceled: true,
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
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
            {Constants.flight_card.termial}{' '}
            {displayData.source.airport.terminal}
          </Text>
          <Text>
            {Constants.flight_card.termial}{' '}
            {displayData.destination.airport.terminal}
          </Text>
        </View>
      </View>
      <TextInputField
        placeholder={Constants.flight_card.add_notes}
        value={notes}
        onChange={setNotes}
        containerStyle={{marginVertical: 10}}
        editable={canceled !== true}
      />
      <PrimaryButton
        text={!added ? 'Book' : canceled ? 'Canceled' : 'Cancel'}
        width={'100%'}
        backgroundColor={!added ? '#030A74' : canceled ? 'gray' : '#D70015'}
        textColor={'#fff'}
        textSize={16}
        onPress={handleButtonClicked}
        height={40}
        borderRadius={10}
        disabled={canceled === true}
      />
    </View>
  );
};

export default EditFlightCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  cardContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  title: {fontSize: 20, fontWeight: '500', lineHeight: 30, color: '#030A74'},
  row: {flexDirection: 'row'},
  alignEnd: {alignItems: 'flex-end'},
});
