import React, { Component, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import firestore from '@react-native-firebase/firestore';
import styles from './style';

const Register = ({ navigation }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         name: "",
    //         email: "",
    //         password: "",
    //         repassword: ""
    //     }
    // }

    const registerUser = () => {
        console.log("test regist")
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((respose) => {
                console.log('user dibuat!');
                console.log("response" + respose)

                firestore()
                    .collection('users')
                    .doc(email)
                    .set({
                        name: name,
                        email: email
                    })
                    .then(() => {
                        Alert.alert("Anda Karyawan!")
                        navigation.navigate("Login", {
                            dataID: email
                        })
                        console.log('user ditambahkan!');
                    })
                    .catch((error) => {
                        Alert.alert("F!")
                        navigation.navigate("Login")
                    });
                navigation.goBack();
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('email sudah digunakan!')
                }
                if (error.code === 'auth/invalid-email') {
                    console.log('email tidak cocok!')
                }
                console.log(error);
            });

    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <TextInput
                    style={styles.input}
                    placeholder='nama'
                    onChangeText={(txtName) => setName(txtName)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='email'
                    onChangeText={(txtEmail) => setEmail(txtEmail)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='password'
                    secureTextEntry
                    onChangeText={(txtPassword) => setPassword(txtPassword)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='repassword'
                    secureTextEntry
                    onChangeText={(txtRepassword) => setRepassword(txtRepassword)}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => registerUser()}>
                    <Text style={styles.buttonTitle}>Register</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    );
}


export default Register;