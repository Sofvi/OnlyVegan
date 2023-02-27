import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import {MainProvider} from './context/MainContext';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppNavigator} from './navigators/Navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useCallback} from 'react';

SplashScreen.preventAutoHideAsync();

const App = () => {
  return (
    <MainProvider>
      <AppNavigator></AppNavigator>
    </MainProvider>
  );
};

export default () => {
  const [fontsLoaded] = useFonts({
    'Karla-Bold': require('./assets/fonts/Karla-Bold.ttf'),
    'Karla-Light': require('./assets/fonts/Karla-Light.ttf'),
    'Karla-Regular': require('./assets/fonts/Karla-Regular.ttf'),

    'Merriweather-Black': require('./assets/fonts/Merriweather-Black.ttf'),
    'Merriweather-Regular': require('./assets/fonts/Merriweather-Regular.ttf'),
    'Merriweather-Bold': require('./assets/fonts/Merriweather-Bold.ttf'),

    'AnticDidone-Regular': require('./assets/fonts/AnticDidone-Regular.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
  <>
    <IconRegistry icons={EvaIconsPack}></IconRegistry>
    <ApplicationProvider {...eva} theme={eva.dark}>
      <SafeAreaProvider>
        <App></App>
      </SafeAreaProvider>
    </ApplicationProvider>
  </>
  )
};
