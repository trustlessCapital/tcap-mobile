import React from 'react';
import { View, StatusBar } from 'react-native';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const StatusBarColor = ({ backgroundColor, ...props }) => (
  <View style={{ height: STATUSBAR_HEIGHT, backgroundColor }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default StatusBarColor;
