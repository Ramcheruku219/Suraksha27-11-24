import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import Animated, { FlipInEasyY, FlipOutEasyY } from 'react-native-reanimated';

const Loader = ({ message, status }) => {
    return (
        <LinearGradient
            colors={['rgba(10, 5, 68, 0.1)', 'rgba(10, 5, 68, 0.9)']}
            style={styles.gradient}
        >
            <Animated.View
                style={styles.container}
                entering={FlipInEasyY}
                exiting={FlipOutEasyY}
            >
                <LottieView
                    source={require('../Config/Loader.json')}
                    autoPlay
                    loop
                    style={styles.loader}
                />
            </Animated.View>
            {!status && message && <Text style={{ color: '#fff', fontWeight: 'bold', position: 'absolute', bottom: 0 }}>{message}</Text>}
            {status && <Text style={{ color: status.includes('error') ? 'red' : '#fff', fontWeight: 'bold', position: 'absolute', bottom: 0 }}>{status}</Text>}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: 'transparent', // Make container transparent so that gradient is visible
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', bottom: -50
    },
    loader: {
        height: 200,
        width: 200,
        borderRadius: 20,
    },
    txt: {
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default Loader;
