import React, {Component} from 'react';
import {StyleSheet, ScrollView, StatusBar, Image} from 'react-native';
import {Container, Button, Drawer} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Grid} from 'react-native-easy-grid';

//redux
import {connect} from 'react-redux';
import {getCompanyProfile} from '../../../redux/actions/companyProfile';

import Sidebar from '../../../containers/pages/Sidebar';
import NavHeader from '../../../components/molecules/NavHeader';
import CardEngineerList from '../../../containers/organisms/CardEngineerList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataCompany: [],
      search: '',
      page: 1,
      limit: 50,
      username: '',
      id: '',
      id_company: '',
      name_company: '',
      sortBy: 'name',
      order: 'asc',
    };
  }

  getCompanyProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    const id_user = await AsyncStorage.getItem('id_user');
    const username = await AsyncStorage.getItem('username');
    const role = await AsyncStorage.getItem('role');

    await this.props.dispatch(getCompanyProfile(token));
    const companyProfile = await this.props.companyProfile.companyProfile;
    console.log('companyFROM ', companyProfile);
    this.setState({
      companyProfile: companyProfile,
    });
    console.log('SSSS ', this.props);
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

          this.props.companyProfile.companyProfile;
          console.log('res redux', this.props.companyProfile.companyProfile);
        });
    }
  };

  handleSearch = text => {
    console.log('VALUES ', text);
    this.setState({search: text});
  };

  handleSort = () => {
    const {data} = this.state;
    data.sort((a, b) => a - b).reverse();
    this.setState({data});
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
    this.getData(
      `https://hiringchannel-api.herokuapp.com/v1/engineer?limit=${this.state.limit}&page=${this.state.page}`,
    );
    this.getCompanyProfile(
      `https://hiringchannel-api.herokuapp.com/v1/company/profile`,
    );
  }

  render() {
    let filtered = this.state.data.filter(data => {
      return (
        data.name_engineer
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    return (
      <Drawer
        ref={ref => {
          this._drawer = ref;
        }}
        content={
          <Sidebar
            navigator={this._navigator}
            goProfile={() => this.props.navigation.navigate('CompanyProfile')}
            signOut={this.signOut}
          />
        }
        onClose={() => this.closeDrawer()}>
        <Container style={{backgroundColor: 'white'}}>
          <StatusBar
            translucent
            backgroundColor="white"
            barStyle="dark-content"
          />

          <NavHeader
            onChangeText={this.handleSearch}
            value={this.state.search}
            onPress={() => this.openDrawer()}
          />
          {/* Button sort */}
          <Button onPress={this.handleSort} style={styles.btnSort}>
            <Image
              source={require('../../../assets/icon/filter-icon.png')}
              style={{
                zIndex: 2,
                height: 40,
                width: 40,
                marginHorizontal: 9.7,
                marginTop: 7,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </Button>
          {/* End Button sort */}

          <ScrollView showsVerticalScrollIndicator={false}>
            <Grid
              style={{
                marginTop: 5,
                marginBottom: 10,
                flexWrap: 'wrap',
                justifyContent: 'center',
                // backgroundColor: 'pink',
                flexDirection: 'row',
              }}>
              {filtered.map(data => {
                return (
                  <CardEngineerList
                    key={data.id}
                    name={data.name_engineer}
                    description={data.description}
                    skill={data.skill}
                    goDetail={data.id}
                    id_company={this.state.id_company}
                    name_company={this.state.name_company}
                    onPress={() =>
                      this.props.navigation.navigate('CardEngineerDetail', {
                        id: data.id,
                        id_company: this.state.id_company,
                        name_company: this.state.name_company,
                        name_engineer: data.name_engineer,
                        description: data.description,
                        skill: data.skill,
                      })
                    }
                  />
                );
              })}
            </Grid>
          </ScrollView>
          {/* End Grid Card */}
        </Container>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  btnSort: {
    position: 'absolute',
    backgroundColor: '#f4cf5d',
    marginTop: 670,
    marginLeft: 310,
    zIndex: 1,
    height: 60,
    width: 60,
    flex: 1,
    borderRadius: 100,
    elevation: 3,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
