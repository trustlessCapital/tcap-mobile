/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignUp from './src/screens/signup';
import PINScreen from './src/screens/pin';
import SeedPhraseNoticeScreen from './src/screens/seedphrase-notice';
import SeedPhraseScreen from './src/screens/seedphrase';
import SeedPhraseRecoveryScreen from './src/screens/seedphrase-recovery';
import { PIN_SCREEN_MODE } from './src/constants';
import VerificationScreen from './src/screens/verification';
import DashboardScreen from './src/screens/dashboard';
import styles from './src/stylesheets/app';
import WalletService from './src/services/wallet-service';

const logoImage = require('./assets/splash.png');

const navigationOptions = {headerShown: false};
const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    account = null;
    async function loadResourcesAndDataAsync() {
      try {

        let performTimeConsumingTask = async () => {
          return new Promise(resolve =>
            setTimeout(() => {
              resolve('result');
            }, 2000),
          );
        };

        await performTimeConsumingTask();
        WalletService.getInstance();

        account = await AsyncStorage.getItem('account');
      } catch (e) {
        console.warn(e);
      } finally {
        if (account) {
          initalRoute = 'PINScreen';
        } else {
          initalRoute = 'SignUp'; 
        }
        setLoadingComplete(true);
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <>
        <SafeAreaView style={styles.wrapper}>
          <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={styles.container}>
                <Image style={styles.titleImage} source={logoImage} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initalRoute} headerMode="none">
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={navigationOptions}
            />
            <Stack.Screen
              name="PINScreen"
              component={PINScreen}
              initialParams={{mode: PIN_SCREEN_MODE.LOGIN_PIN}}
              options={navigationOptions}
            />
            <Stack.Screen
              name="VerificationScreen"
              component={VerificationScreen}
              options={navigationOptions}
            />
            <Stack.Screen
              name="SeedPhraseNoticeScreen"
              component={SeedPhraseNoticeScreen}
              options={navigationOptions}
            />
            <Stack.Screen
              name="SeedPhraseScreen"
              component={SeedPhraseScreen}
              options={navigationOptions}
            />
            <Stack.Screen
              name="SeedPhraseRecoveryScreen"
              component={SeedPhraseRecoveryScreen}
              options={navigationOptions}
            />
            <Stack.Screen
              name="DashboardScreen"
              component={DashboardScreen}
              options={navigationOptions}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
