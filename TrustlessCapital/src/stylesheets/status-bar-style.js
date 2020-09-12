import {StyleSheet, StatusBar} from 'react-native';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
export default StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});