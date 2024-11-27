import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import styles from './style';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [resetOption, setResetOption] = useState('');

    const handleResetPassword = () => {
        // Reset errors
        setEmailError('');
        setPhoneNumberError('');

        // Validate email or phone number based on the selected reset option
        if (resetOption === 'email') {
            if (!email) {
                setEmailError('Email is required.');
                return;
            }
        } else if (resetOption === 'phoneNumber') {
            if (!phoneNumber) {
                setPhoneNumberError('Phone number is required.');
                return;
            }
            // Perform OTP sending logic for phone number reset here
            Alert.alert('Reset Link Sent', `An OTP has been sent to ${phoneNumber}.`);
        } else {
            // No reset option selected
            Alert.alert('Error', 'Please select a reset option.');
            return;
        }

        // Perform the logic for password recovery
        if (resetOption === 'email') {
            Alert.alert('Reset Link Sent', `A password reset link has been sent to ${email}.`);
        }

        // Clear the fields after submitting
        setEmail('');
        setPhoneNumber('');
        setEmailError('');
        setPhoneNumberError('');

        // Navigate back to the login screen
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>

            <TouchableOpacity
                style={[styles.resetOptionButton, resetOption === 'email' && styles.selectedResetOption]}
                onPress={() => setResetOption('email')}
            >
                <Text style={styles.resetOptionText}>Reset using Email</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>OR</Text>

            <TouchableOpacity
                style={[styles.resetOptionButton, resetOption === 'phoneNumber' && styles.selectedResetOption]}
                onPress={() => setResetOption('phoneNumber')}
            >
                <Text style={styles.resetOptionText}>Reset using Phone Number</Text>
            </TouchableOpacity>

            {resetOption === 'email' && (
                <>
                    <TextInput
                        label="Enter your email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.input}
                        mode="outlined"
                        error={!!emailError}
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                </>
            )}

            {resetOption === 'phoneNumber' && (
                <>
                    <TextInput
                        label="Enter your phone number"
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        keyboardType="numeric"
                        style={styles.input}
                        mode="outlined"
                        error={!!phoneNumberError}
                    />
                    {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
                </>
            )}

            <TouchableOpacity style={styles.resetPasswordButton} onPress={handleResetPassword}>
                <Text style={styles.resetPasswordText}>Reset Password</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ForgotPassword;
