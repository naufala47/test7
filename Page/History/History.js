import React, { Component, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const History = () => {
    const [users, setUser] = useState([]);

    const renderItem = ({ item, index }) => {
        console.log(item)
        return (
            <View>
                <Text>{item.jam}</Text>
            </View>
        )
    }

    useEffect(() => {
        const dataa = firestore()
            .collection('Checkin')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);
                const users = [];
                querySnapshot.forEach(documentSnapshot => {
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    // setUser(users);
                });
                setUser(users);
            });
        return () => dataa();
    }, [])

    return (
        <FlatList
            data={users}
            renderItem={renderItem}
        />


    );

}

export default History;