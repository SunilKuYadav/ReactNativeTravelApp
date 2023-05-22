import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useAppSelector} from '../redux';
import {EditFlightCard, PrimaryButton} from '../components';
import {Constants} from '../config';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const selectedFlight = useAppSelector(state => state.flight.selectedFilght);

  const handleAddFlightRequest = () => {
    navigation.navigate('TravelRequest');
  };
  return (
    <ScrollView style={styles.container}>
      <PrimaryButton
        text={Constants.home.add_flight}
        width={'100%'}
        backgroundColor="#030A74"
        textColor="#fff"
        textSize={20}
        onPress={handleAddFlightRequest}
      />
      <View style={styles.divider} />
      <Text style={styles.headeing}>{Constants.home.your_flight_list}</Text>
      {selectedFlight.length > 0 ? (
        <View>
          {selectedFlight.map(item => {
            return <EditFlightCard key={item.id} {...item} />;
          })}
        </View>
      ) : (
        <Text style={styles.text}>{Constants.home.no_flight_found}</Text>
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20, marginTop: 20},
  headeing: {marginTop: 10, fontSize: 20, fontWeight: 'bold'},
  divider: {height: 1, backgroundColor: 'grey', marginTop: 10, marginBottom: 5},
  text: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  },
});
