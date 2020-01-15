import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import {Input} from 'react-native-elements';
import {Container, Button} from 'native-base';
import ActionButton from 'react-native-action-button';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import NavHeader from '../../../components/molecules/NavHeader';
import CardEngineerList from '../../../containers/organisms/CardEngineerList';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import React, {Component} from 'react';

//redux
import {connect} from 'react-redux';
import {getCompanyProfile} from '../../../redux/actions/companyProfile';

export class CompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      role: '',
      id: '',
      name_engineer: '',
      description: '',
      location: '',
      skillData: [],
      chosenDate: new Date(),
      isModalVisible: false,
    };
  }

  getData = async () => {
    const token = await AsyncStorage.getItem('token');
    const id_user = await AsyncStorage.getItem('id_user');
    const username = await AsyncStorage.getItem('username');
    const role = await AsyncStorage.getItem('role');
    console.log('token async ', token);
    if (role === 'company') {
      await this.props.dispatch(getCompanyProfile(token));
      const companyProfile = await this.props.companyProfile.companyProfile;
      console.log('companyFROM ', companyProfile);
      this.setState({
        id: companyProfile.id,
        name_company: companyProfile.name_engineer,
        description: companyProfile.description,
        location: companyProfile.location,
      });
      console.log('SSSS ', this.state.description);
    }
  };

  handlePatch = async () => {
    console.log('SAVE UPDATE');
    alert('Data Updated');
    const token = await AsyncStorage.getItem('token');
    const id_user = await AsyncStorage.getItem('id_user');
    const username = await AsyncStorage.getItem('username');
    const role = await AsyncStorage.getItem('role');
    const companyProfile = this.props.companyProfile.companyProfile;

    const url = `https://hiringchannel-api.herokuapp.com/v1/engineer/${companyProfile.id}`;
    console.log('ID COMP', companyProfile.id);
    const data = {
      name_company: this.state.name_company,
      description: this.state.description,
      location: this.state.location,
    };
    console.log('data', data);
    const headers = {Authorization: `Bearer ${token}`};

    await axios
      .patch(url, null, {
        headers: headers,
        params: data,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    this.getData();
    // this.state.skillData;
    this.goHome();
  };

  goHome = () => {
    this.props.navigation.navigate('Home');
  };

  componentDidMount() {
    console.log('componentDidMount');
    // this.handlePatch();
    this.getData();
  }

  render() {
    const companyProfile = this.props.companyProfile.companyProfile;
    console.log('DESC', companyProfile.description);
    console.log('LOC', companyProfile.location);

    return (
      <View style={{flex: 1, backgroundColor: 'grey'}}>
        <StatusBar
          translucent
          backgroundColor="#dfe4ea"
          barStyle="dark-content"
        />
        {/* Header Image */}
        <View style={{backgroundColor: '#f1f2f6', flexDirection: 'row'}}>
          <TouchableHighlight
            underlayColor="1"
            onPress={() => this.props.navigation.navigate('Home')}>
            <Icon
              name="ios-arrow-round-back"
              size={55}
              justifyContent="center"
              alignItems="center"
              color="#000"
              style={{
                marginTop: 20,
                paddingLeft: 22,
                justifyContent: 'center',
              }}
            />
          </TouchableHighlight>

          <Text
            style={{
              height: 75,
              paddingTop: 32,
              paddingLeft: 20,
              fontSize: 22,
              fontWeight: 'bold',
              includeFontPadding: true,
              color: '#000',
              position: 'relative',
              // backgroundColor:'pink'
            }}>
            Edit profile
          </Text>
          <TouchableOpacity>
            <Text style={styles.btnHireMe} onPress={this.handlePatch}>
              SAVE
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'black',
            opacity: 0.6,
            height: 220,
            // width: 220,
          }}>
          <Image
            source={require('../../../assets/image/pexels-photo.jpeg')}></Image>
        </View>

        <Image
          source={require('../../../assets/image/pexels-photo.jpeg')}
          style={styles.imageProfile}
        />

        {/* End Image Header */}

        {/* Detail profile */}

        <View style={{flex: 1, backgroundColor: '#f1f2f6'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                position: 'relative',
                // marginLeft: 30,
                marginTop: 75,
                marginHorizontal: 15,
                // backgroundColor: 'pink',
              }}>
              <View style={{marginVertical: 10}}>
                <Input
                  label="Full Name"
                  onChangeText={text => this.setState({name_company: text})}
                  defaultValue={companyProfile.name_company}
                  value={this.state.name_company}
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Input
                  label="Bio"
                  onChangeText={text => this.setState({description: text})}
                  defaultValue={companyProfile.description}
                  value={this.state.description}
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Input
                  label="Location"
                  onChangeText={text => this.setState({location: text})}
                  defaultValue={companyProfile.location}
                  value={this.state.location}
                />
              </View>
            </View>
          </ScrollView>

          {/* Start Modal */}
          <Modal isVisible={this.state.isModalVisible}>
            <View style={styles.boardModal}>
              <Text style={styles.textModal}>Your Skill</Text>
              <TextInput
                placeholder="Type your skill here"
                onChangeText={text => this.setState({skill_item: text})}
                style={styles.textInputModal}></TextInput>
              <View style={{flexDirection: 'row'}}>
                <Button
                  title="CANCEL"
                  onPress={this.handleSkillDel}
                  style={styles.btnModalCancel}>
                  {/* <IconAwesome
                      name="times"
                      size={24}
                      color="#fff"
                      style={{marginHorizontal: 70}}
                    /> */}
                </Button>
                <Button
                  title="ADD"
                  onPress={this.handleSkillUpgrade}
                  style={styles.btnModalDone}>
                  {/* <IconAwesome
                      name="check"
                      size={24}
                      color="#fff"
                      style={{marginHorizontal: 70}}
                    /> */}
                </Button>
              </View>
            </View>
          </Modal>
          {/* End Modal */}
        </View>
      </View>
    );
  }
}

// const EngineerProfile = () => {
//   return (

//   );
// };

const styles = StyleSheet.create({
  imageProfile: {
    position: 'absolute',
    borderRadius: 360,
    height: 114,
    borderColor: '#f1f2f6',
    borderWidth: 3,
    width: 114,
    marginLeft: 15,
    marginTop: 240,
    opacity: 1,
    zIndex: 1,
  },
  iconCheck: {
    marginTop: 20,
    height: 20,
    width: 20,
  },
  textProject: {
    marginTop: -21,
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 27,
  },
  iconStar: {
    marginTop: 7,
    height: 20,
    width: 20,
  },
  textRate: {
    marginTop: -20,
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 27,
  },
  btnHireMe: {
    // fontFamily: 'AirbnbCerealBold',
    marginTop: 15,
    marginLeft: 18,
    color: '#f4cf5d',
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 130,
    paddingTop: 23,
  },

  boardModal: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    // marginHorizontal: 12.5,
    height: 200,
    width: 326,
  },

  textInputModal: {
    // paddingLeft: 25,
    marginTop: 26,
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    width: 260,
    marginHorizontal: 30,
    fontSize: 16,
  },
  btnModalCancel: {
    marginTop: 32,
    width: 163,
    borderBottomLeftRadius: 20,
    backgroundColor: '#161413',
    fontFamily: 'AirbnbCerealMedium',
    color: '#fff',
  },
  btnModalDone: {
    marginTop: 32,
    width: 163,
    borderBottomRightRadius: 20,
    backgroundColor: '#F4CF5D',
    fontFamily: 'AirbnbCerealMedium',
    color: '#fff',
  },
  description: {
    fontSize: 15,
    marginTop: -3,
    color: '#a5b1c2',
    fontWeight: 'bold',
  },
  titleSkill: {
    marginTop: 30,
    marginLeft: 0,
    fontSize: 18,
    fontWeight: 'bold',
  },
  capsuleSkill: {
    backgroundColor: '#a5b1c2',
    borderRadius: 8,
    marginRight: 5,
    marginBottom: 5,
  },
  skillItem: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 16,
    paddingHorizontal: 17,
    paddingVertical: 7,
  },
  boardModal: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 12.5,
    height: 200,
    width: 326,
  },
  textModal: {
    fontSize: 24,
    // fontWeight: 'bold',
    fontFamily: 'AirbnbCerealBold',
    paddingTop: 16,
    paddingLeft: 108,
    width: 293,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputModal: {
    // paddingLeft: 25,
    fontWeight: 'normal',
    fontSize: 18,
    marginTop: 26,
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    width: 260,
    marginHorizontal: 30,
    fontSize: 16,
  },
  btnModalCancel: {
    marginTop: 33,
    width: 163,
    borderBottomLeftRadius: 20,
    // backgroundColor: '#a5b1c2',
    backgroundColor: '#161413',
  },
  btnModalDone: {
    marginTop: 33,
    width: 163,
    borderBottomRightRadius: 20,
    backgroundColor: '#F4CF5D',
  },
});

const mapStateToProps = state => {
  return {
    companyProfile: state.companyProfile,
  };
};

const mapDispatchToProps = dispatch => ({
  getCompanyProfile,
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);
