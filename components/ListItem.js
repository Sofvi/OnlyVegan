import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../context/MainContext';
import {useFavourite, useMedia, useUser} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {
  Card,
  Text,
  Avatar,
  Modal,
  Layout,
  Button,
  Icon,
  ModalService,
} from '@ui-kitten/components';

const ListItem = ({singleMedia, navigation}) => {
  const {user, setUpdate, update} = useContext(MainContext);
  const item = singleMedia;
  const [likes, setLikes] = useState([]);
  const {deleteMedia} = useMedia();
  const {getUserById} = useUser();
  const [owner, setOwner] = useState({});
  const [userLikesIt, setUserLikesIt] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const {getFavouritesByFileId, postFavourite, deleteFavourite} =
    useFavourite();

  const ClockIcon = (props) => <Icon {...props} name="clock-outline"></Icon>;
  const PinIcon = (props) => <Icon {...props} name="pin-outline"></Icon>;
  const PersonIcon = (props) => <Icon {...props} name="person-outline" />;
  const LikeIcon = (props) => <Icon {...props} name="heart-outline" />;
  const HeartIcon = (props) => <Icon {...props} name="heart" />;

  const getOwner = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const owner = await getUserById(item.user_id, token);
    console.log(owner);
    setOwner(owner);
  };

  const getLikes = async () => {
    const likes = await getFavouritesByFileId(item.file_id);
    setLikes(likes);
    for (const like of likes) {
      if (like.user_id === user.user_id) {
        setUserLikesIt(true);
        break;
      }
    }
  };

  const likeFile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await postFavourite(item.file_id, token);
      setUserLikesIt(true);
      getLikes();
    } catch (error) {
      console.log(error);
    }
  };

  const dislikeFile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await deleteFavourite(item.file_id, token);
      setUserLikesIt(false);
      getLikes();
    } catch (error) {
      console.log(error);
    }
  };

  const doDelete = () => {
    try {
      Alert.alert('Delete', 'This action will delete this file permanently', [
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

  useEffect(() => {
    getLikes();
    getOwner();
  }, []);

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
      }}
      style={styles.card}
      header={(headerProps) => renderItemHeader(headerProps, item)}
    >
      <Image
        style={styles.image}
        source={{uri: uploadsUrl + item.filename}}
      ></Image>

      <Layout style={styles.content}>
        <Text style={styles.description}>{item.description}</Text>
        <Layout style={styles.likes}>
          {userLikesIt ? (
            <Button
              style={styles.likeButton}
              accessoryRight={HeartIcon}
              onPress={dislikeFile}
            />
          ) : (
            <Button
              style={styles.likeButton}
              accessoryRight={LikeIcon}
              onPress={likeFile}
            />
          )}
          <Text style={{fontSize: 20}}>{likes.length}</Text>
        </Layout>
      </Layout>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        style={{width: '90%', height: '55%'}}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true} style={{height: 520}}>
          <Layout
            style={{
              width: 350,
              height: 460,
              marginTop: -20,
              marginLeft: -25,
            }}
          >
            <Image
              style={{height: 300}}
              source={{uri: uploadsUrl + item.filename}}
            ></Image>
            <Layout style={styles.layout}>
              <Button style={styles.icon} accessoryLeft={PinIcon}></Button>
              <Text style={styles.text}>{item.title}</Text>
            </Layout>
            <Layout style={styles.layout}>
              <Button style={styles.icon} accessoryLeft={PersonIcon}></Button>
              <Text style={styles.text}>{owner.username}</Text>
            </Layout>
            <Layout style={styles.layout}>
              <Button style={styles.icon} accessoryLeft={ClockIcon}></Button>
              <Text style={styles.text}>{item.time_added}</Text>
            </Layout>
            {item.user_id === user.user_id && (
              <Button style={{marginTop: 50, backgroundColor: 'red', borderColor: 'red'}} onPress={(index) => {
                doDelete()}}>
                Delete post
              </Button>
            )}
          </Layout>
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
    color: '#221F2D',
    fontFamily: 'Karla-Regular',
  },
  image: {
    width: 370,
    height: 220,
    borderRadius: 5,
    marginLeft: -16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    alignSelf: 'center',
  },
  icon: {
    width: 30,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  layout: {
    flexDirection: 'row',
    marginBottom: -15,
  },
  content: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  likes: {
    width: 80,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'pink',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  likeButton: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginRight: -10,
    marginLeft: -10,
  },
});
