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
import {SafeAreaView, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../views/Profile';
import Settings from '../views/Settings';

const HomeIcon = (props) => <Icon {...props} name="home-outline"></Icon>;
const MapIcon = (props) => <Icon {...props} name="map-outline"></Icon>;

const Drawer = createDrawerNavigator();
export const RootNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, drawerPosition: 'right'}}
      drawerType="slide"
      drawerContent={(props) => <HomeDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();
const TabNavigator = () => (
  <BottomTab.Navigator
    screenOptions={{headerShown: false}}
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <BottomTab.Screen name="Home" component={Home} />
    <BottomTab.Screen name="Explore" component={Explore} />
    <BottomTab.Screen name="Upload" component={Upload} />
  </BottomTab.Navigator>
);

const BottomTabBar = ({navigation, state}) => {
  const onSelect = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <SafeAreaView>
      <BottomNavigation
        style={styles.nav}
        selectedIndex={state.index}
        onSelect={onSelect}
      >
        <BottomNavigationTab title="Home" icon={HomeIcon} />
        <BottomNavigationTab title="Explore" icon={MapIcon} />
      </BottomNavigation>
    </SafeAreaView>
  );
};

export const AppNavigator = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  nav: {
    fontFamily: 'Merriweather-Black',
    backgroundColor: '#232020',
  },
});
