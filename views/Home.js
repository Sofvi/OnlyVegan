import PropTypes from 'prop-types';
import List from '../components/List';
import {
  Avatar,
  Divider,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View} from 'react-native';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title={renderLogo} alignment="center"></TopNavigation>
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <List navigation={navigation} />
      </Layout>
    </SafeAreaView>
  );
};

const renderLogo = (props) => (
  <View style={styles.titleContainer}>
    <Avatar
      shape="square"
      style={styles.logo}
      source={require('../assets/OV_Logo.png')}
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
    width: 140,
    height: 70,
    marginTop: 10,
  },
});
