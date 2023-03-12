import React from 'react';
import {useUser} from '../hooks/ApiHooks';
import {Controller, useForm} from 'react-hook-form';
import {Input} from '@rneui/themed';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button, Layout, Text} from '@ui-kitten/components';
import OV_Logo from '../assets/OV_Logo2.png';
import {Image} from 'react-native';

const RegisterForm = () => {
  const {postUser, checkUsername} = useUser();
  const {
    control,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });

  const register = async (registerData) => {
    delete registerData.confirmPassword;
    console.log('Registering: ', registerData);
    try {
      const registerResult = await postUser(registerData);
      console.log('registeration result', registerResult);
    } catch (error) {
      console.error('register', error);
    }
  };

  const checkUser = async (username) => {
    try {
      const userAvailable = await checkUsername(username);
      console.log('checkUser', userAvailable);
      return userAvailable || 'Username is already taken';
    } catch (error) {
      console.error('checkUser', error.message);
    }
  };

  return (
    <SafeAreaView>
      <Layout style={styles.Layout}>
        <Image source={OV_Logo} style={styles.Image} />
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This is required.'},
            minLength: {
              value: 3,
              message: 'Username min length is 3 characters.',
            },
            validate: checkUser,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={styles.Input}
              placeholder="Username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              errorMessage={errors.username && errors.username.message}
            />
          )}
          name="username"
        />

        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message:
                'min 5 characters, needs one number, one uppercase letter',
            },
            pattern: {
              value: /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
              message:
                'min 5 characters, needs one number, one uppercase letter',
            },
          }}
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
        <Controller
          control={control}
          rules={{
            validate: (value) => {
              if (value === getValues('password')) {
                return true;
              } else {
                return 'passwords must match';
              }
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={styles.Input}
              placeholder="Confirm password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
              errorMessage={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />
          )}
          name="confirmPassword"
        />

        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'email is required'},
            pattern: {
              value: /^[a-z0-9.-]{1,64}@[a-z0-9.-]{3,64}/i,
              message: 'Must be a valid email',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={styles.Input}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email && errors.email.message}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{minLength: {value: 3, message: 'must be at least 3 chars'}}}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={styles.Input}
              placeholder="Full name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="words"
              errorMessage={errors.full_name && errors.full_name.message}
            />
          )}
          name="full_name"
        />
        <Button style={styles.Button} onPress={handleSubmit(register)}>
          {(evaProps) => <Text {...evaProps}>Register</Text>}
        </Button>
      </Layout>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Button: {
    padding: 24,
    marginTop: 16,
    margin: 15,
    backgroundColor: '#55b71c',
    borderColor: '#55b71c',
  },
  Image: {
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
  },
  Layout: {
    backgroundColor: '#232020',
  },
  Input: {
    color: 'white',
    fontSize: 16,
    marginTop: -10,
    margin: 10,
  },
});
export default RegisterForm;
