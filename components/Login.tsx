import React, { useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ApiEndpoints, CallApi } from '../common/Api';
import { Card, TextInput, Button, useTheme, Text } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { HidePassword, ShowPassword } from '../assets/Iconify-Icon';
import WrapperContainer from './WrapperContainer';

type LoginProps = {
  onLoginSuccess: () => void;
};

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const navigation = useNavigation<NavigationProp<{ Dashbord: undefined }>>();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const onSubmit = (data: any) => {
    Keyboard.dismiss();
    setLoading(true);
    CallApi({
      endpoint: ApiEndpoints.login,
      method: 'POST',
      body: {
        username: data.username,
        password: data.password,
      },
      async onsuccess(res: any) {
        setLoading(false);
        await AsyncStorage.setItem('KEY_AUTH', res.token);
        showToast('Login Successful');
        onLoginSuccess();
      },
      onFail(error: string | any) {
        setLoading(false);
        showToast(error?.non_field_errors?.[0]);
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <WrapperContainer>
          <View style={styles.container}>
            <Card style={[styles.card, { backgroundColor: theme.colors.elevation.level3 }]}>
              <Card.Content>
                <View style={styles.logoContainer}>
                  <Image
                    source={require('../assets/Image/Etech.png')}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
                <Controller
                control={control}
                name="username"
                rules={{ required: 'Username is required' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Username"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.username}
                    placeholder="Enter your username"
                  />
                )}
              />
               <Controller
                control={control}
                name="password"
                rules={{ required: 'Password is required' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Password"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.password}
                    secureTextEntry={!showPassword}
                    right={
                      <TextInput.Icon
                        icon={() => (showPassword ? <ShowPassword /> : <HidePassword />)}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                    placeholder="Enter your password"
                  />
                )}
              />
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={handleSubmit(onSubmit)}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" size={20} />
                  ) : (
                    'Login'
                  )}
                </Button>
              </Card.Content>
            </Card>
          </View>
        </WrapperContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 16,
    elevation: 6,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    height: 80,
    width: 80,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 6,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
});

export default Login;
