import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerActions} from '@react-navigation/native';
import {
  Button,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {useContext} from 'react';
import {Platform, SafeAreaView, TouchableOpacity} from 'react-native';
import {MainContext} from '../context/MainContext';
import PropTypes from 'prop-types';
import {renderLogo} from './Home';

const MenuIcon = (props) => <Icon {...props} name="menu-outline" />;

const Settings = ({navigation}) => {
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);
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
        <Button
          style={{margin: 20}}
          title="Logout!"
          onPress={async () => {
            console.log('Logging out!');
            setUser({});
            setIsLoggedIn(false);
            try {
              const asyncStorageKeys = await AsyncStorage.getAllKeys();
              if (asyncStorageKeys.length > 0) {
                if (Platform.OS === 'android') {
                  await AsyncStorage.clear();
                }
                if (Platform.OS === 'ios') {
                  await AsyncStorage.multiRemove(asyncStorageKeys);
                }
              }
            } catch (error) {
              console.error('clearing asyncstorage failed', error);
            }
          }}
        />
      </Layout>
    </SafeAreaView>
  );
};

Settings.propTypes = {
  navigation: PropTypes.object,
};

export default Settings;
