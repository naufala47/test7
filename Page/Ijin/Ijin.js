import React, { Component, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import DatePicker from 'react-native-datepicker';
import DocumentPicker from 'react-native-document-picker';
import firestore from '@react-native-firebase/firestore';
import styles from './style';

const lstKategori = [
    { label: 'Izin Sakit', value: 'Sakit' },
    { label: 'Izin Anak Sakit', value: 'anakSakit' }
]
const Ijin = ({ navigation, route }) => {
    const { dataID } = route.params;
    const [name, setName] = useState(dataID)
    const [kategori, setKategori] = useState(0)
    const [tanggalA, setTanggalA] = useState("2021-01-01")
    const [tanggalB, setTanggalB] = useState("2021-01-01")
    const [perihal, setPerihal] = useState("")
    const [keterangan, setKeterangan] = useState("")
    const [singleFile, setSingleFile] = useState('');
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         kategori: 'Sakit',
    //         dateA: "2021-01-01",
    //         dateB: "2021-01-01"
    //     }
    // }

    const saveData = () => {
        firestore()
            .collection('Ijin')
            .add({
                email: name,
                kategori: lstKategori[lstKategori.row],
                tanggalA: tanggalA,
                tanggalB: tanggalB,
                singleFile: singleFile,
                perihal: perihal,
                keterangan: keterangan
            })
            .then(() => {
                Alert.alert("Berhasil Ijin")
                console.log('Data added!');
            });

    }


    // onDateChange(date) {
    //     this.setState({
    //         tanggaAwal: date,
    //     });
    // }
    const ambilFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res.uri);
            console.log('Type : ' + res.type);
            console.log('File Name : ' + res.name);
            console.log('File Size : ' + res.size);
            setSingleFile(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <View>
                    <Text style={{ marginLeft: 25, marginBottom: 5, marginTop: 5 }}>Kategori</Text>
                </View>
                <DropDownPicker
                    items={lstKategori}
                    containerStyle={{ height: 40, width: 300, marginLeft: 30 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={lstKategori => setKategori(lstKategori.kategori)}
                />
                <View>
                    <Text style={{ marginLeft: 25, marginBottom: 5, marginTop: 5 }}>Dari Tanggal</Text>
                </View>
                <DatePicker
                    style={{
                        width: 300,
                        marginLeft: 25
                    }}
                    date={tanggalA}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2021-01-01"
                    maxDate="2021-02-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={txtTanggalA => setTanggalA(txtTanggalA)}
                />
                <View>
                    <Text style={{ marginLeft: 25, marginBottom: 5, marginTop: 5 }}>Sampai Tanggal</Text>
                </View>
                <DatePicker
                    style={{
                        width: 300,
                        marginLeft: 25
                    }}
                    date={tanggalB}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2021-01-01"
                    maxDate="2021-02-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={txtTanggalB => setTanggalB(txtTanggalB)}
                />
                <View>
                    <Text style={{ marginLeft: 25, marginBottom: 5, marginTop: 5 }}>Perihal</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='Perihal'
                    value={perihal}
                    onChangeText={txtPerihal => setPerihal(txtPerihal)}
                />
                <View>
                    <Text style={{ marginLeft: 25, marginBottom: 5, marginTop: 5 }}>Keterangan</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='Keterangan'
                    value={keterangan}
                    onChangeText={txtKeterangan => setKeterangan(txtKeterangan)}
                />
                <TouchableOpacity
                    style={styles.buttonFoto}
                    onPress={ambilFile}>
                    <Text
                        style={styles.buttonTitle}>
                        Lampiran
                    </Text>
                </TouchableOpacity>
                <Text style={{ marginLeft: 25, marginBottom: 5, marginTop: 5 }} >
                    File Name: {singleFile.name ? singleFile.name : ''}
                    {'\n'}
                     Type: {singleFile.type ? singleFile.type : ''}
                    {'\n'}
                     File Size: {singleFile.size ? singleFile.size : ''}
                    {'\n'}
                     URI: {singleFile.uri ? singleFile.uri : ''}
                    {'\n'}
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => saveData()}>
                    <Text style={styles.buttonTitle}>Kirim</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    );

}

export default Ijin;