import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

class HelloWorldApp extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
            }}>
                <WebView source={{ uri: 'https://reactnative.dev/' }} />
            </View>
        );
    }
}

export default HelloWorldApp;