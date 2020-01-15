import React from 'react';
import CardEngineer from '../../../components/molecules/CardEngineer';
import {TouchableHighlight} from 'react-native-gesture-handler';

const CardEngineerList = props => {
  return (
    <TouchableHighlight
      style={{paddingTop: 8, marginHorizontal: 7}}
      underlayColor="1"
      onPress={props.onPress}>
      <CardEngineer
        name={props.name}
        description={props.description}
        skill={props.skill}
      />
    </TouchableHighlight>
  );
};

export default CardEngineerList;
