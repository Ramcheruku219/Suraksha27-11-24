
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MyCameraApp from './MyCameraApp.js';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style.js'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  React.useEffect(() => {
    const GetData = async () => {
      const userData = await AsyncStorage.getItem('UserProfile');
      const data = JSON.parse(userData);
      setName(data.name);
      setEmail(data.email);
      setPassword(data.password);
      setPhone(data.phone_number)
    }
    GetData()
  }, [])

  const handleSaveChanges = () => {
    console.log('Changes saved');
    console.log('Name:', name);
    console.log('Phone:', phone);
    console.log('Email:', email);
    console.log('Password:', password);
    Alert.alert('Success', 'Your changes have been saved successfully.');
  };

  const Logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Citizenlogin')
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../../assets/new-logo.png')} style={styles.logo} />
      <TouchableOpacity
        style={styles.logoutcntr} 
        onPress={Logout}
      >
        <MaterialCommunityIcons name="logout" size={24} color="black" />
        <Text style={{ fontWeight: 'bold' }}>  Logout</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Profile settings</Text>
      <View style={{}}>
        <View style={styles.profileImageContainer}>
          <MyCameraApp
            value={profileImage}
            onDocumentChange={setProfileImage}
            borderCross={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputWrapper}>
            <Text>{name}</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity style={styles.editButton}>
              <AntDesign name="edit" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.editButton}>
              <AntDesign name="edit" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.editButton}>
              <AntDesign name="edit" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={passwordVisible ? 'eye-off' : 'eye'}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;




