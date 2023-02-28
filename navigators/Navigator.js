import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  TopNavigationAction,
} from '@ui-kitten/components';
import Home from '../views/Home';
import Explore from '../views/Explore';
import Upload from '../views/Upload';
import {HomeDrawer} from './Drawer';
import {StyleSheet} from 'react-native';

const {Navigator, Screen} = createBottomTabNavigator();

const HomeIcon = (props) => <Icon {...props} name="home-outline"></Icon>;

const MapIcon = (props) => <Icon {...props} name="map-outline"></Icon>;

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    style={styles.nav}
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={HomeIcon} title="HOME" />
    <BottomNavigationTab icon={MapIcon} title="EXPLORE" />
  </BottomNavigation>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <Navigator
      screenOptions={{headerShown: false}}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Explore" component={Explore} />
      <Screen name="Upload" component={Upload} />
      <Screen name="Drawer" component={HomeDrawer} />
    </Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  nav: {
    fontFamily: 'Merriweather-Black',
    backgroundColor: '#232020',
  },
});
