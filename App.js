import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import {MainProvider} from './context/MainContext';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppNavigator} from './navigators/Navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <MainProvider>
      <AppNavigator></AppNavigator>
    </MainProvider>
  );
};

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack}></IconRegistry>
    <ApplicationProvider {...eva} theme={eva.dark}>
      <SafeAreaProvider>
        <App></App>
      </SafeAreaProvider>
    </ApplicationProvider>
  </>
);
