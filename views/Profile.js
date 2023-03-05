import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../context/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {ListItem} from '@rneui/themed';
import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
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
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title={renderLogo}
        alignment="center"
        style={{backgroundColor: '#232020'}}
        accessoryRight={MenuAction}
      ></TopNavigation>
      <Divider style={{backgroundColor: '#55b71c'}}></Divider>
      <Layout style={{flex: 1}}>
        <Layout style={{backgroundColor: '#232020'}}>
          <Image
            source={{uri: uploadsUrl + avatar}}
            style={styles.image}
          ></Image>
          <Text style={styles.title}>{user.username}</Text>
        </Layout>
        <Layout>
          <List navigation={navigation} myFilesOnly={true} />
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    backgroundColor: '#1E1E1E',
    alignSelf: 'center'
  },
  title: {
    textAlign: 'center',
    marginTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    fontFamily: 'Karla-Light',
    color: 'white'
  },
});
