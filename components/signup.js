import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import firebase from '../database/firebase';
import auth from '@react-native-firebase/auth';

export default class Signup extends Component {

    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            isLoading: false,
            id: '71',
            token: '184376'
        }
    }
    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    registerUser = () => {
        this.setState({ isLoading: true }),
            auth().createUserWithEmailAndPassword(this.sta, 'mintoo')
                // .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    // res.user.updateProfile({
                    //     displayName: this.state.displayName
                    // })

                    console.log(res, 'User registered successfully!')
                    this.setState({
                        isLoading: false,
                        displayName: '',
                        email: '',
                        password: ''
                    })
                    this.props.navigation.navigate('Login')
                })
                .catch(error => this.setState({ errorMessage: error.message }))

    }



    componentDidMount() {
        // return fetch('https://app.wpmlm.org/api/viewticke t/71/184376')
        //     .then(response => response.json())
        //     .then(responseJson => {
        //         console.log(responseJson)
        //         this.setState(
        //             {
        //                 isLoading: false,
        //                 dataSource: responseJson
        //             },
        //             function () {
        //                 this.arrayholder = responseJson;
        //             }
        //         );
        //     })
        //     .catch(error => {
        //         fetch('gs://fir-auth-92aa4.appspot.com')
        //         .then(response => response.json())
        //         .then(res =>{
        //             console.log(res,"Mint")
        //         })
        //         .catch(wrong=>{
        //             console.log(wrong,'....................')
        //         })
        //     });
        
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={(val) => this.updateInputVal(val, 'email')}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={(val) => this.updateInputVal(val, 'password')}
                    maxLength={15}
                    secureTextEntry={true}
                />
                <Button
                    color="#3740FE"
                    title="Signup"
                    onPress={() => this.registerUser()}
                />
                <TouchableOpacity>
                    <Text
                        style={styles.loginText}
                        onPress={() => this.props.navigation.navigate('Login')}>
                        Already Registered? Click here to login
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
    },
    loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});