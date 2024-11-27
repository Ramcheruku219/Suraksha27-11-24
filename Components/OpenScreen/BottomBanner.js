

import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { useLanguage } from '../Language/LanguageContext'; // Import useLanguage hook
import translations from '../Language/translations'; // Import translations
import { useNavigation } from '@react-navigation/native';


const BottomBanner = () => { 
  const { width } = Dimensions.get('window'); 
  const circleSize = width * 1.5; 
  const [modalVisible, setModalVisible] = useState(false); 
  const { selectedLanguage, setSelectedLanguage } = useLanguage(); // Use useLanguage hook
  const languages = ["English", "हिंदी"]; 
  const navigation = useNavigation(); // Use useNavigation hook 

  const changeLanguage = (language) => { 
    setSelectedLanguage(language); 
    setModalVisible(false);
    navigation.navigate('OpenScreen');
  };

  const currentTranslations = translations[selectedLanguage];

  return (
    <View style={styles.bottomContainer}>
      <View style={[styles.circle, styles.circleLeft, { width: circleSize, height: circleSize, left: -circleSize / 2.5, top: -15 }]} />
      <View style={[styles.circle, styles.circleRight, { width: circleSize, height: circleSize, right: -circleSize / 2, top: 90 }]} />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>{currentTranslations.welcome}</Text>
        <Text style={styles.subText}>{currentTranslations.description}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} 
          style={{
            backgroundColor: '#fff',
            padding: 7,
            margin: 12,
            borderRadius:5  
          }} 
        > 
          <Text style={styles.languageButton}>{currentTranslations.selectLanguage}</Text>
        </TouchableOpacity>
      </View> 
      <Modal 
        animationIn={'zoomInUp'} 
        animationOut={'zoomOutUp'}
        transparent={true}
        isVisible={modalVisible}
        onBackButtonPress={() => setModalVisible(false)} 
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContainer}>  
          <Text style={styles.modalTitle}>{currentTranslations.modalTitle}</Text> 
          <FlatList 
            data={languages}
            renderItem={({ item }) => 
              <TouchableOpacity onPress={() => changeLanguage(item)}> 
                <Text style={styles.modalOption}>{item}</Text> 
              </TouchableOpacity>} 
            keyExtractor={item => item} 
        
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200, // Adjust the height as necessary
    // overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000, // to ensure a perfect circle
  },
  circleLeft: {
    backgroundColor: '#FDD6BE',
  },
  circleRight: { 
    backgroundColor: '#F8C9C1', 
  },
  textContainer: {
    position: 'absolute',
    left: 0,
    alignItems: 'flex-start',
    zIndex: 1
  },
  welcomeText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000'
  },
  subText: {
    color: '#000',
    fontSize: 16,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  languageButton: {
    color: '#0000FF'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    fontSize: 18,
    padding: 10,
  },
});

export default BottomBanner;


