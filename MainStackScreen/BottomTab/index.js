import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CrimeReport from './CrimeReport';

// import Notification from './Notification';

import Profile from './Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons, MaterialIcons,Octicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


const BottomTab = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;

          switch (route.name) {
            case 'CrimeReport':
              iconComponent = focused ? (
                <Octicons name="report" size={size} color={color} />
              ) : (
                <Octicons name="report" size={size} color={color} />
              );
              
           
            //   break;
            // case 'Notification':
            //   iconComponent = focused ? (
            //     <Icon name="notifications" size={size} color={color} />
            //   ) : (
            //     <Icon name="notifications-outline" size={size} color={color} />
            //   );
              break;
            case 'Profile':
              iconComponent = focused ? (
                <Ionicons name="person-circle-outline" size={size} color={color} />
              ) : (
                <Ionicons name="person-circle-outline" size={size} color={color} />
              );
              break;
            default:
              iconComponent = null;
          }

          return iconComponent;
        },
        tabBarActiveTintColor: '#4069E5FF',
        tabBarInactiveTintColor: '#565E6CFF',
        headerShown: false,
      })}
    >
      <Tab.Screen name="CrimeReport" component={CrimeReport} />
  
      {/* <Tab.Screen name="Notification" component={Notification} /> */}
      <Tab.Screen name="Profile" component={Profile} />
     {/* <Tab.Screen name="Complaint" component={Compliant} /> */}
    </Tab.Navigator>
  );
};



export default BottomTab;