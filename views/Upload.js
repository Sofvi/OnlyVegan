import {Card} from '@rneui/themed';
import {
  Button,
  Layout,
  Text,
  Input,
  Drawer,
  DrawerItem,
  IndexPath,
} from '@ui-kitten/components';
import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useCallback, useContext, useRef, useState} from 'react';
import {useMedia, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../context/MainContext';
import {useFocusEffect} from '@react-navigation/native';
import {appId} from '../utils/variables';
import {Video} from 'expo-av';
import {StyleSheet} from 'react-native';
import {Image} from 'react-native';
import carrot from '../assets/carrot.png';
import Logo from '../assets/Logo.png';

const Upload = ({navigation}) => {
  const [mediafile, setMediafile] = useState({});
  const video = useRef(null);
  const [loading, setLoading] = useState(false);
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const {update, setUpdate} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
    trigger,
    reset,
  } = useForm({
    defaultValues: {title: '', description: ''},
    mode: 'onChange',
  });

  const uploadFile = async (data) => {
    // create form data and post it
    setLoading(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    const filename = mediafile.uri.split('/').pop();
    let fileExt = filename.split('.').pop();
    if (fileExt === 'jpg') fileExt = 'jpeg';
    const mimeType = mediafile.type + '/' + fileExt;
    formData.append('file', {
      uri: mediafile.uri,
      name: filename,
      type: mimeType,
    });
    console.log('form data', formData);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await postMedia(formData, token);

      const appTag = {
        file_id: result.file_id,
        tag: appId,
      };
      const tagResult = await postTag(appTag, token);
      console.log('tag result', tagResult);

      Alert.alert('Uploaded', 'File id: ' + result.file_id, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            // update 'update' state in context
            setUpdate(!update);
            // reset form
            // reset();
            // TODO: navigate to home
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.error('file upload failed', error);
    } finally {
      setLoading(false);
    }
  };

  const pickFile = async () => {
    try {
      // No permissions request is necessary for launching the image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      console.log(result);

      if (!result.canceled) {
        setMediafile(result.assets[0]);
        // validate form
        trigger();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setMediafile({});
    reset();
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        console.log('leaving');
        resetForm();
      };
    }, [])
  );

  console.log('tupe', mediafile.type);

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        {mediafile.type === 'video' ? (
          <Video
            ref={video}
            source={{uri: mediafile.uri}}
            style={{width: '100%', height: 200}}
            resizeMode="cover"
            useNativeControls
            onError={(error) => {
              console.log(error);
            }}
          />
        ) : (
          <TouchableOpacity onPress={pickFile}>
            <Image
              style={styles.CardImage}
              source={
                Logo || {
                  uri: mediafile.uri,
                }
              }
            ></Image>
          </TouchableOpacity>
        )}
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'is required',
            },
            minLength: {
              value: 3,
              message: 'Title min length is 3 characters.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={styles.Input}
              placeholder="Title: Title here"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.title && errors.title.message}
              size="Large"
            />
          )}
          name="title"
        />
        <Controller
          control={control}
          rules={{
            minLength: {
              value: 5,
              message: 'Description min length is 5 characters.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={styles.Input}
              placeholder="Description: Description here"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.description && errors.description.message}
              multiline={true}
              size="Multiline"
            />
          )}
          name="description"
        />
        <Text>Select a tag</Text>
        <Drawer>
          <DrawerItem title="Vegan" />
          <DrawerItem title="Lactose free" />
          <DrawerItem title="Some other " />
          <DrawerItem title="more other" />
        </Drawer>
        <Text style={styles.Text}>How many carrots?</Text>
        <View style={styles.Carrots}>
          <TouchableOpacity onPress={() => console.log('Clicked')}>
            <Image onP source={carrot} style={styles.Image}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Clicked')}>
            <Image onP source={carrot} style={styles.Image}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Clicked')}>
            <Image onP source={carrot} style={styles.Image}></Image>
          </TouchableOpacity>
        </View>
        <Button style={styles.Button} title="Pick a file" onPress={pickFile}>
          {(evaProps) => <Text {...evaProps}>Pick a file</Text>}
        </Button>
        <Button
          style={styles.Button}
          loading={loading}
          /*  disabled={!mediafile.uri || errors.title || errors.description} */
          title="Upload"
          onPress={handleSubmit(uploadFile)}
        >
          {(evaProps) => <Text {...evaProps}>Upload</Text>}
        </Button>
      </TouchableOpacity>
    </ScrollView>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  Button: {
    padding: 24,
    marginTop: 16,
    margin: 15,
    backgroundColor: 'green',
  },
  Image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  Carrots: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '25%',
    marginTop: 40,
  },
  Input: {
    marginTop: 16,
  },
  CardImage: {
    width: 340,
    height: 200,
    borderRadius: 10,
    marginLeft: '5%',
    marginTop: 40,
  },
  Text: {
    marginTop: 40,
    marginLeft: '31%',
  },
});
export default Upload;
