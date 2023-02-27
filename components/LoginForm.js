import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {MainContext} from '../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthentication} from '../hooks/ApiHooks';
import {Controller, useForm} from 'react-hook-form';
import {Button, Text, Input, Card, Layout} from '@ui-kitten/components';
import Logo from '../assets/Logo.png';
import {Image} from 'react-native';

const LoginForm = () => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {username: '', password: ''},
  });

  const logIn = async (loginData) => {
    console.log('Login button pressed', loginData);
    // const data = {username: 'ilkkamtk', password: 'q1w2e3r4'};
    try {
      const loginResult = await postLogin(loginData);
      console.log('logIn', loginResult);
      await AsyncStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('logIn', error);
      // TODO: notify user about failed login attempt
    }
  };

  return (
    <Layout style={styles.Layout}>
      <Image source={Logo} />
      <Controller
        control={control}
        rules={{required: {value: true, message: 'is required'}}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={styles.Input}
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.username && errors.username.message}
            autoCapitalize="none"
          />
        )}
        name="username"
      />
      <Controller
        control={control}
        rules={{required: {value: true, message: 'is required'}}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={styles.Input}
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />
      <Button style={styles.Button} onPress={handleSubmit(logIn)}>
        {(evaProps) => <Text {...evaProps}>Login</Text>}
      </Button>
      <Button style={styles.Button}>
        {(evaProps) => <Text {...evaProps}>Register</Text>}
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  Button: {
    padding: 24,
    marginTop: 16,
    margin: 15,
    backgroundColor: 'green',
  },
  Image: {
    flex: 1,
    width: 200,
    height: 200,
  },
  Layout: {
    backgroundColor: 'grey',
  },
  Input: {
    marginTop: 16,
    margin: 10,
    borderderRadius: 5,
  },
});
export default LoginForm;
