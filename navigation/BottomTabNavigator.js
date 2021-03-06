import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodayScreen from '@screens/main/today';


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  navigation.setOptions({ headerTitle: null });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Today"
        component={TodayScreen}
      // options={{
      //   title: 'Get Started',
      //   tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
      // }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
  }
}
