import {StatusBar} from 'expo-status-bar';
import {MainProvider} from './context/MainContext';
import Navigator from './navigators/Navigator';
import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';

const App = () => {
  return (
    <MainProvider>
      <Navigator></Navigator>
      <StatusBar style="auto" />
    </MainProvider>
  );
};
export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <App />
  </ApplicationProvider>
);
