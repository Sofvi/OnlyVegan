import {StatusBar} from 'expo-status-bar';
import {MainProvider} from './context/MainContext';
import Navigator, {AppNavigator} from './navigators/Navigator';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {useFonts} from 'expo-font';

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

  return (
  <>
  <IconRegistry icons={EvaIconsPack}></IconRegistry>
   <ApplicationProvider {...eva} theme={eva.dark}>
    <App />
  </ApplicationProvider>
  </>
  )
};
