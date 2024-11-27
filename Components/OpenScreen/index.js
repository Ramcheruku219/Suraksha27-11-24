import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './style';
import BottomBanner from './BottomBanner';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6, FontAwesome5, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function OpenScreen({ navigations }) {
    const navigation = useNavigation();

    React.useEffect(() => {
        const GetUser = async () => {
            const userData = await AsyncStorage.getItem('UserProfile');
            if (userData) {
                navigation.navigate('BottomTabs')
            }
        }
        GetUser(); 
    }, [])

  
    return (     
        <View style={styles.container}>            
            <StatusBar style="dark" /> 
            <Image
                source={require('../../assets/new-logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <TouchableOpacity style={styles.buttonOrg}
                onPress={() => { 
                    navigation.navigate('Organisation') 
                }}
            >
                <FontAwesome6 name="people-group" size={18} color="#fff" />
                <Text style={styles.buttonText}> User Department</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCitizen}
                onPress={() => {
                    navigation.navigate('Citizenlogin')
                }}
            >
                <FontAwesome5 name="user-alt" size={18} color="#fff"/> 
                <Text style={styles.buttonText}> Citizen</Text>  
            </TouchableOpacity>   
 
            {/* <TouchableOpacity style={styles.buttonCrime}   
                onPress={() => {  
                    navigation.navigate('Suraksha')
                }}
            >
                <Entypo name="shield" size={18} color="#fff" />
                <Text style={styles.buttonText}>Crime Control</Text>

            </TouchableOpacity> */}
            <BottomBanner />
        </View>
    );
}

