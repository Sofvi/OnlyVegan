import {Avatar, Card, Drawer, DrawerItem, Icon} from '@ui-kitten/components';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {MainContext} from '../context/MainContext';
import PropTypes from 'prop-types';
import {HomeIcon} from './Navigator';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';

export const HomeDrawer = ({navigation}) => {
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);
  const {getFilesByTag} = useTag();
  const [avatar, setAvatar] = useState('');

  const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

  const SettingIcon = (props) => <Icon {...props} name="settings-2-outline" />;

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      setAvatar(avatarArray.pop().filename);
    } catch (error) {
      console.error('user avatar fetch failed', error.message);
    }
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Drawer style={styles.drawer}>
        <Card style={{padding: 10}}>
          <Avatar size='giant' source={{uri: uploadsUrl + avatar}}></Avatar>
          <DrawerItem title={user.username}/>
        </Card>
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
    backgroundColor: '#232020',
  },
  profile: {
    height: 200,
    backgroundColor: '#232020',
  },
  drawerItem: {
    margin: 20,
    backgroundColor: '#232020',
    fontSize: 20,
  },
});
