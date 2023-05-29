import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/core';

import {PrimaryButton, TextInputField} from '../components';
import {FlightService} from '../sevices';
import {useAppDispatch} from '../redux';
import {addFlightList} from '../redux/reducer';
import {Utils} from '../utils';
import {Constants} from '../config';

const TravelRequestScree = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDateModlaToggle = () => setOpenModal(prev => !prev);
  const getFlightList = async () => {
    try {
      if (source === '') {
        Alert.alert(Constants.travel_request.source_empty_error);
        return;
      } else if (destination === '') {
        Alert.alert(Constants.travel_request.destination_empty_error);
        return;
      } else if (travelDate === '') {
        Alert.alert(Constants.travel_request.date_empty_error);
        return;
      }
      setLoading(true);
      const res = await FlightService._getFlight();
      dispatch(addFlightList(res.data.data.result));
      navigation.navigate('FlightList');
      setLoading(false);
    } catch (error) {
      console.error('Error -', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.rowWrapper}>
          <TextInputField
            placeholder={Constants.travel_request.source}
            value={source}
            onChange={setSource}
          />
          <TextInputField
            placeholder={Constants.travel_request.destination}
            value={destination}
            onChange={setDestination}
          />
        </View>
        <View style={styles.columnWrapper}>
          <Pressable
            onPress={handleDateModlaToggle}
            style={styles.dateContainer}>
            <Text style={styles.dateText(travelDate)}>
              {travelDate
                ? Utils.getFormattedDate(travelDate)
                : Constants.travel_request.select_date}
            </Text>
          </Pressable>
          <PrimaryButton
            containerStyle={{margin: 30}}
            text={Constants.travel_request.search}
            width={'50%'}
            backgroundColor={loading ? 'gray' : '#030A74'}
            textColor={'#fff'}
            textSize={16}
            onPress={getFlightList}
            height={40}
            disabled={loading}
          />
        </View>
      </View>

      <DatePicker
        modal
        mode="date"
        open={openModal}
        date={travelDate ? new Date(travelDate) : new Date()}
        minimumDate={new Date()}
        onConfirm={date => {
          setOpenModal(false);
          setTravelDate(`${date}`);
        }}
        onCancel={() => {
          setOpenModal(false);
        }}
      />
      {loading && (
        <ActivityIndicator style={styles.loader} size="large" color="#00ff00" />
      )}
      <View style={styles.divider} />
    </View>
  );
};

export default TravelRequestScree;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 10, marginTop: 10},
  column: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-around',
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    flexGrow: 1,
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '45%',
    height: 35,
    justifyContent: 'center',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  dateText: travelDate => ({
    fontSize: 16,
    color: travelDate ? 'black' : 'gray',
  }),
  loader: {
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  divider: {height: 1, backgroundColor: 'grey', marginTop: 10, marginBottom: 5},
});
