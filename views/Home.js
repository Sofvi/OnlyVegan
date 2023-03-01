import {ListItem as RNEListItem} from '@rneui/themed';
import PropTypes from 'prop-types';
import List from '../components/List';
import {Layout} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

const Home = ({navigation}) => {
  return (
    <Layout>
      <List navigation={navigation} />
    </Layout>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
