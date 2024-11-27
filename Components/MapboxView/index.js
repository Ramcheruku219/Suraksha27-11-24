import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const testHtml = require('./MapLeflet.html');
const MapboxWebViewOld = (props) => {
    const { gps } = props;

    const injectedJavaScript = `
    (function() {
        document.addEventListener("DOMContentLoaded", function(event) {
            var gps = ${JSON.stringify(gps)};
            var event = new CustomEvent('gpsReady', { detail: gps });
            document.dispatchEvent(event);
        });
    })();
`;
    return (
        <View style={styles.container}>
            <WebView
                style={styles.map}
                originWhitelist={['*']}
                source={testHtml}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
                scrollEnabled={false}
                automaticallyAdjustContentInsets={false}
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
                injectedJavaScript={injectedJavaScript}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default MapboxWebViewOld;