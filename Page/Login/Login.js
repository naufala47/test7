import React, { Component, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

const Login = ({ navigation }) => {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         email: "",
    //         password: ""
    //     }
    // }
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginUser = () => {
        console.log('test login')
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log('user sign in');
                console.log("response" + response)
                console.log(response.user.email)
                navigation.navigate("Dashboard", {
                    dataID: email
                })
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('email sudah terpakai!')
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('email tidak cocok!')
                }
                console.log(error);
            });

    }

    const goToRegistration = () => {
        navigation.navigate('Register')
    }

    return (
        <View>
            <KeyboardAwareScrollView>
                <TextInput
                    placeholder='email'
                    onChangeText={txtEmail => setEmail(txtEmail)}
                />
                <TextInput
                    placeholder='password'
                    secureTextEntry
                    onChangeText={txtPassword => setPassword(txtPassword)}
                />
                <TouchableOpacity onPress={() => loginUser()}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <View>
                    <Text>Anda Karyawan?<Text style={{ color: '#00a7f5' }} onPress={() => goToRegistration()}>Daftar</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );

}

export default Login;