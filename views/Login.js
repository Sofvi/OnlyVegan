import React, {useContext, useEffect, useState} from 'react';
import {Keyboard, ScrollView, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button, Card, Layout, Text} from '@ui-kitten/components';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const [toggleForm, setToggleForm] = useState(true);

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      // if no token available, do nothing
      if (userToken === null) return;
      const userData = await getUserByToken(userToken);
      console.log('checkToken', userData);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('checkToken', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        {toggleForm ? <LoginForm /> : <RegisterForm />}
        <Layout
          style={{backgroundColor: '#232020', height: '100%', paddingTop: '20%'}}
        >
          <Text style={{textAlign: 'center'}}>
            {toggleForm
              ? 'No account yet? Please register.'
              : 'Already have an account? Please login.'}
          </Text>
          <Button
            style={{
              margin: 10,
              backgroundColor: '#55b71c',
              borderColor: '#55b71c',
            }}
            type="outline"
            title={toggleForm ? 'Go to register' : 'Go to login'}
            onPress={() => {
              setToggleForm(!toggleForm);
            }}
          >
            {(evaProps) => (
              <Text {...evaProps}>
                {toggleForm ? 'Go to register' : 'Go to login'}
              </Text>
            )}
          </Button>
        </Layout>
      </TouchableOpacity>
    </ScrollView>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
