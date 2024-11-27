// // LanguageContext.js
// import React, { createContext, useState, useContext } from 'react';

// const LanguageContext = createContext();

// export const useLanguage = () => useContext(LanguageContext);

// export const LanguageProvider = ({ children }) => {
//   const [selectedLanguage, setSelectedLanguage] = useState('English');

//   return (
//     <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };


// LanguageContext.js


import React, { createContext, useContext, useState } from 'react';
import translations from '../Language/translations';
import flashtrs from './flashtrs';

// Create a context with default value 'English'
const LanguageContext = createContext({
  selectedLanguage: 'English',
  setSelectedLanguage: () => {},
  translations: translations['English'],
});

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const contextValue = {
    selectedLanguage,
    setSelectedLanguage,
    translations: translations[selectedLanguage],
    flashtrs: flashtrs[selectedLanguage],
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);



