import React, { useEffect, useRef, useState } from 'react'
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { globalStyles } from '../../static/styles';
import Header from '../components/Header';
import firebase from 'firebase';

const DiaryPost = ({ route, navigation }) => {

    const [height, setHeight] = useState(null);
    const [diaryNote, setDiaryNote] = useState({
        data: '',
        date: null,
        lastEdited: Date.now()
    });




    useEffect(() => {
        setDiaryNote(note => { return { ...note, date: route.params.date, data: route.params.data } });
    }, [])

    const onChange = text => {
        // setDiaryNote(text);
        setDiaryNote(note => {
            return {
                ...note,
                lastEdited: Date.now(),
                data: text
            }
        })
    }

    const saveToDB = () => {
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/notes/${route.params.id}`).update({
            noteData: diaryNote.data,
            date: Date.now(),
            // lastEdited: diaryNote.lastEdited
        })
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#222222' }} onLayout={(ev) => {
            var fullHeight = ev.nativeEvent.layout.height;
            setHeight(fullHeight);
        }}>
            <Header saveToDB={saveToDB} title={new Date(diaryNote.date).toDateString().substr(4,)} save />
            <Text style={{ color: globalStyles.textColor }} >{`Last Edited ${new Date(diaryNote.lastEdited).toLocaleTimeString()}`}</Text>
            <ScrollView style={{ backgroundColor: '#444444', width: '100%', borderRadius: 1 }} keyboardDismissMode='interactive'>
                <TextInput
                    onChangeText={onChange}
                    multiline={true}
                    autoFocus={true}
                    style={{ height: height, padding: 10 }}
                    textAlignVertical="top"
                    placeholder="What's on your mind today?"
                    value={diaryNote.data}

                />
            </ScrollView>
        </View>
    )
}




export default DiaryPost;
