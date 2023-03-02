import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../context/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Button, Card, ListItem} from '@rneui/themed';
import {Icon, Layout, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {Image, SafeAreaView, Text} from 'react-native';
import carrot from '../assets/carrot.png';
import {StyleSheet} from 'react-native';
import List from '../components/List';
import {MyFiles} from './MyFiles';
import {renderLogo} from './Home';
import {DrawerActions} from '@react-navigation/native';

const Profile = ({navigation}) => {
  const {getFilesByTag} = useTag();
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');
  const MenuIcon = (props) => <Icon {...props} name="menu-outline" />;

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

  const MenuAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
  );

  return (
    <SafeAreaView>
      <TopNavigation
        title={renderLogo}
        alignment="center"
        style={{backgroundColor: '#232020'}}
        accessoryRight={MenuAction}
      ></TopNavigation>
      <Layout>
      <Image
        source={carrot || {uri: uploadsUrl + avatar}}
        style={styles.Image}
      ></Image>
      <ListItem>
        <ListItem.Title style={styles.Title}>
          {user.full_name}
          {user.username}
        </ListItem.Title>
      </ListItem>
      <Layout>
        <List navigation={navigation} myFilesOnly={true} />
      </Layout>
      {/*
      <Button
        title="My Files"
        onPress={() => {
          navigation.navigate('MyFiles');
        }}
      /> */}
    </Layout>
    </SafeAreaView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;

const styles = StyleSheet.create({
  Image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1E1E1E',
    marginLeft: '36%',
  },
  Title: {
    marginLeft: '34%',
    textAlign: 'center'
  },
});
