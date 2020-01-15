import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Image,
  Text,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Drawer} from 'native-base';

import NavHeader from '../../../components/molecules/NavHeader';
import CardEngineerList from '../../../containers/organisms/CardEngineerList';
import Sidebar from '../../../containers/pages/Sidebar/sidebarEng';

//redux
import {connect} from 'react-redux';
import {getEngineerProfile} from '../../../redux/actions/engineerProfile';
import {getProject} from '../../../redux/actions/project';

class HomeEngineer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: '',
      username: '',
      password: '',
      name_engineer: '',
      description: '',
      location: '',
      skill: '',
      skillData: [],
      project: [],
      name_company: '',
      name_project: '',
      status_project: '',
      chosenDate: new Date(),
    };
  }

  getData = async () => {
    const token = await AsyncStorage.getItem('token');
    const id_user = await AsyncStorage.getItem('id_user');
    const username = await AsyncStorage.getItem('username');
    const role = await AsyncStorage.getItem('role');
    console.log('token async ', token);
    if (role === 'engineer') {
      await this.props.dispatch(getEngineerProfile(token));
      const engineerProfile = await this.props.engineerProfile.engineerProfile;
      console.log('engineerFROM ', engineerProfile);
      this.setState({
        engineerProfile: engineerProfile,
      });
      console.log('SSSS ', this.props.engineerProfile);
    }
    if (this.props.engineerProfile.engineerProfile.skill) {
      const skillData = this.props.engineerProfile.engineerProfile.skill.split(
        ',',
      );
      this.setState({
        skillData: skillData,
      });
      console.log('SkillData=', skillData);
    } else {
      this.setState({
        skillData: ['Empty'],
      });
    }
    this.state.skillData;
  };

  // func go edit profile
  goEngineerProfile = () => {
    console.log('PRESS');
    const engineerProfile = this.props.engineerProfile.engineerProfile;
    this.props.navigation.navigate('EngineerProfile', {
      engineerProfile: engineerProfile,
    });
    console.log('FROM goEngineerProfile=', engineerProfile);
  };

  getProjects = async () => {
    const token = await AsyncStorage.getItem('token');
    const id_user = await AsyncStorage.getItem('id_user');
    const username = await AsyncStorage.getItem('username');
    const role = await AsyncStorage.getItem('role');
    // const auth = getAuth();
    // const url = `https://hiringchannel-api.herokuapp.com/v1/project`;

    await this.props.dispatch(getProject(token));
    const project = await this.props.project.project;
    console.log('projectFROM ', project);
    this.setState({
      project: project,
    });
    console.log('SSSS ', this.props);

    // axios.get(url, {Authorization: `Bearer ${token}`}).then(res => {
    //   this.setState({
    //     project: res.data.data,
    //     id_project: res.data.data[0].id_project,
    //     id_engineer: res.data.data[0].id_engineer,
    //     id_company: res.data.data[0].id_company,
    //     name_company: res.data.data[0].name_company,
    //     name_project: res.data.data[0].name_project,
    //     status_project: res.data.data[0].status_project,
    //     status_engineer: res.data.data[0].status_engineer,
    //   });
    //   console.log('PROJECT ', this.state.project);
    // });
  };

  closeDrawer() {
    this._drawer._root.close();
  }
  openDrawer() {
    this._drawer._root.open();
  }

  signOut = async () => {
    console.log('PRESS SignOut');
    await AsyncStorage.clear();
    this.props.navigation.navigate('SignIn');
  };

  componentDidMount() {
    this.getData();
    this.getProjects();
    // this.getCompanyProfile(`http://localhost:5000/v1/company/profile`)
  }

  render() {
    console.log('ISI', this.state.skillData);
    const engineerProfile = this.props.engineerProfile.engineerProfile;
    const project = this.props.project.project;
    console.log('ISI PROJECT', project);

    return (
      <Drawer
        ref={ref => {
          this._drawer = ref;
        }}
        content={<Sidebar navigator={this._navigator} signOut={this.signOut} />}
        onClose={() => this.closeDrawer()}>
        <Container style={{backgroundColor: 'white'}}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          {/* <NavHeader /> */}
          <View style={{flex: 1, backgroundColor: 'green'}}>
            {/* Header Image */}
            <View style={{backgroundColor: '#f4cf5d', height: 260}}>
              <Image
                source={require('../../../assets/image/image-dummy.jpeg')}
              />
            </View>
            <Image
              source={require('../../../assets/image/image-dummy.jpeg')}
              style={styles.imageProfile}
            />
            {/* End Image Header */}

            <Icon
              onPress={() => this.openDrawer()}
              name="briefcase"
              size={30}
              color="#fff"
              style={{
                position: 'absolute',
                marginTop: 45,
                marginLeft: 30,
              }}
            />

            {/* Detail profile */}
            <View style={{flex: 1, backgroundColor: 'white'}}>
              <View
                style={{position: 'absolute', marginLeft: 30, marginTop: 70}}>
                <Text
                  name={engineerProfile.name_engineer}
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    fontFamily: 'AirbnbCerealBold',
                  }}>
                  {engineerProfile.name_engineer}
                </Text>
                <Text style={styles.description}>
                  {engineerProfile.description}
                </Text>
                <Text style={styles.titleSkill}>Skill</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginLeft: -6,
                    flexWrap: 'wrap',
                  }}>
                  {/* <View style={styles.capsuleSkill}> */}
                  {this.state.skillData.map(data => {
                    return (
                      <Text style={styles.skillItem} key={data.id}>
                        {data}
                      </Text>
                    );
                  })}
                  {/* </View> */}
                </View>
                <Text style={styles.titleSkill}>List job</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginLeft: 0,
                    marginTop: 5,
                    flexWrap: 'wrap',
                  }}>
                  <Text style={styles.project}>{project.name_company}</Text>
                  <Text style={styles.project}>{project.name_project}</Text>
                  {/* <Text style={styles.project}>{project.status_project}</Text> */}
                </View>
              </View>

              {/* Button Edit */}
              <View
                style={{
                  position: 'absolute',
                  marginLeft: 250,
                }}>
                <TouchableOpacity
                  onPress={this.goEngineerProfile}
                  // onPress={() =>
                  //   this.props.navigation.navigate('EngineerProfile', {
                  //     engineerProfile: engineerProfile,
                  //   })
                  // }
                >
                  <Text title="Show modal" style={styles.btnHireMe}>
                    Edit profile
                  </Text>
                </TouchableOpacity>
              </View>
              {/* End Button Edit */}
            </View>
          </View>
        </Container>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  imageProfile: {
    position: 'absolute',
    borderRadius: 360,
    height: 125,
    borderColor: '#ffffff',
    borderWidth: 3,
    width: 125,
    marginLeft: 18,
    marginTop: 205,
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
    marginTop: 10,
    marginLeft: 25,
    height: 40,
    width: 105,
    borderRadius: 10,
    color: '#f4cf5d',
    fontWeight: 'bold',
    fontSize: 15,
    paddingHorizontal: 15,
    paddingVertical: 9,
    backgroundColor: '#ffffff',
    borderWidth: 2.5,
    borderColor: '#f4cf5d',
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
    fontWeight: 'bold',
    paddingTop: 16,
    paddingLeft: 93,
    width: 293,
    justifyContent: 'center',
    alignItems: 'center',
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
    // borderBottomRightRadius: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  btnModalDone: {
    marginTop: 32,
    width: 163,
    borderBottomRightRadius: 20,
    backgroundColor: '#F4CF5D',
    // borderBottomLeftRadius: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  description: {
    fontSize: 15,
    marginTop: -3,
    color: '#a5b1c2',
    fontWeight: 'bold',
  },
  titleSkill: {
    fontFamily: 'AirbnbCerealBold',
    marginTop: 60,
    marginLeft: 0,
    fontSize: 18,
    fontWeight: 'bold',
  },
  capsuleSkill: {
    backgroundColor: '#a5b1c2',
    borderRadius: 7,
    marginRight: 5,
    marginBottom: 5,
  },
  skillItem: {
    fontWeight: 'bold',
    backgroundColor: '#a5b1c2',
    padding: 5,
    margin: 6,
    borderRadius: 6,
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 17,
    paddingVertical: 7,
  },
  project: {
    fontWeight: 'bold',
    backgroundColor: '#F4CF5D',
    padding: 5,
    // margin: 6,
    marginTop: 5,
    borderRadius: 2,
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 17,
    paddingVertical: 7,
  },
});

const mapStateToProps = state => {
  return {
    engineerProfile: state.engineerProfile,
    project: state.project,
  };
};

const mapDispatchToProps = dispatch => ({
  getEngineerProfile,
  getProject,
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeEngineer);
