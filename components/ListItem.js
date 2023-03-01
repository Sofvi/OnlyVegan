import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../context/MainContext';
import {useMedia} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {Card, Text, Avatar, Layout, Divider} from '@ui-kitten/components';

const ListItem = ({singleMedia, navigation}) => {
  const {user, setUpdate, update} = useContext(MainContext);
  const {deleteMedia} = useMedia();
  const item = singleMedia;

  const doDelete = () => {
    try {
      Alert.alert('Delete', 'this file permanently', [
        {text: 'Cancel'},
        {
          text: 'OK',
          onPress: async () => {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(item.file_id, token);
            response && setUpdate(!update);
          },
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItemHeader = (headerProps, item) => (
    <View
      {...headerProps}
      style={{
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',
      }}
    >
      <Text style={{color: '#221F2D', margin: 10}} category="h6">
        {item.title}
      </Text>
      <Avatar source={require('../assets/carrot.png')}></Avatar>
    </View>
  );

  return (
    <Card
      onPress={() => {
        navigation.navigate('Single', item);
      }}
      style={styles.card}
      header={(headerProps) => renderItemHeader(headerProps, item)}
    >
      <Image
        style={styles.image}
        source={{uri: uploadsUrl + item.filename}}
      ></Image>
      <Text style={styles.description}>{item.description}</Text>
    </Card>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    backgroundColor: '#eaeaea',
  },
  description: {
    paddingTop: 20,
    color: '#221F2D',
  },
  image: {
    width: 340,
    height: 200,
    borderRadius: 10,
  },
});
