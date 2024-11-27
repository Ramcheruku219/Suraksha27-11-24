
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../Config';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endApi } from '../../Components/EndApi'; // Import the API methods

export default function OtpVerify({ route }) {
    const { name, phone, email, address, phone_number, verificationId, setVerificationId, password } = route.params;
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(300);
    const inputRefs = useRef([]);
    const recaptchaVerifier = useRef(null);
    const navigation = useNavigation();

    const sendVerification = async () => {
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phone,
                recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            alert('The new OTP has been sent to your phone number!');
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const confirmCode = async () => {
        try {
            const verifyCode = otp.join('');
            const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verifyCode);
            await firebase.auth().signInWithCredential(credential);
            alert('Phone authentication successful!');

            if (phone_number) {
                const newCitizen = { phone_number, name };
                const response = await fetch(endApi.guestInsert(), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCitizen),
                });
                const data = await response.json();
                
                if (data.message === 'Success') {
                    newCitizen.citizen_id = data.data.citizen_id;
                    await AsyncStorage.setItem('UserProfile', JSON.stringify(newCitizen));
                    navigation.navigate('BottomTabs');
                } else {
                    alert('Error inserting data!');
                }
            } else {
                const newCitizen = { email, phone, name, password, address };
                const response = await fetch(endApi.insertCitizen(), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCitizen),
                });
                const data = await response.json();
                
                if (data.message === 'Success') {
                    newCitizen.citizen_id = data.data.citizen_id;
                    await AsyncStorage.setItem('UserProfile', JSON.stringify(newCitizen));
                    navigation.navigate('BottomTabs');
                } else {
                    alert('Error inserting data!');
                }
            }
        } catch (err) {
            setOtp(['', '', '', '', '', '']);
            setVerificationId('');
            alert(`Error: ${err.message}`);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleChange = (text, index) => {
        let newOtp = [...otp];
        if (text === '' && index > 0) {
            newOtp[index] = '';
            setOtp(newOtp);
            inputRefs.current[index - 1].focus();
        } else if (/^\d*$/.test(text)) {
            newOtp[index] = text;
            setOtp(newOtp);
            if (text && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleResend = async () => {
        setOtp(['', '', '', '', '', '']);
        setTimeLeft(300);
        inputRefs.current[0].focus();
        await sendVerification();
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    useEffect(() => {
        if (!otp.some(v => v === '')) {
            confirmCode();
        }
    }, [otp]);

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <Text style={styles.HeadTxt}>𝟲 𝗱𝗶𝗴𝗶𝘁-𝗰𝗼𝗱𝗲</Text>
            <Text style={styles.subtxt}>Enter the code we sent to {phone}</Text>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <React.Fragment key={index}>
                        <TextInput
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            style={styles.otpInput}
                            keyboardType="numeric"
                            maxLength={1}
                            ref={(el) => (inputRefs.current[index] = el)}
                        />
                        {index === 2 && <Text style={styles.separator}>—</Text>}
                    </React.Fragment>
                ))}
            </View>

            <Text style={styles.subtxt}>Code is expired in {formatTime(timeLeft)}s</Text>

            <TouchableOpacity onPress={handleResend}>
                <Text style={[styles.resendText, { color: timeLeft > 0 ? 'grey' : 'blue' }]}>Resend Code</Text>
            </TouchableOpacity>
        </View>
    );
}
