
// import React, { useState, useRef, useEffect } from 'react';
// import { Text, View, TouchableOpacity, Image } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import styles from './style';
// import { useNavigation } from '@react-navigation/native';
// import firebase from 'firebase/compat/app';
// import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
// import { firebaseConfig } from '../Config/index';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Loader from '../Loader';
// import { TextInput } from 'react-native-paper'; // Importing from react-native-paper
// import { endApi } from '../../Components/EndApi'; // Import the API methods

// export default function Citizenlogin() {

//     const [phone, setPhone] = useState('');
//     const [username, setUserName] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [verificationId, setVerificationId] = useState('');

//     const recaptchaVerifier = useRef(null);

//     const navigation = useNavigation();

//     const GetUser = async () => {
//         const check = await AsyncStorage.getItem('UserProfile');
//         if (check) {
//             navigation.navigate('DrwerNavigation')
//             return;
//         }
//     }

//     useEffect(() => {
//         GetUser()
//     }, [])

//     const sendVerification = async () => {
//         try {
//             const phoneProvider = new firebase.auth.PhoneAuthProvider();
//             const verificationId = await phoneProvider.verifyPhoneNumber(
//                 phone,
//                 recaptchaVerifier.current
//             );
//             setVerificationId(verificationId);
//             navigation.navigate('OTP', { phone, verificationId, setVerificationId });
//         } catch (err) {
//             alert(`Error: ${err.message}`);
//         }
//     };

//     const SingUp = async () => {
//         if (username && password) {
//             setLoading(true);
//             try {
//                 // Fetch user details using the API
//                 const response = await fetch(endApi.getUserDetails(username));
//                 const dataJson = await response.json();

//                 if (dataJson.length > 0) {
//                     if (password === dataJson[0].password) {
//                         await AsyncStorage.setItem('UserProfile', JSON.stringify(dataJson[0]));
//                         setTimeout(() => {
//                             navigation.navigate('DrwerNavigation');
//                             setLoading(false);
//                         }, 1500);
//                     } else {
//                         alert('You have entered the wrong password!');
//                     }
//                 } else {
//                     alert('You have entered the wrong username!');
//                 }
//             } catch (error) {
//                 alert('Login failed. Please try again.');
//             } finally {
//                 setLoading(false);
//             }
//         } else {
//             alert('Please Enter username and password!');
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <StatusBar style="dark" />
//             <FirebaseRecaptchaVerifierModal
//                 ref={recaptchaVerifier}
//                 firebaseConfig={firebaseConfig}
//             />
//             <View style={styles.ImageCntr}>
//                 <Image
//                     source={require('../../assets/new-logo.png')}
//                     style={styles.logo}
//                     resizeMode="contain"
//                 />
//             </View>

//             <Text style={styles.headTxt}>Welcome Back</Text>
//             <Text style={styles.subHeader}>Login to Crime Control Portal</Text>

//             <View style={styles.inputContainer}>
//                 <TextInput
//                     mode="outlined" // Using outlined mode
//                     label="Username"
//                     value={username}
//                     onChangeText={setUserName}
//                     placeholder="Enter Your Username"
//                     placeholderTextColor="#999"
//                     style={styles.textInput}
//                     theme={{
//                         colors: {
//                             primary: '#6200ee', // Focused color
//                             background: '#fff', // Background color
//                             outline: '#6200ee', // Outline color
//                             text: '#333', // Text color
//                         },
//                     }}
//                 />
//             </View> 

//             <View style={styles.inputContainer}>
//                 <TextInput
//                     mode="outlined" // Using outlined mode
//                     label="Password"
//                     value={password}
//                     secureTextEntry
//                     onChangeText={setPassword}
//                     placeholder="Enter Your Password"
//                     placeholderTextColor="#999"
//                     style={styles.textInput}
//                     theme={{
//                         colors: {
//                             primary: '#6200ee', // Focused color
//                             background: '#fff', // Background color
//                             outline: '#6200ee', // Outline color
//                             text: '#333', // Text color
//                         },
//                     }}
//                 />
//             </View>

//             <TouchableOpacity style={styles.loginButton} onPress={SingUp}>
//                 <Text style={styles.buttonText}>Login</Text>
//             </TouchableOpacity>
//             {loading && <Loader />} 
//             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
//                 <Text style={styles.subtxt}>Don't have an account?</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('CitizenRegister')}>
//                     <Text style={{
//                         fontWeight: '700',
//                         color: '#2db8cb',
//                         textDecorationColor: '#2db8cb',
//                         textDecorationLine: 'underline',
//                         textDecorationStyle: 'solid'
//                     }}>
//                         Sign Up
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }

import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { firebaseConfig } from '../Config/index';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Loader';
import { TextInput } from 'react-native-paper';
import { endApi } from '../../Components/EndApi';
import Animated, { Easing, FadeIn, FadeOut, ZoomIn, ZoomOut, BounceInUp } from 'react-native-reanimated';

export default function CitizenLogin() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const recaptchaVerifier = useRef(null);
    const navigation = useNavigation();

    const GetUser = async () => { 
        const check = await AsyncStorage.getItem('UserProfile'); 
        if (check) { 
            navigation.navigate('DrwerNavigation'); 
        }
    };

    useEffect(() => {
        GetUser();
    }, []);

    const handleLogin = async () => { 
        if (username && password) {
            setLoading(true);
            try {
                const response = await fetch(endApi.getUserDetails(username));
                const dataJson = await response.json(); 

                if (dataJson.length > 0) { 
                    if (password === dataJson[0].password) {
                        await AsyncStorage.setItem('UserProfile', JSON.stringify(dataJson[0]));
                        navigation.navigate('DrwerNavigation');
                    } else {
                        Alert.alert('Error', 'Incorrect password.');
                    }
                } else {
                    Alert.alert('Error', 'Username not found.');
                }
            } catch (error) {
                Alert.alert('Error', 'Login failed. Please try again.');
            } finally {
                setLoading(false); 
            }
        } else { 
            Alert.alert('Error', 'Please enter username and password.');
        }
    };
    
    return (   
        <LinearGradient colors={['#29323c', '#485563']} style={styles.container}>
            <StatusBar style="light" />
            <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
            
            <View style={styles.card}>
                <Animated.View entering={ZoomIn.delay(500)} style={styles.logoContainer}>
                    <Image source={require('../../assets/new-logo.png')} style={styles.logo} resizeMode="contain"/>
                </Animated.View>

                <Animated.Text entering={FadeIn} style={styles.headerText}>Crime Control Portal</Animated.Text>
                <Animated.Text entering={FadeIn.delay(300)} style={styles.subtitleText}>Sign in to your account</Animated.Text>

                <View style={styles.inputContainer}>
                    <Animated.View entering={ZoomIn.delay(400)} style={{ width: '100%' }}>
                        <TextInput
                            mode="outlined"
                            label="Username"

                            value={username}
                            onChangeText={setUserName}
                            placeholder="Enter Your Username"
                            style={styles.textInput}
                            theme={{ colors: { primary: '#1e90ff', background: '#e8eef1', text: '#333' }}}
                        />
                    </Animated.View>

                    <Animated.View entering={ZoomIn.delay(500)} style={{ width: '100%' }}>
                        <TextInput
                            mode="outlined"
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter Your Password"
                            secureTextEntry
                            style={styles.textInput}
                            theme={{ colors: { primary: '#1e90ff', background: '#e8eef1', text: '#333' }}}
                        />
                    </Animated.View>
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Animated.Text entering={BounceInUp} style={styles.loginButtonText}>Log In</Animated.Text>
                </TouchableOpacity>
                {loading && <Loader />}

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don’t have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CitizenRegister')}>
                        <Text style={styles.signupLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    ); 
}

const styles = StyleSheet.create({       
    container: { 
        flex: 1,
        justifyContent: 'center',   
        alignItems: 'center', 
    }, 
    card: {
        width: '85%', 
        padding: 30,
        backgroundColor: '#f5f7fa', 
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 }, 
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    logoContainer: {
        marginBottom: 20,
    },
    logo: {
        width: 160,
        height: 50,
    },
    headerText: {
        fontSize: 28,
        fontWeight: '600',
        color: 'black',
        marginBottom: 5,
        textAlign: 'center',
    }, 
    subtitleText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,   
    },
    textInput: {
        marginBottom: 15,
        backgroundColor: '#e8eef1',
        borderRadius: 8,
    },
    loginButton:{ 
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#1e90ff',
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    signupText: {
        color: '#333',
    },
    signupLink: {
        color: '#1e90ff',
        marginLeft: 5,
        fontWeight: 'bold',
    },
});
