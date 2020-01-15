import React from 'react';
import {View, TextInput, Image, StyleSheet} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

const NavHeader = props => {
  return (
    <View style={{backgroundColor: 'white', marginTop: 25}}>
      {/* Nav Header */}
      <View style={{height: 60, flexDirection: 'row'}}>
        <View style={styles.leftSide}>
          <TouchableHighlight onPress={props.onPress} underlayColor="1">
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                marginRight: 40,
              }}
              source={require('../../../assets/image/pexels-photo.jpeg')}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.centerSide}>
          <Image
            style={{width: 100, height: 45.33}}
            source={require('../../../assets/logo/arkademy-logo.png')}
          />
        </View>
        <View style={styles.rightSide}>
          <View style={styles.dotNotification}></View>
          <Image
            style={styles.iconNotification}
            source={require('../../../assets/icon/bell.png')}
          />
        </View>
      </View>
      {/* End Nav Header */}

      {/* Search */}
      <View style={styles.containerSearch}>
        <TextInput
          placeholder="Search "
          style={styles.search}
          onChangeText={props.onChangeText}
        />
      </View>
      {/* End Search */}
    </View>
  );
};

const styles = StyleSheet.create({
  leftSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'brown'
  },
  centerSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'blue'
  },
  rightSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'green'
  },
  dotNotification: {
    position: 'relative',
    height: 11,
    width: 11,
    backgroundColor: '#F4CF5D',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 50,
    marginLeft: 60,
    marginBottom: -11,
    zIndex: 2,
  },
  iconNotification: {
    width: 18,
    height: 18,
    marginLeft: 50,
    marginTop: 5,
    // position: 'relative'
  },
  containerSearch: {
    backgroundColor: 'white',
    marginTop: 0,
    marginBottom: 3.5,
    marginHorizontal: 16,
  },
  search: {
    height: 44,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    backgroundColor: '#ffffff',
    elevation: 4,
  },
});

export default NavHeader;
