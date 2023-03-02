import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../context/MainContext';
import {useMedia, useUser} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {Card, Text, Avatar, Modal, Layout, Button} from '@ui-kitten/components';

const ListItem = ({singleMedia, navigation}) => {
  const {user, setUpdate, update} = useContext(MainContext);
  const {deleteMedia} = useMedia();
  const [owner, setOwner] = useState({});
  const item = singleMedia;
  const [visible, setVisible] = React.useState(false);

  /**
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
  */

  const renderItemHeader = (headerProps, item) => (
    <View {...headerProps} style={styles.header}>
      <Text
        style={{
          color: '#221F2D',
          margin: 10,
          fontFamily: 'Merriweather-Bold',
          fontSize: 16,
        }}
      >
        {item.title}
      </Text>
      <Avatar source={require('../assets/carrot.png')}></Avatar>
    </View>
  );

  return (
    <Card
      onPress={() => {
        setVisible(true);
        //navigation.navigate('Single', item);
      }}
      style={styles.card}
      header={(headerProps) => renderItemHeader(headerProps, item)}
    >
      <Image
        style={styles.image}
        source={{uri: uploadsUrl + item.filename}}
      ></Image>
      <Text style={styles.description}>{item.description}</Text>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        style={{width: '90%', height: '50%'}}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true} style={{height: 450, backgroundColor: 'white'}}>
          <Image
            style={{height: 200}}
            source={{uri: uploadsUrl + item.filename}}
          ></Image>
        </Card>
      </Modal>
    </Card>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    borderColor: '#1E1E1E',
    marginTop: 10,
    backgroundColor: 'white',
    width: 390,
  },
  description: {
    paddingTop: 20,
    color: '#221F2D',
    fontFamily: 'Karla-Regular',
  },
  image: {
    width: 370,
    height: 300,
    borderRadius: 5,
    marginLeft: -16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
