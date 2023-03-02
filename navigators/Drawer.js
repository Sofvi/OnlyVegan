import {Drawer, DrawerItem, Icon} from '@ui-kitten/components';
import React, {useContext, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {MainContext} from '../context/MainContext';
import PropTypes from 'prop-types';
import {HomeIcon} from './Navigator';

export const HomeDrawer = ({navigation}) => {
  const user = useContext(MainContext);

  const PersonIcon = (props) => (
    <Icon {...props} name='person-outline'/>
  );

  const SettingIcon = (props) => (
    <Icon {...props} name='settings-2-outline'/>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Drawer style={styles.drawer}>
        <DrawerItem
          style={styles.profile}
          //title={user.username}
          title="User info comes here"
        />
        <DrawerItem
          style={styles.drawerItem}
          accessoryLeft={HomeIcon}
          title="Home"
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
        <DrawerItem
          style={styles.drawerItem}
          accessoryLeft={PersonIcon}
          title="Profile"
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        <DrawerItem
          style={styles.drawerItem}
          accessoryLeft={SettingIcon}
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

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: '#232020'
  },
  profile: {
    height: 200,
    backgroundColor: '#232020'
  },
  drawerItem: {
    margin: 20,
    backgroundColor: '#232020',
    fontSize: 20
  },
});
