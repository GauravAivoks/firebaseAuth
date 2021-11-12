import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

export default  class HomeScreen extends React.Component {
   render() {
       return (
           <View style={{ flex: 1, alignItems: "center" }}>
               <Text style= {{ fontSize: 30, color: "#000", marginBottom: 50, marginTop: 100 }}>Register Face ID</Text>
               <TouchableHighlight
               onPress={()=>{this.props.navigation.navigate('Registration')}}
               style={[styles.buttonContainer, styles.button]} onPress={() => this.props.navigation.navigate('Registration')}>
                   <Text style={styles.buttonText}>Registration</Text>
               </TouchableHighlight>
               <TouchableHighlight style={[styles.buttonContainer, styles.button]} onPress={() => this.props.navigation.navigate('Verification')}>
                   <Text style={styles.buttonText}>Verification</Text>
               </TouchableHighlight>
           </View>
       );
   }
}

const styles = StyleSheet.create({
   buttonContainer: {
       height:45,
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'center',
       marginBottom:20,
       width:"80%",
       borderRadius:30,
       marginTop: 20,
       marginLeft: 5,
   },
   button: {
       backgroundColor: "#337ab7",
       width: 350,
       marginTop: 5,
   },
   buttonText: {
       color: 'white',
       fontWeight: 'bold',
   },
})