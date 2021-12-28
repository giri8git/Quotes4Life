import * as React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import InternetConnectionAlert from 'react-native-internet-connection-alert';

import LifeQuote from './components/lifeQuote';
import MotivationQuote from './components/motivationQuote';
import SuccessQuote from './components/successQuote';

function LifeScreen() {
  return <LifeQuote />;
}

function MotivationScreen() {
  return <MotivationQuote />;
}

function SuccessScreen() {
  return <SuccessQuote />;
}

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <InternetConnectionAlert
      onChange={(connectionState) => {
        console.log('Connection State: ', connectionState);
      }}
      title="">
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.tinyLogo}
            source={require('./assets/quotes4life.png')}
          />
        </View>

        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              labelStyle: {
                fontSize: 13,
                fontWeight: '700',
                borderBottomColor: 'red',
              },
              tabStyle: {borderTopColor: 'black'},
              activeTintColor: '#54bfa4',
              inactiveTintColor: '#A9A9A9',
              indicatorStyle: {
                borderBottomColor: '#54bfa4',
                borderBottomWidth: 2,
              },
            }}>
            <Tab.Screen name="Motivation" component={MotivationScreen} />
            <Tab.Screen name="Life" component={LifeScreen} />
            <Tab.Screen name="Success" component={SuccessScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </InternetConnectionAlert>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: 10,
    width: 100,
  },
  tinyLogo: {
    width: 200,
    height: 42,
    alignSelf: 'center',
  },
  text: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
