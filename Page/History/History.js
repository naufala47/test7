import React, { Component, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import styles from './style';
import { DataTable } from 'react-native-paper';

const History = ({ navigation, route }) => {
    const { dataID } = route.params;
    const [name, setName] = useState(dataID)
    const [jamMasuk, setUser] = useState([]);

    useEffect(() => {
        const dataa = firestore()
            .collection('Checkin')
            .where('email', '==', name)
            .onSnapshot(querySnapshot => {
                // console.log('Total users: ', querySnapshot.size);
                const jamMasuk = [];
                querySnapshot.forEach(documentSnapshot => {
                    jamMasuk.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });

                });
                setUser(jamMasuk);
            });
        return () => dataa();
    }, [])

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <View style={{ backgroundColor: 'powderblue', flexDirection: 'row' }}>
                    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }}>{item.hari}</Text></View>
                    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }}>{item.jamMasuk}</Text></View>
                    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }}>{item.jamMasuk}</Text></View>
                    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }}>-</Text></View>
                </View>

            </View>

        )
    }


    return (
        <View >
            <View style={{ backgroundColor: 'powderblue', flexDirection: 'row' }}>
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 1 }}><Text style={{ fontSize: 20 }}>Tgl</Text></View>
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }}>CheckIn</Text></View>
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }}>CheckOut</Text></View>
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }}>lembur</Text></View>
            </View>
            <View style={{ paddingTop: 30 }}>
                <FlatList
                    data={jamMasuk}
                    renderItem={renderItem}
                />
            </View>
        </View >
    );

}

export default History;