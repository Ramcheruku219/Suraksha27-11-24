
import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './style';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../Config';
import Loader from '../Loader';
import { TextInput } from 'react-native-paper';

export default function CitizenRegister() {
   const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [createPassword, setCreatePassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [loading, setLoading] = useState(false);

    const recaptchaVerifier = useRef(null);

    const navigation = useNavigation();

    const validatePassword = (password) => {

        const validations = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#\$%\^&\*]/.test(password)
        };
        return validations;
    };

    const passwordValidations = validatePassword(createPassword);

    const passwordValid = [

        { label: '8 characters', valid: passwordValidations.length },
        { label: 'Uppercase', valid: passwordValidations.uppercase },
        { label: 'Lower Case', valid: passwordValidations.lowercase },
        { label: 'number', valid: passwordValidations.number },
        { label: 'special characters', valid: passwordValidations.special },

    ];

    const sendVerification = async () => {
        if (createPassword === confirmPassword) {
            if (Object.values(passwordValidations).every(Boolean)) {
                setLoading(true);
                try {
                    const phoneProvider = new firebase.auth.PhoneAuthProvider();
                    const verificationId = await phoneProvider.verifyPhoneNumber(
                        phone,
                        recaptchaVerifier.current
                    );
                    setVerificationId(verificationId);
                    const dataToSendToOTP = {
                        name,
                        phone,
                        email,
                        address,
                        verificationId,
                        setVerificationId,
                        password: createPassword
                    };
                    navigation.navigate('OTP', dataToSendToOTP);
                    setLoading(false);
                } catch (err) {
                    Alert.alert('Error', err.message);
                }
            } else {
                Alert.alert('Weak Password', 'Password must be at least 8 characters long, include upper and lower case letters, a number, and a special character.');
            }
        } else {
            Alert.alert('Password Mismatch', 'Passwords do not match');
        }
    };

    const SingUp = async () => {
        const check = name && phone;
        if (check) {
            if (phone.startsWith('+91') && phone.length === 14) {
                await sendVerification();
            } else {
                Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
            }
        } else {
            Alert.alert('Missing Information', 'Please enter your name and phone number');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.ImageCntr}>
                <Image
                    source={require('../../assets/new-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.HeadTxt}>Sign Up</Text>
            <Text style={styles.subtxt}>We might save and send a verification code to this phone number</Text>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
                <StatusBar style="dark" />
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        label="Enter Your Name"
                        value={name}
                        onChangeText={setName}
                        mode='outlined'
                        style={{ backgroundColor: 'white' }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        label="Enter Your Email"
                        value={email}
                        mode='outlined'
                        onChangeText={setEmail}
                        containerStyles={styles.input}
                        customLabelStyles={{ colorFocused: '#000', colorBlurred: '#ccc' }}
                        labelStyles={{ fontSizeFocused: 12 }}
                        inputStyles={{ paddingTop: 10 }}
                        staticLabel
                        hintTextColor="#aaa"
                        style={{ backgroundColor: 'white' }}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        label="Phone number"
                        value={phone}
                        onChangeText={setPhone}
                        mode='outlined'
                        keyboardType="number-pad"
                        containerStyles={styles.input}
                        customLabelStyles={{ colorFocused: '#000', colorBlurred: '#ccc' }}
                        labelStyles={{ fontSizeFocused: 12 }}
                        inputStyles={{ paddingTop: 10 }}
                        staticLabel
                        hintTextColor="#aaa"
                        onFocus={() => {
                            if (phone === '') {
                                setPhone('+91 ');
                            }
                        }}
                        onBlur={() => {
                            if (phone.startsWith('+91') && phone.length === 4) {
                                setPhone('');
                            }
                        }}
                        maxLength={14}
                        style={{ backgroundColor: 'white' }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        label="Enter Your Address"
                        value={address}
                        onChangeText={setAddress}
                        mode='outlined'
                        containerStyles={styles.input}
                        customLabelStyles={{ colorFocused: '#000', colorBlurred: '#ccc' }}
                        labelStyles={{ fontSizeFocused: 12 }}
                        inputStyles={{ paddingTop: 10 }}
                        staticLabel
                        hintTextColor="#aaa"
                        style={{ backgroundColor: 'white' }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        label="Create Password"
                        value={createPassword}
                        mode='outlined'
                        secureTextEntry
                        onChangeText={setCreatePassword}
                        containerStyles={styles.input}
                        customLabelStyles={{ colorFocused: '#000', colorBlurred: '#ccc' }}
                        style={{ backgroundColor: 'white' }}
                    />
                </View>
                <View style={{ borderWidth: 0.5, height: 150, width: "100%", borderRadius: 5, padding: 10 }}>
                    <Text>Password should contain the following rules</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            {passwordValid.slice(0, 3).map((item, index) => (
                                <View style={styles.criteriaItem} key={index}>
                                    <Ionicons name={item.valid ? "checkmark" : "close"} size={20} color={item.valid ? "green" : "#ccc"} />
                                    <Text style={item.valid ? styles.valid : styles.default}>{item.label}</Text>
                                </View>
                            ))}
                        </View>
                        <View>
                            {passwordValid.slice(3).map((item, index) => (
                                <View style={styles.criteriaItem} key={index}>
                                    <Ionicons name={item.valid ? "checkmark" : "close"} size={20} color={item.valid ? "green" : "#ccc"} />
                                    <Text style={item.valid ? styles.valid : styles.default}>{item.label}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        label="Confirm Password"
                        value={confirmPassword}
                        secureTextEntry
                        mode='outlined'
                        onChangeText={setConfirmPassword}
                        containerStyles={styles.input}
                        customLabelStyles={{ colorFocused: '#000', colorBlurred: '#ccc' }}
                        labelStyles={{ fontSizeFocused: 12 }}
                        inputStyles={{ paddingTop: 10 }}
                        staticLabel
                        hintTextColor="#aaa"
                        style={{ backgroundColor: 'white' }}
                    />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={SingUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <Text style={styles.subtxt}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Citizenlogin')}>
                        <Text style={{
                            fontWeight: '700',
                            color: '#2db8cb',
                            textDecorationColor: '#2db8cb',
                            textDecorationLine: 'underline',
                            textDecorationStyle: 'solid'
                        }}>
                            Log in
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
            {loading && <Loader />}
        </View>
    );
}
