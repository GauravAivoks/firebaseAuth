import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, BackHandler, Dimensions } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

class Picker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '242',
            data: [],
            refid: '',
            refname: [],
        };
    }
    async componentDidMount() {
        return fetch(
            'https://blsnrkuz8a.execute-api.ap-south-1.amazonaws.com/test/data',
        )
            .then(res => res.json())
            .then(resJson => {
                console.log(resJson, '.....data....');
                if (resJson.statusCode === 200) {

                    console.log("jjjjjj")
                    return(
                        alert("have a good day")
                 
                    )
                }
            })
            .catch(e => console.log(e));
    }

    Userdata = () => {
        fetch('https://app.gdefi.global/wpmlm/api/appgetuserlist/' + this.state.id)
            .then(res => res.json())
            .then(resJson => {
                // console.log(resJson, '.........mintoo');
                this.setState({
                    createddate: resJson.data.created_at,
                    refid: resJson.data.ref_id
                });
                if (resJson.data.ref_id) {
                    return fetch(
                        'https://app.gdefi.global/wpmlm/api/appgetuserlist/' + resJson.data.ref_id,
                    )
                        .then(res => res.json())
                        .then(resJson => {
                            console.log(resJson.statusCode, '.....data....');

                        })
                        .catch(e => console.log(e));
                }
            })
            .catch(e => console.log(e));
    };
   

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButtonClick,
        );
    }

    render() {
        // console.log(this.state.refid, 'ref id');
        // console.log(this.state.id, 'local id');
        // console.log(this.state.refname, 'ref data id');
        return (
            // <-------------------------------------main container-------------------------------------------->
            <SafeAreaView
                style={{ flex: 1, backgroundColor: '#e3e1e1' }}></SafeAreaView>
            //   <-----------------------------Main container close-------------------------->
        );
    }
}

export default Picker;
export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
    },
});