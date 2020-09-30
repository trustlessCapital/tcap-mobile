import React from 'react';
import {View, StatusBar} from 'react-native';
import styles from '../stylesheets/status-bar-style';
const StatusBarColor = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default StatusBarColor;
