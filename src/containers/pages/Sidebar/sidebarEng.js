import React, {Component} from 'react';
import {StyleSheet, ScrollView, StatusBar, Image} from 'react-native';
import {Container, Text, View} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';

export class SidebarEng extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
    };
  }

  render() {
    console.log(this.props);
    return (
      <Container
        style={{
          backgroundColor: '#fff',
          marginTop: 20,
          borderBottomRightRadius: 30,
          borderTopRightRadius: 30,
        }}>
        {/* Cross icon */}
        <TouchableHighlight
          underlayColor="1"
          // onPress={() => this.props.navigation.navigate('Home')}
        >
          <View
            style={{
              marginTop: 45,
              marginLeft: 20,
              paddingVertical: 5,
              // backgroundColor: '#F4CF5D',
            }}>
            <Icon name="times" size={20} color="#000" />
          </View>
        </TouchableHighlight>
        {/* End Cross icon */}

        {/* Photo Profile */}
        <View
          justifyContent="center"
          alignItems="center"
          style={{
            marginTop: 50,
            // backgroundColor: 'pink',
          }}>
          <Image
            source={require('../../../assets/image/image-dummy.jpeg')}
            style={{
              borderRadius: 100,
              height: 150,
              width: 150,
              shadowRadius: 2,
            }}
          />
        </View>

        {/* FullName */}
        <View
          justifyContent="center"
          alignItems="center"
          style={{
            marginTop: 18,
            // backgroundColor: 'pink',
          }}>
          <Text
            style={{
              // fontWeight: 'bold',
              fontSize: 24,
              fontFamily: 'AirbnbCerealBold',
            }}>
            {this.props.t}
            {/* {engineerProfile.name_engineer} */}
          </Text>
        </View>
        <View
          style={{
            marginTop: 50,
            marginLeft: 30,
            paddingVertical: 5,
          }}>
          <Icon name="briefcase" size={30} color="#F4CF5D" />
          <Text
            style={{
              fontFamily: 'AirbnbCerealMedium',
              // fontWeight: 'bold',
              fontSize: 21,
              marginTop: -28,
              marginLeft: 43,
            }}>
            Project
          </Text>
        </View>
        <TouchableOpacity onPress={this.props.signOut}>
          <View
            style={{
              marginTop: 290,
              marginLeft: 20,
              paddingVertical: 5,
              // backgroundColor: '#F4CF5D',
            }}>
            <Icon name="sign-out" size={25} color="#a5b1c2" />
            <Text
              style={{
                fontFamily: 'AirbnbCerealMedium',
                color: '#a5b1c2',
                // fontWeight: 'bold',
                fontSize: 17,
                marginTop: -24,
                marginLeft: 30,
              }}>
              Sign out
            </Text>
          </View>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default SidebarEng;
