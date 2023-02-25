import {StatusBar} from 'expo-status-bar';
import {MainProvider} from './context/MainContext';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppNavigator from './navigators/Navigator';

const App = () => {
  return (
    <MainProvider>
      <AppNavigator></AppNavigator>
      <StatusBar style="auto" />
    </MainProvider>
  );
};

export default () => (
  <>
  <IconRegistry icons={EvaIconsPack}></IconRegistry>
  <ApplicationProvider {...eva} theme={eva.dark}>
      <App />
    </ApplicationProvider>
  </>
);
