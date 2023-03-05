import {color} from '@rneui/base';
import {
  Avatar,
  Button,
  ButtonGroup,
  Divider,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

const Explore = ({}) => {
  return (
    <SafeAreaView>
      <TopNavigation
        style={{backgroundColor: '#232020'}}
        title={renderLogo}
        alignment="center"
      ></TopNavigation>
      <Divider style={{backgroundColor: '#55b71c'}}/>
      <Layout style={styles.container}>
        <ButtonGroup>
          <ImageBackground
            style={styles.image}
            source={require('../assets/GL.png')}
          >
            <Text style={styles.text}>GLUTEN-FREE</Text>
          </ImageBackground>
          <ImageBackground
            style={styles.image}
            source={require('../assets/MF.png')}
          >
            <Text style={styles.text}>MILK-FREE</Text>
          </ImageBackground>
        </ButtonGroup>
        <ButtonGroup>
          <ImageBackground
            style={styles.image}
            source={require('../assets/VG.png')}
          >
            <Text style={styles.text}>VEGETARIAN</Text>
          </ImageBackground>
          <ImageBackground
            style={styles.image}
            source={require('../assets/LO.png')}
          >
            <Text style={styles.text}>LACTO-OVO</Text>
          </ImageBackground>
        </ButtonGroup>
        <ButtonGroup>
          <ImageBackground
            style={styles.image}
            source={require('../assets/B.png')}
          >
            <Text style={styles.text}>COMING SOON !</Text>
          </ImageBackground>
          <ImageBackground
            style={styles.image}
            source={require('../assets/B.png')}
          >
            <Text style={styles.text}>COMING SOON !</Text>
          </ImageBackground>
        </ButtonGroup>
      </Layout>
    </SafeAreaView>
  );
};

const renderLogo = (props) => (
  <View style={styles.titleContainer}>
    <Avatar
      shape="square"
      style={styles.logo}
      source={require('../assets/OV_Logo2.png')}
    ></Avatar>
  </View>
);

export default Explore;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
  },
  logo: {
    width: 150,
    height: 50,
    marginTop: 10,
  },
  container: {
    backgroundColor: 'black',
    height: 800,
  },
  image: {
    margin: 0,
    width: 195,
    height: 195,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'AnticDidone-Regular',
    fontSize: 28,
    textAlign: 'center',
  },
});
