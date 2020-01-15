// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const getAuth = async () => {
  const userData = {
    id_user: await AsyncStorage.getItem('id_user'),
    username: await AsyncStorage.getItem('username'),
    token: await AsyncStorage.getItem('token'),
    role: await AsyncStorage.getItem('role'),
  };

  return userData;
};

export default getAuth;
