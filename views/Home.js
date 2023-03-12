import PropTypes from 'prop-types';
import List from '../components/List';
import {
  Avatar,
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View} from 'react-native';
import {DrawerActions} from '@react-navigation/native';

const MenuIcon = (props) => <Icon {...props} name="menu-outline" />;
const PostIcon = (props) => <Icon {...props} name="plus-square-outline" />;

const Home = ({navigation}) => {
  const MenuAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
  );

  const PostAction = () => (
    <TopNavigationAction
      icon={PostIcon}
      onPress={() => {
        navigation.navigate('Upload');
      }}
    />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title={renderLogo}
        alignment="center"
        style={{backgroundColor: '#232020'}}
        accessoryLeft={PostAction}
        accessoryRight={MenuAction}
      ></TopNavigation>
      <Divider style={{backgroundColor: '#55b71c'}} />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <List navigation={navigation} />
      </Layout>
    </SafeAreaView>
  );
};

export const renderLogo = (props) => (
  <View style={styles.titleContainer}>
    <Avatar
      shape="square"
      style={styles.logo}
      source={require('../assets/OV_Logo2.png')}
    ></Avatar>
  </View>
);

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
  },
  logo: {
    width: 150,
    height: 50,
    marginTop: 10,
  },
});
