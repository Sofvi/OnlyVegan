import {
  Avatar,
  Drawer,
  DrawerItem,
  IndexPath,
  Layout,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Profile from '../views/Profile';
import Upload from '../views/Upload';
import Home from '../views/Home';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';

export const HomeDrawer = ({navigation}) => {
  return (
    <SafeAreaView
    style={{
      flex: 1
    }}>
      <Drawer>
        <DrawerItem title="Profile" />
        <DrawerItem title="Settings" />
      </Drawer>
    </SafeAreaView>
  );
};
