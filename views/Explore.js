import {color} from '@rneui/base';
import {Avatar, Divider, Text, TopNavigation} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet, View} from 'react-native';

const Explore = ({}) => {
  return (
    <SafeAreaView>
      <TopNavigation title={renderLogo} alignment="center"></TopNavigation>
      <Divider />
      <Text style={{color: 'black'}}>HELLO HELLO EXPLORE</Text>
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

export default Explore;

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
