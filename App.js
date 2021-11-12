// // App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Test from './components/test'
import firstApp from './components/redux/firstApp';
import PushController from './Pushnotification/PushController'
import PushNotification1 from './Pushnotification/pushNotification1'
import createPDF from './pdf/createPDF';
import MyWebComponent from './pdf/createPDF';
import LoginScreen from './FaceRecognition/LoginScreen';
import Registration from './FaceRecognition/Registration';
import HomeScreen from './FaceRecognition/HomeScreen';
import Picker from './FaceRecognition/test';
import Verification from './FaceRecognition/Verification';

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            title: 'Signup', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e',  //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Test"
          component={Test}
          options={{
            title: 'Test', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="firstApp"
          component={firstApp}
          options={{
            title: 'firstApp', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />

        <Stack.Screen
          name="PushController"
          component={PushController}
          options={{
            title: 'PushController', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />

        <Stack.Screen
          name="PushNotification1"
          component={PushNotification1}
          options={{
            title: 'PushNotification1', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="MyWebComponent"
          component={MyWebComponent}
        // options={{
        //   title: 'MyWebComponent', //Set Header Title
        // headerStyle: {
        //   backgroundColor: '#f4511e', //Set Header color
        // },
        // headerTintColor: '#fff', //Set Header text color
        // headerTitleStyle: {
        //   fontWeight: 'bold', //Set Header text style
        // },
        // }}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            //   title: 'MyWebComponent', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            // headerTintColor: '#fff', //Set Header text color
            // headerTitleStyle: {
            //   fontWeight: 'bold', //Set Header text style
            // },
          }}

        />


        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
          }}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
          }}
        />
        <Stack.Screen
          name="Picker"
          component={Picker}
          options={{
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
          }}
        />


        <Stack.Screen
          name="Verification"
          component={Verification}
          options={{
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
          }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


