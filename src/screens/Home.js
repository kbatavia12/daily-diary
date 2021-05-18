import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import DailyDashboardCard from '../components/DailyDashboardCard';
import Header from '../components/Header';
import firebase from 'firebase';

const Home = ({ navigation }) => {

    const [notes, setNotes] = useState([]);
    const [id, setId] = useState([]);

    useEffect(() => {
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/notes`).on('value', function (snap) {
            setNotes(Object.values(snap.val()));
            console.log(Object.values(snap.val()));
            setId(Object.keys(snap.val()));
            // console.log(Object.keys(snap.val()));

        })
    }, [])

    return (
        <SafeAreaView style={styles.homeContainer} >
            <Header title = "Daily Diary"/>
            <FlatList
                data={notes}
                renderItem={({ item, index }) => <DailyDashboardCard key={id[index]} date={item.date} navigate={() => navigation.navigate('Diary', { date: item.date, data: item.noteData, id: id[index] })} />}
                keyExtractor={({ item, index }) => id[index]}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        backgroundColor: '#111111',
        flex: 1
    },

});

export default Home;
