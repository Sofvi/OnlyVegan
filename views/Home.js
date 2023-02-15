import {ListItem as RNEListItem} from '@rneui/themed';
import PropTypes from 'prop-types';
import List from '../components/List';

const Home = ({navigation}) => {
  return (
    <RNEListItem>
      <List navigation={navigation} />
    </RNEListItem>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
