import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Card} from 'native-base';

const CardEngineer = props => {
  return (
    // <View style={styles.containerView}>
    <Card style={styles.mainCard}>
      <View style={styles.overlayDark} />
      <Text style={styles.fullName}>{props.name}</Text>
      <Text style={styles.desc}>{props.description}</Text>
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
      <Text style={styles.textSkill}>Skill:</Text>
      <Text style={styles.textSkillItem}>{props.skill}</Text>
      <Image
        source={require('../../../assets/image/ava.jpg')}
        style={{height: 255, width: 170, borderRadius: 20}}
      />
    </Card>
    // </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: 'red',
    // marginHorizontal: 8,
    // marginVertical: 4,
  },
  mainCard: {
    borderRadius: 20,
    // height: 255,
    width: 170,
  },
  overlayDark: {
    position: 'absolute',
    height: 120,
    width: 170,
    //backgroundColor: '#F4CF5D',
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0.8,
    marginTop: 135,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  fullName: {
    fontFamily: 'AirbnbCerealBold',
    position: 'absolute',
    zIndex: 3,
    marginTop: 140,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 11,
  },
  desc: {
    position: 'absolute',
    zIndex: 3,
    marginTop: 160,
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
    paddingLeft: 11,
  },
  iconCheck: {
    position: 'absolute',
    zIndex: 3,
    marginLeft: 11,
    marginTop: 180,
    height: 10,
    width: 11,
  },
  textProject: {
    position: 'absolute',
    zIndex: 3,
    marginTop: 176.5,
    color: '#ffffff',
    fontSize: 11,
    // fontWeight:'bold',
    paddingLeft: 26,
  },
  iconStar: {
    position: 'absolute',
    zIndex: 3,
    marginLeft: 11,
    marginTop: 195,
    height: 10,
    width: 11,
  },
  textRate: {
    position: 'absolute',
    zIndex: 3,
    marginTop: 192,
    color: '#ffffff',
    fontSize: 11,
    // fontWeight:'bold',
    paddingLeft: 26,
  },
  textSkill: {
    position: 'absolute',
    zIndex: 3,
    marginTop: 210,
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
    paddingLeft: 11,
  },
  textSkillItem: {
    position: 'absolute',
    zIndex: 3,
    marginTop: 222,
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
    paddingLeft: 11,
  },
});

export default CardEngineer;
