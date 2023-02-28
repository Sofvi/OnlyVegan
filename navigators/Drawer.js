import {
  Avatar,
  Drawer,
  DrawerItem,
  IndexPath,
  Layout,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Profile from '../views/Profile';
import Upload from '../views/Upload';
import Home from '../views/Home';

/**
export const DrawerSimpleUsageShowcase = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  return (
    <Drawer
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <DrawerItem title='Users'/>
      <DrawerItem title='Orders'/>
      <DrawerItem title='Transactions'/>
      <DrawerItem title='Settings'/>
    </Drawer>
  );
};
*/

//const {Navigator, Screen} = createDrawerNavigator();

const DrawerContent = (navigation, state) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
  >
    <DrawerItem title="Profile" />
    <DrawerItem title="Settings" />
  </Drawer>
);

const SideMenu = createDrawerNavigator();

export const HomeDrawer = () => (
  <SideMenu.Navigator
    useLegacyImplementation
    drawerContent={(props) => <DrawerContent {...props} />}
  >
    <SideMenu.Screen name="Home" component={Home} />
    <SideMenu.Screen name="Profile" component={Profile} />
    <SideMenu.Screen name="Settings" component={Upload} />
  </SideMenu.Navigator>
);
