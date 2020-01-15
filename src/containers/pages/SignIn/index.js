import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  AppRegistry,
  // AsyncStorage,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      role: '',
      token: '',
      id_user: '',
      message: '',
      showAlert: false,
    };
  }

  username = text => {
    console.log('value ', text);
    this.setState({username: text});
  };

  password = text => {
    console.log('value ', text);
    this.setState({password: text});
  };

  handleLogin = async e => {
    console.log('Press Login');
    alert('Loading Login');
    e.preventDefault();
    const url = 'https://hiringchannel-api.herokuapp.com/v1/user/login';
    const data = {
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
    };
    console.log('role initstate', data.role);
    axios
      .post(url, data)
      .then(res => {
        // const success = res.data.success;
        // console.log('Success ', res.data);
        // if (success === true) {
        //   Swal.fire({
        //     title: 'Login Success.',
        //     // text: 'Your account has been created.',
        //     icon: 'success',
        //   });
        // } else if (success === false) {
        //   Swal.fire({
        //     title: 'Login Failed.',
        //     // text: 'This account already exist.',
        //     icon: 'warning',
        //   });
        // }

        this.setState({
          username: res.data.data.username,
          role: res.data.data.role,
          token: res.data.token,
          id_user: res.data.data.id_user,
          message: res.data.data.message,
        });
        console.log('token=', res.data.token);
        console.log('username setState=', res.data.data.username);
        console.log('role setState=', res.data.data.role);
        console.log('id_user setState=', res.data.data.id_user);
        AsyncStorage.setItem('token', this.state.token);
        AsyncStorage.setItem('id_user', this.state.id_user.toString());
        AsyncStorage.setItem('username', this.state.username);
        AsyncStorage.setItem('role', this.state.role);
        console.log('AsyncStorage setItem ', res.data);
        if (this.state.role === 'company') {
          this.props.navigation.navigate('Home');
        } else if (this.state.role === 'engineer') {
          this.props.navigation.navigate('HomeEngineer');
        }
      })

      .catch(err => {
        console.log(err);
        this.setState({
          message: 'Login failed.',
        });
      });

    //===========
    // const username = this.state.username;
    // const token = this.state.token;
    // const id_user = this.state.id_user;
    // const role = this.state.role;
    // const message = this.state.message;
    // this.setState({
    //   username: username,
    //   id_user: id_user,
    //   token: token,
    //   role: role,
    //   message: message,
    // });
    // console.log('Data saved asyc');
  };

  // function go screen register
  onPress = () => {
    this.props.navigation.navigate('Register');
  };

  // func go screen home
  // goToHome = () => {
  //   alert('test');
  //   this.props.navigation.navigate('Home');
  // };

  render() {
    return (
      // <KeyboardAvoidingView behavior="padding">
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Text style={styles.title}>Hello!</Text>
          <Text style={styles.description}>
            Please sign in with your account
          </Text>

          <ScrollView>
            {/* Form SigIn */}
            <View style={styles.formSignIn}>
              <View style={{marginBottom: 5}}>
                <Input
                  label="Username"
                  onChangeText={this.username}
                  value={this.state.username}></Input>
              </View>
              <View style={{marginVertical: 20}}>
                <Input
                  label="Password"
                  onChangeText={this.password}
                  value={this.state.password}
                  secureTextEntry={true}></Input>
              </View>
              <TouchableOpacity style={styles.btnSignIn}>
                <Text
                  style={{color: '#ffffff', fontWeight: 'bold', fontSize: 16}}
                  onPress={this.handleLogin}>
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginBottom: 0, paddingTop: 10}}
                onPress={this.onPress}>
                <Text style={styles.textLink}>
                  New on Hiring Channel?{' '}
                  <Text style={{fontWeight: 'bold'}}>Register</Text>
                </Text>
              </TouchableOpacity>
            </View>
            {/* End Form SigIn */}
          </ScrollView>

          {/* <View style={{flex: 1, backgroundColor: 'pink'}}> */}
          <Image
            source={require('../../../assets/image/coverSign.png')}
            style={styles.imgCover}
          />
          {/* </View> */}
        </View>
      </View>
      // </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: '',
  },
  title: {
    fontFamily: 'AirbnbCerealBold',
    fontSize: 46,
    fontWeight: 'bold',
    marginTop: 90,
    marginLeft: 49,
  },
  description: {
    fontFamily: 'AirbnbCerealBold',
    marginTop: -5,
    fontSize: 14,
    marginLeft: 51,
    color: '#a5b1c2',
    fontWeight: 'bold',
  },
  formSignIn: {
    width: 300,
    justifyContent: 'center',
    // backgroundColor: 'pink',
    marginHorizontal: 43,
    marginVertical: 115,
  },
  btnSignIn: {
    backgroundColor: '#F4CF5D',
    width: 200,
    height: 45,
    borderRadius: 6,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  textLink: {
    marginBottom: 0,
    fontSize: 14,
    marginHorizontal: 46,
    color: '#a5b1c2',
  },
  imgCover: {
    position: 'absolute',
    marginTop: 589,
    height: 195,
    width: 393,
  },
});

AppRegistry.registerComponent('SignIn', () => SignIn);
// export default SignIn;
