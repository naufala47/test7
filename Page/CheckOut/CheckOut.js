import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

let camera = null
let hours = new Date().getHours(); //To get the Current Hours
var date = new Date().getDate(); //To get the Current Date

const CheckOut = ({ route, navigation }) => {
    const { dataID, dataGambar, urlGambar } = route.params;
    const [named, setNamed] = useState(dataID)
    // const [gambar, setGambar] = useState(urlGambar)
    const [gps, setGps] = useState("")
    const [jamPulang, setJamPulang] = useState("10")
    const [haris, setHaris] = useState("")


    // const saveImage = () => {
    //     // const nameFile = "" + new Date();
    //     const reference = storage().ref(dataGambar);

    //     const pathToFile = gambar;
    //     // // uploads file

    //     reference.putFile(pathToFile).then(() => {
    //         console.log("uploaded")
    //         storage()
    //             .ref(dataGambar)
    //             .getDownloadURL().then((downloadData) => {
    //                 console.log(downloadData)
    //                 updateData(downloadData, dataGambar)
    //             })
    //             .then(() => {
    //                 Alert.alert("Berhasil CheckOut", ` ${gps}`)
    //                 // this.props.navigation.navigate("Dashboard")
    //                 navigation.goBack();
    //             });

    //     });

    // }


    // const saveData = (downloadData, namaGambar) => {
    //     firestore()
    //         .collection('Checkin')
    //         .doc(dataID)

    //         .then(() => {
    //             console.log('User added!');
    //         });

    // }

    const updateData = () => {
        firestore()
            .collection('Checkin')
            .where(named)
            .set({
                // gambar: downloadData,
                // namaGambar: namaGambar,
                jamPulang: jamPulang
                // haris: haris
            })
            .then(() => {
                console.log('User updated!');
            });

    }

    useEffect(() => {
        console.log(named)
        Geolocation.getCurrentPosition(info => {
            setGps(info.coords.longitude + ";" + info.coords.latitude)
        }, setJamPulang(hours), setHaris(date));
    }, [])

    const takePicture = async () => {
        console.log("test")
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const data = await camera.takePictureAsync(options);
            console.log(JSON.stringify(data));
            setGambar(data.uri)
            console.log(data.uri);
        }
    };

    return (
        <ScrollView>
            <View>
                <RNCamera
                    ref={ref => {
                        camera = ref;
                    }}
                    style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', height: 400, width: 360 }}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        // console.log(barcodes);
                    }}
                />
            </View>
            <View>
                <Image
                    style={{
                        width: 100,
                        height: 100
                    }}
                // source={{ uri: gambar }}
                />
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => takePicture()}>
                    <Text style={{
                        color: '#0f0f0f',
                        fontSize: 18,
                        textAlign: 'justify',
                        lineHeight: 120,
                    }}>Ambil Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => updateData()}>
                    <Text style={{
                        color: '#0f0f0f',
                        fontSize: 18,
                        textAlign: 'justify',
                        lineHeight: 120,
                    }}>Simpan</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

}

export default CheckOut;