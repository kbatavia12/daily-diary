import React, { useState } from 'react'
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { globalStyles } from '../../static/styles';
import firebase from 'firebase';
import { isEmail } from 'validator';

const Signup = ({ navigation }) => {

    const [user, setUser] = useState({
        email: "",
        password: "",
        name: ""
    });

    const handleSignUp = () => {


        const { email, password } = user;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {

                var userf = firebase.auth().currentUser;
                //   userf.sendEmailVerification();

                userf.updateProfile({
                    displayName: user.name,
                });

                firebase.database().ref('users/' + userf.uid).set({
                    name: user.name,
                    email: user.email,
                
                }).then(() => {
                    firebase.database().ref(`users/${userf.uid}/notes`).push({
                        date: Date.now()
                    })
                })



            }).catch(error => {

                console.log(error);

            });

    }


    return (
        <ScrollView contentContainerStyle={styles.mainConatiner} >

            <KeyboardAvoidingView style={styles.signUpContainer} >
                <View style={styles.welcomeContainer} >
                    <Text style={styles.welcomeText} >Create your own</Text>
                    <Text style={styles.welcomeText} >Daily Diary </Text>

                </View>
                <View style={styles.fields} >
                    <Text style={styles.label} >Name</Text>
                    <TextInput onChangeText={name => setUser(user => { return { ...user, name } })} style={styles.input} placeholder="Please introduce yourself.." />

                    <Text style={styles.label} >Email</Text>
                    <TextInput onChangeText={email => setUser(user => { return { ...user, email } })} textContentType={"emailAddress"} style={styles.input} placeholder="Let's get your email.." />

                    <Text style={styles.label} >Password</Text>
                    <TextInput onChangeText={password => setUser(user => { return { ...user, password } })} secureTextEntry style={styles.input} placeholder="Shhhh! Secret.." />
                </View>


                <TouchableHighlight style={styles.buttonContainer} onPress={handleSignUp} >
                    <Text style={styles.signUpText} >Sign Up</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => navigation.navigate("Login")} style={{ alignSelf: 'center', marginTop: 10 }} ><Text style={{ color: globalStyles.textColor }} >Login Instead</Text></TouchableHighlight>

            </KeyboardAvoidingView>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    mainConatiner: {
        backgroundColor: globalStyles.background,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpContainer: {
        backgroundColor: globalStyles.cardBackground,
        width: "90%",
        padding: 15,
        paddingVertical: 25,
        elevation: 20,
        shadowColor: globalStyles.shadowColor,
        borderRadius: 15
    },
    welcomeContainer: {
        alignItems: 'center',
    },
    welcomeText: {
        color: globalStyles.textColor,
        fontSize: 22,
    },
    label: {
        color: globalStyles.textColor
    },
    input: {
        borderBottomColor: globalStyles.shadowColor,
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 0,
        marginTop: 5,
        marginBottom: 20
    },
    fields: {
        marginTop: 50
    },
    buttonContainer: {
        alignSelf: 'center',
        backgroundColor: globalStyles.shadowColor,
        padding: 10,
        borderRadius: 10,
    },
    signUpText: {
        fontWeight: "bold",
        fontSize: 18
    },
});

export default Signup;
