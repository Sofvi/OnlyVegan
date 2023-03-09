import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../context/MainContext';
import {useFavourite, useMedia, useUser, useRating} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import carrot from '../assets/carrot.png';
import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Card,
  Text,
  Modal,
  Layout,
  Button,
  Icon,
  CheckBox,
} from '@ui-kitten/components';

const ListItem = ({singleMedia, navigation}) => {
  const {user, setUpdate, update} = useContext(MainContext);
  const item = singleMedia;
  const [likes, setLikes] = useState([]);
  const [ratings, setRatings] = useState([0]);
  const {deleteMedia} = useMedia();
  const {getUserById} = useUser();
  const [glutenChecked, setGlutenChecked] = React.useState(false);
  const [milkChecked, setMilkChecked] = React.useState(false);
  const [vegeChecked, setVegeChecked] = React.useState(false);
  const [lactoChecked, setLactoChecked] = React.useState(false);
  const [owner, setOwner] = useState({});
  const [userLikesIt, setUserLikesIt] = useState(false);
  const [setUserRatesIt] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const {getFavouritesByFileId, postFavourite, deleteFavourite} =
    useFavourite();
  const {postRating, getRatingsByFileId} = useRating();

  const ClockIcon = (props) => <Icon {...props} name="clock-outline"></Icon>;
  const PinIcon = (props) => <Icon {...props} name="pin-outline"></Icon>;
  const PersonIcon = (props) => <Icon {...props} name="person-outline" />;
  const LikeIcon = (props) => (
    <Icon {...props} name="heart-outline" fill="red" />
  );
  const HeartIcon = (props) => <Icon {...props} name="heart" fill="red" />;
  const ArrowIcon = (props) => (
    <Icon {...props} name="arrow-ios-downward" fill="black" />
  );

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

  const getRatings = async () => {
    const ratings = await getRatingsByFileId(item.file_id);
    console.log(item.file_id);
    console.log(ratings);
    setRatings(ratings);
    for (const rate of ratings) {
      if (rate.user_id === user.user_id) {
        // setUserRatesIt(true);
        break;
      }
    }
  };

  const rateFile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const rating = 1;
      console.log('posting at ' + item.file_id);
      await postRating(item.file_id, token, rating);
      // setUserRatesIt(true);
      getRatings();
    } catch (error) {
      console.log(error);
    }
  };
  const rateFile2 = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const rating = 2;
      console.log('posting at ' + item.file_id);
      await postRating(item.file_id, token, rating);
      // setUserRatesIt(true);
      getRatings();
    } catch (error) {
      console.log(error);
    }
  };
  const rateFile3 = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const rating = 3;
      console.log('posting at ' + item.file_id);
      await postRating(item.file_id, token, rating);
      // setUserRatesIt(true);
      getRatings();
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

  const getRatingValue = () => {
    if (ratings[0] != null) {
      return ratings[0].rating;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    getLikes();
    getOwner();
    getRatings();
  }, []);

  const renderItemHeader = (headerProps, item) => (
    <View {...headerProps} style={styles.header}>
      <Layout style={{flexDirection: 'row', backgroundColor: 'white'}}>
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
        <Image
          source={carrot}
          style={{
            width: 35,
            height: 35,
            justifyContent: 'center',
            marginLeft: '-5%',
          }}
        ></Image>
        <Text
          style={{
            color: '#221F2D',
            marginTop: 12,
            marginLeft: -5,
            fontFamily: 'Merriweather-Regular',
            fontSize: 14,
          }}
        >
          {getRatingValue()}
        </Text>
      </Layout>

      {item.user_id === user.user_id && (
        <Button
          style={{backgroundColor: 'transparent', borderColor: 'transparent'}}
          accessoryRight={ArrowIcon}
          onPress={() => setVisibleModal(true)}
        />
      )}
      <Modal
        visible={visibleModal}
        backdropStyle={styles.backdrop}
        style={{width: '90%', height: '55%'}}
        onBackdropPress={() => setVisibleModal(false)}
      >
        <Card disabled={true} style={{height: 520}}>
          <Text style={{alignSelf: 'center', marginTop: '5%'}}>
            How many carrots would you give?
          </Text>
          <Text style={{fontSize: 11, alignSelf: 'center'}}>
            Please notice you can only do this once.
          </Text>
          <View style={styles.carrots}>
            <TouchableOpacity onPress={rateFile}>
              <Image source={carrot} style={styles.singleCarrot}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={rateFile2}>
              <Image source={carrot} style={styles.singleCarrot}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={rateFile3}>
              <Image source={carrot} style={styles.singleCarrot}></Image>
            </TouchableOpacity>
          </View>
          <Text style={{alignSelf: 'center'}}>
            You gave a rating of {getRatingValue()} carrots
          </Text>
          <Text style={{marginTop: '30%', alignSelf: 'center'}}>Select a category:</Text>
          <Layout
            style={{
              flexDirection: 'row',
              marginTop: '5%',
              alignSelf: 'center',
            }}
          >
            <CheckBox
              style={{padding: 5}}
              checked={glutenChecked}
              onChange={(nextChecked) => setGlutenChecked(nextChecked)}
            >
              {`Gluten-free`}
            </CheckBox>
            <CheckBox
              style={{padding: 5}}
              checked={milkChecked}
              onChange={(nextChecked) => setMilkChecked(nextChecked)}
            >
              {`Milk-free`}
            </CheckBox>
          </Layout>
          <Layout style={{flexDirection: 'row', alignSelf: 'center'}}>
            <CheckBox
              style={{padding: 5, marginLeft: 8}}
              checked={vegeChecked}
              onChange={(nextChecked) => setVegeChecked(nextChecked)}
            >
              {`Vegetarian`}
            </CheckBox>
            <CheckBox
            fill='#000000'
              style={{padding: 5, marginLeft: 5}}
              checked={lactoChecked}
              onChange={(nextChecked) => setLactoChecked(nextChecked)}
            >
              {`Lacto-ovo`}
            </CheckBox>
          </Layout>

          {item.user_id === user.user_id && (
            <Button
              style={{
                marginTop: '40%',
                backgroundColor: 'red',
                borderColor: 'red',
              }}
              onPress={(index) => {
                doDelete();
              }}
            >
              Delete post
            </Button>
          )}
        </Card>
      </Modal>
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
        {item.user_id != user.user_id && (
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
            <Text style={{fontSize: 20, color: '#221F2D'}}>{likes.length}</Text>
          </Layout>
        )}
      </Layout>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        style={{width: '90%', height: '55%'}}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true} style={{height: 410}}>
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
    justifyContent: 'flex-end',
    borderRadius: 15,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginRight: -10,
    marginLeft: -10,
  },
  carrots: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
  },
  singleCarrot: {
    width: 60,
    height: 60,
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
