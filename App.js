// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackScreen from './MainStackScreen';
import { LanguageProvider } from './Components/Language/LanguageContext';

const App = () => {

  return (
    <LanguageProvider>
      <NavigationContainer>
        <MainStackScreen />
      </NavigationContainer>
    </LanguageProvider>
  );
};

export default App;