import {StatusBar} from 'expo-status-bar';
import {MainProvider} from './context/MainContext';
import Navigator from './navigators/Navigator';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';

const App = () => {
  return (
    <MainProvider>
      <Navigator></Navigator>
      <StatusBar style="auto" />
    </MainProvider>
  );
};

//export default App;

export default () => (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <App />
    </ApplicationProvider>
);
