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
  const {user} = useContext(MainContext);
  const item = singleMedia;
  const [likes, setLikes] = useState([]);
  const [userLikesIt, setUserLikesIt] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const {getFavoritesByFileId, postFavourite, deleteFavourite} = useFavourite();

  const ClockIcon = (props) => <Icon {...props} name="clock-outline"></Icon>;
  const PinIcon = (props) => <Icon {...props} name="pin-outline"></Icon>;
  const PersonIcon = (props) => <Icon {...props} name="person-outline" />;
  const LikeIcon = (props) => <Icon {...props} name="heart-outline" />;
  const HeartIcon = (props) => <Icon {...props} name="heart" />;

  const getLikes = async () => {
    const likes = await getFavoritesByFileId(item.file_id);
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
      await postFavourite(file_id, token);
      setUserLikesIt(true);
      getLikes();
    } catch (error) {}
  };

  const dislikeFile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await deleteFavourite(fileId, token);
      setUserLikesIt(false);
      getLikes();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLikes();
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
              accessoryLeft={HeartIcon}
              onPress={dislikeFile}
            />
          ) : (
            <Button
              style={styles.likeButton}
              accessoryLeft={LikeIcon}
              onPress={likeFile}
            />
          )}
          <Text style={{fontSize: 18}}>{likes.length}</Text>
        </Layout>
      </Layout>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        style={{width: '90%', height: '50%'}}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true} style={{height: 450, backgroundColor: 'white'}}>
          <Layout
            style={{
              width: 350,
              height: 460,
              marginTop: -20,
              marginLeft: -25,
            }}
          >
            <Image
              style={{height: 200}}
              source={{uri: uploadsUrl + item.filename}}
            ></Image>
            <Layout style={styles.layout}>
              <Button style={styles.icon} accessoryLeft={PinIcon}></Button>
              <Text style={styles.text}>{item.title}</Text>
            </Layout>
            <Layout style={styles.layout}>
              <Button style={styles.icon} accessoryLeft={PersonIcon}></Button>
              <Text style={styles.text}>{item.user_id}</Text>
            </Layout>
            <Layout style={styles.layout}>
              <Button style={styles.icon} accessoryLeft={ClockIcon}></Button>
              <Text style={styles.text}>{item.time_added}</Text>
            </Layout>
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
    height: 300,
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
    backgroundColor: 'transparent'
  },
  likes: {
    borderRadius: 15,
    backgroundColor: 'pink',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10
  },
  likeButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginRight: -10,
    marginLeft: -10
  },
});
