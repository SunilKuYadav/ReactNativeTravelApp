import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FlightList, HomeScreen, TravelRequestScree} from '../screens';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TravelRequest"
        component={TravelRequestScree}
        options={{title: 'Search Flight'}}
      />
      <Stack.Screen
        name="FlightList"
        component={FlightList}
        options={{title: 'Flight List'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
