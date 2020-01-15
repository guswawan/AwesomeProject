import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Input} from 'react-native-elements';
import {Radio, DatePicker} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import Moment from 'moment';
import axios from 'axios';

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      role: '',
      fullname: '',
      description: '',
      location: '',
      chosenDate: new Date(),
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

  fullname = text => {
    console.log('value ', text);
    this.setState({fullname: text});
  };

  description = text => {
    console.log('value ', text);
    this.setState({description: text});
  };

  location = text => {
    console.log('value ', text);
    this.setState({location: text});
  };

  setDate = newDate => {
    console.log('use moment ', Moment(newDate).format('MMM Do YY'));
    const Dob = Moment(newDate).format('MMM Do YY');
    this.setState({chosenDate: Dob});
  };

  // getFetchUser = data => {
  //   console.log('PRESS fetch user');
  //   const url = 'https://hiringchannel-api.herokuapp.com/v1/user/register';
  //   axios
  //     .post(url, data)
  //     .then(res => {
  //       // this.setState({
  //       //   username: data.username,
  //       //   password: data.password,
  //       //   role: data.role,
  //       // });
  //       console.log('res axios user= ', res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       this.setState({
  //         err: err,
  //         message: 'Register failed.',
  //       });
  //     });
  // };

  getFetch = personalData => {
    console.log('PRESS FETCH');
    const url = 'https://hiringchannel-api.herokuapp.com/v1/engineer';
    axios
      .post(url, personalData)
      .then(res => {
        console.log('res axios ', res);
        this.setState({
          message: res.data.message,
          name_engineer: res.data.name_engineer,
          description: res.data.description,
          location: res.data.location,
          birth: res.data.birth,

          // const success = res.data.msg;

          // if (success === 'success') {
          //   Swal.fire({title: 'Success.',
          //   text: 'Your account has been created. Please login.',
          //   icon: 'success'})
          // } else if (success === 'failed') {
          //   Swal.fire({title: 'Failed.',
          //   text: 'This account already exist.',
          //   icon: 'warning'})
          // }
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          err: err,
          message: 'Register failed.',
        });
      });
  };

  continue = e => {
    e.preventDefault();
    // PROCESS FORM ATAU SEND DATA TO API (AXIOS HERE)

    const personalData = {
      name_engineer: this.state.name_engineer,
      description: this.state.description,
      location: this.state.location,
      birth: this.state.birth,
    };
    // const { values: { name_engineer, description, location, birth   } } = this.props;

    this.getFetch(personalData);
    //this.props.nextStep()
  };

  onPress = () => {
    this.props.navigation.navigate('SignIn');
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <ScrollView>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <Text style={styles.title}>Register As User</Text>
            <Text style={styles.description}>
              Please complete your data account
            </Text>

            {/* Radio Button */}
            <View style={styles.radioButton}>
              <Radio
                color={'#F4CF5D'}
                selectedColor={'#F4CF5D'}
                onPress={() => {
                  this.setState({role: 'engineer'});
                  console.log(this.state.role);
                }}
                selected={this.state.role == 'engineer'}
              />
              <Text style={{marginLeft: 5}}>engineer</Text>
              <Radio
                color={'#F4CF5D'}
                selectedColor={'#F4CF5D'}
                style={{marginLeft: 20}}
                onPress={() => {
                  this.setState({role: 'company'});
                  console.log(this.state.role);
                }}
                selected={this.state.role == 'company'}
              />
              <Text style={{marginLeft: 5}}>company</Text>
            </View>
            {/* End Radio Button */}

            {/* Form SigIn */}
            <View style={styles.formReg}>
              <View style={{marginBottom: 0, backgroundColor: 'white'}}>
                <View style={{marginBottom: 0}}>
                  <Input
                    label="Username"
                    onChangeText={this.username}
                    value={this.state.username}></Input>
                </View>
                <View style={{marginVertical: 10}}>
                  <Input
                    label="Password"
                    onChangeText={this.password}
                    value={this.state.password}
                    secureTextEntry={true}></Input>
                </View>
                <View style={{marginVertical: 10}}>
                  <Input
                    label="Full Name"
                    onChangeText={this.fullname}
                    value={this.state.fullname}></Input>
                </View>
                <View style={{marginVertical: 10}}>
                  <Input
                    label="Description"
                    onChangeText={this.description}
                    value={this.state.description}></Input>
                </View>
                <View style={{marginVertical: 10}}>
                  <Input
                    label="Location"
                    onChangeText={this.location}
                    value={this.state.location}></Input>
                </View>
                <View style={{marginVertical: 10}}>
                  <DatePicker
                    label="Date of birth"
                    defaultDate={new Date(1997, 12, 18)}
                    minimumDate={new Date(1945, 1, 1)}
                    maximumDate={new Date(2019, 12, 31)}
                    locale={'en'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={true}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeHolderText="Date of birth"
                    textStyle={{color: 'black'}}
                    placeHolderTextStyle={{color: '#a5b1c2'}}
                    onDateChange={this.setDate}
                    disabled={false}
                  />
                </View>
              </View>

              {/* Tauchable */}
              <View
                style={{
                  position: 'relative',
                  marginTop: 5,
                  // backgroundColor: 'pink',
                }}>
                <TouchableOpacity style={styles.btnReg} onPress={this.getFetch}>
                  <Text style={styles.textBtnReg}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnGoSignIn}
                  onPress={this.onPress}>
                  <Text style={styles.textBtnGoSignIn}>Or Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* End Form SigIn */}
          </View>
        </ScrollView>
      </View>
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
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 65,
    marginLeft: 49,
  },
  description: {
    fontFamily: 'AirbnbCerealBold',
    fontSize: 14,
    marginLeft: 51,
    color: '#a5b1c2',
    fontWeight: 'bold',
  },
  radioButton: {
    flexDirection: 'row',
    marginBottom: -30,
    marginHorizontal: 50,
    marginTop: 40,
  },
  formReg: {
    // height: 20,
    width: 300,
    justifyContent: 'center',
    // backgroundColor: 'green',
    marginHorizontal: 43,
    marginTop: 40,
  },
  btnReg: {
    backgroundColor: '#F4CF5D',
    width: 140,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  textBtnReg: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnGoSignIn: {
    // backgroundColor: '#F4CF5D',
    width: 140,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 150,
    marginTop: -46,
  },
  textBtnGoSignIn: {
    color: '#a5b1c2',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SignIn;
