import 'react-native-gesture-handler';
import React from 'react';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './screens/signup';
import PINScreen from './screens/pin';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const navigationOptions = { headerShown: false };
const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        let performTimeConsumingTask = async () => {
          return new Promise((resolve) =>
            setTimeout(() => {
              resolve('result');
            }, 3000)
          );
        };

        await performTimeConsumingTask();

        await Font.loadAsync({
          ...Ionicons.font,
          montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
          montserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        initalRoute = 'SignUp';
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
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
              options={navigationOptions}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
