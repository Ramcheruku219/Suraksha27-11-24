import React, { useState, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Animated, SafeAreaView, View, Text, StatusBar, Image } from 'react-native';

import CitizenRegister from '../Components/CitizenRegister';
import Citizenlogin from '../Components/Citizenlogin';
import OtpVerify from '../Components/CitizenRegister/OtpVerify.js';
import OpenScreen from '../Components/OpenScreen';

//import FlashScreen from '../Compounents/FlashScreen/index.js';   

import ForgotPassword from '../Components/Language/ForgotPassword/ForgotPassword.js';
import BottomTabs from '../MainStackScreen/BottomTab'
import DrwerNavigation from './Drawer/index.js'; 

// import MapboxWebView from '../MapboxView/index.js';
// import LiveTrack from '../Compounents/LiveTrackline/index.js'; 
 
const MainStack = createStackNavigator();   
   
const MainStackScreen = () => {  
 
    return ( 

        <View style={{ flex: 1 }}>                 
            <StatusBar     
                backgroundColor="#20187f"     
                barStyle="light-content"   
            />                                              
                                                           
            <MainStack.Navigator>           

                {/* <MainStack.Screen  
                    name="FlashScreen"  
                    component={FlashScreen}  
                    options={{ headerShown: false }} 

                /> */}  
{/* 
                <MainStack.Screen 
                    name="OpenScreen"
                    component={OpenScreen} 
                    options={{ headerShown: false }}    
                />
                 */}
                
                 <MainStack.Screen
                    name="Citizenlogin"
                    component={Citizenlogin}
                    options={{ headerShown: false }}  
                />   
                 <MainStack.Screen                                 
                    name="CitizenRegister"                              
                    component={CitizenRegister}              
                    options={{ headerShown: false }}              
                />        

                 <MainStack.Screen                                  
                    name="OTP"                                
                    component={OtpVerify}                      
                />                           
                 <MainStack.Screen
                    name="ForgotPassword"      
                    component={ForgotPassword}  
                    options={{ headerShown: false }}    

                />  
                             
                <MainStack.Screen    
                    name="DrwerNavigation"                     
                    component={DrwerNavigation}             
                    options={{ headerShown: false}}   

                />

                <MainStack.Screen 
                    name="BottomTabs"      
                    component={BottomTabs}      
                    options={{ headerShown: false}}   

                />

                {/*             
                <MainStack.Screen
                    name="MapViewFull"
                    component={MapboxWebView}
                    options={{ headerShown: false }}
                /> */}
                {/* <MainStack.Screen
                    name="Custom Draw GIS"
                    component={LiveTrack}
                    options={{ headerShown: true }}
                /> */}


            </MainStack.Navigator> 
        </View>
    );
};


export default MainStackScreen;