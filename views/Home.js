import PropTypes from 'prop-types';
import List from '../components/List';
import {Layout} from '@ui-kitten/components';

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
