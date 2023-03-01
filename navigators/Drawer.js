import {Drawer, DrawerItem} from '@ui-kitten/components';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {MainContext} from '../context/MainContext';
import PropTypes from 'prop-types';

export const HomeDrawer = ({navigation}) => {
  const user = useContext(MainContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Drawer>
        <DrawerItem title={user.username} />
        <DrawerItem
          title="Home"
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
        <DrawerItem
          title="Profile"
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        <DrawerItem
          title="Settings"
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
      </Drawer>
    </SafeAreaView>
  );
};

Drawer.propTypes = {
  navigation: PropTypes.object,
};
