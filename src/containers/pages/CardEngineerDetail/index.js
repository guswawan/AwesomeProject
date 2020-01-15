import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Button, Container} from 'native-base';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//redux
import {connect} from 'react-redux';
import {getCompanyProfile} from '../../../redux/actions/companyProfile';

export class CardEngineerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      id_company: '',
      name_company: '',
      name_project: '',
      status_project: '',
      status_engineer: '',
    };
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  getCompanyProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    const id_user = await AsyncStorage.getItem('id_user');
    const username = await AsyncStorage.getItem('username');
    const role = await AsyncStorage.getItem('role');

    await this.props.dispatch(getCompanyProfile(token));
    const companyProfile = await this.props.companyProfile.companyProfile;
    console.log('companyFROM ', this.props);
    this.setState({
      companyProfile: companyProfile,
    });
    console.log('SSSS ', this.props);

    // axios
    //   .get('https://hiringchannel-api.herokuapp.com/v1/company/profile', {
    //     headers: {Authorization: `Bearer ${token}`},
    //   })
    //   .then(res => {
    //     console.log('res axios pro company ', res.data.data[0]);
    //     this.setState({
    //       dataCompany: res.data.data[0],
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.setState({
    //       dataCompany: 'Not Found.',
    //     });
    //   });
    // this.props.history.push('/company');
  };

  getData = async () => {
    const token = await AsyncStorage.getItem('token');
    const id_user = await AsyncStorage.getItem('id_user');
    const username = await AsyncStorage.getItem('username');
    const role = await AsyncStorage.getItem('role');
    console.log('token async ', token);
    let url = [
      'https://hiringchannel-api.herokuapp.com/v1/company/profile',
      `https://hiringchannel-api.herokuapp.com/v1/engineer?limit=${this.state.limit}&page=${this.state.page}`,
    ];
    if (role === 'company') {
      // await this.props.dispatch(getEngineer(token));
      // const engineerList = await this.props.engineerList;
      // this.setState({
      //   engineerList: engineerList,
      // });
      // console.log('THIS PROP REDUX ', this.props);

      axios
        .get(url[1], {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
          console.log('res axios ', res.data);
          this.setState({
            data: res.data.result,
          });
          // this.props.companyProfile.companyProfile;
          // console.log('res redux', this.props);
          axios
            .get(url[0], {
              headers: {Authorization: `Bearer ${token}`},
            })
            .then(res => {
              console.log('res axios pro company ', res.data.data[0]);
              this.setState({
                dataCompany: res.data.data,
                id_company: res.data.data[0].id,
                name_company: res.data.data[0].name_company,
                description: res.data.data[0].description,
                location: res.data.data[0].location,
              });
            });
        });
    }
  };

  handleHire = async () => {
    console.log('PRESS HIRING');
    alert('Success');
    // console.log("COO ",this.getProfileCompany(`http:localhost:5000/v1/company/profile`))
    const token = await AsyncStorage.getItem('token');
    const id_user = await AsyncStorage.getItem('id_user');
    const username = await AsyncStorage.getItem('username');
    const role = await AsyncStorage.getItem('role');
    const id = this.props.navigation.getParam('id');
    const dataCompany = this.props.companyProfile.companyProfile;
    console.log('DATA COMPANY', dataCompany);
    console.log('ID ENG', id);

    const url = `https://hiringchannel-api.herokuapp.com/v1/project`;
    const data = {
      name_project: this.state.name_project,
      id_engineer: id,
      id_company: dataCompany.id,
      status_project: 'Pending',
      status_engineer: 'Pending',
    };
    console.log('DATA HIRE ', data);
    const headers = {Authorization: `Bearer ${token}`};

    axios
      .post(url, null, {
        headers: headers,
        data: data,
      })
      .then(res => {
        console.log('RES handleHire', res);
      })
      .catch(err => {
        console.log(err);
      });
    this.toggleModal();
  };

  componentDidMount() {
    console.log('DIDMOUNT');
  }

  render() {
    const id = this.props.navigation.getParam('id');
    console.log('DATA COMPANY', this.props.companyProfile.companyProfile);
    console.log('ID ENG', id);

    const id_company = this.props.navigation.getParam('id_company');
    const name_company = this.props.navigation.getParam('name_company');
    const name_engineer = this.props.navigation.getParam('name_engineer');
    const description = this.props.navigation.getParam('description');
    const skill = this.props.navigation.getParam('skill');

    // console.log('ID ENG ', this.props.location.state[0].data);
    // console.log('ID COMP ', this.props.location.state[1].data2);
    // console.log('NAME COMP ', this.props.location.state[2].data);
    // const name_company = this.props.location.state[2].data;

    return (
      <View style={{flex: 1, backgroundColor: 'green'}}>
        {/* Header Image */}
        <View style={{backgroundColor: 'yellow', height: 300}}>
          <Image source={require('../../../assets/image/image-dummy.jpeg')} />
        </View>
        <Image
          source={require('../../../assets/image/image-dummy.jpeg')}
          style={styles.imageProfile}
        />
        {/* End Image Header */}

        {/* Detail profile */}
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{position: 'absolute', marginLeft: 178, marginTop: 8}}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                fontFamily: 'AirbnbCerealBold',
              }}>
              {name_engineer}
            </Text>
            <Text style={{fontSize: 15, marginTop: -3}}>{description}</Text>
            <Image
              source={require('../../../assets/icon/check.png')}
              style={styles.iconCheck}
            />
            <Text style={styles.textProject}>18 Project</Text>
            <Image
              source={require('../../../assets/icon/star.png')}
              style={styles.iconStar}
            />
            <Text style={styles.textRate}>89% Success Rate</Text>

            <View
              style={{
                position: 'absolute',
                marginTop: 160,
                marginLeft: -150,
              }}>
              <Text
                style={{
                  // marginTop: 200,
                  // marginLeft: -150,
                  fontSize: 18,
                  fontFamily: 'AirbnbCerealBook',
                }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </Text>
            </View>
            <Text
              style={{
                marginTop: 200,
                marginLeft: -150,
                fontSize: 18,
                fontFamily: 'AirbnbCerealBold',
              }}>
              Skill:
            </Text>
            <Text
              style={{
                marginLeft: -150,
                fontSize: 18,
                paddingRight: 15,
                fontFamily: 'AirbnbCerealMedium',
              }}>
              {skill}
            </Text>
          </View>

          {/* Button Hire Me */}
          <View style={{position: 'absolute'}}>
            <Button
              title="Show modal"
              onPress={this.toggleModal}
              style={styles.btnHireMe}>
              <Text style={styles.textBtnHireMe}>Hire Me</Text>
            </Button>
          </View>
          {/* End Button Hire Me */}

          {/* Start Modal */}
          <Modal isVisible={this.state.isModalVisible}>
            <View style={styles.boardModal}>
              <Text style={styles.textModal}>Input Project</Text>
              <TextInput
                placeholder="Type project here"
                onChangeText={text => this.setState({name_project: text})}
                style={styles.textInputModal}></TextInput>
              <View style={{flexDirection: 'row'}}>
                <Button
                  title="Hide modal"
                  onPress={this.toggleModal}
                  style={styles.btnModalCancel}>
                  <Icon
                    name="times"
                    size={24}
                    color="#fff"
                    style={{marginHorizontal: 70}}
                  />
                </Button>
                <Button
                  title="Hide modal"
                  onPress={this.handleHire}
                  style={styles.btnModalDone}>
                  <Icon
                    name="check"
                    size={24}
                    color="#fff"
                    style={{marginHorizontal: 70}}
                  />
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

const styles = StyleSheet.create({
  imageProfile: {
    position: 'absolute',
    borderRadius: 20,
    height: 190,
    width: 140,
    marginLeft: 19,
    marginTop: 250,
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
    marginTop: 425,
    height: 60,
    width: 414,
    borderRadius: 0,
    backgroundColor: '#F4CF5D',
  },
  textBtnHireMe: {
    fontSize: 24,
    // fontFamily: 'AirbnbCerealExtraBold',
    fontWeight: 'bold',
    color: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 150,
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
    paddingLeft: 90,
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

    // borderBottomRightRadius: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  btnModalDone: {
    marginTop: 33,
    width: 163,
    borderBottomRightRadius: 20,
    backgroundColor: '#F4CF5D',
    // borderBottomLeftRadius: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(CardEngineerDetail);
// export default CardEngineerDetail;
