import React, { useState } from 'react'
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { globalStyles } from '../../static/styles';
import firebase from 'firebase';

const Login = ({ navigation }) => {


    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleLogin = () => {

        const { email, password } = user;
        firebase.auth().signInWithEmailAndPassword(email, password);
    }


    return (
        <ScrollView contentContainerStyle={styles.mainConatiner} >

            <KeyboardAvoidingView style={styles.signUpContainer} >
                <View style={styles.welcomeContainer} >
                    <Text style={styles.welcomeText} >Welcome back to your</Text>
                    <Text style={styles.welcomeText} >Daily Diary </Text>

                </View>
                <View style={styles.fields} >
                    <Text style={styles.label} >Email</Text>
                    <TextInput onChangeText={email => setUser(user => { return { ...user, email } })} textContentType={"emailAddress"} style={styles.input} placeholder="Enter your registered email.." />

                    <Text style={styles.label} >Password</Text>
                    <TextInput onChangeText={password => setUser(user => { return { ...user, password } })} secureTextEntry style={styles.input} placeholder="Shhhh! Secret.." />
                </View>


                <TouchableHighlight style={styles.buttonContainer} onPress={handleLogin} >
                    <Text style={styles.signUpText} >Login</Text>
                </TouchableHighlight>


                <TouchableHighlight onPress={() => navigation.navigate("Signup")} style={{ alignSelf: 'center', marginTop: 10 }} ><Text style={{ color: globalStyles.textColor }} >Signup Instead</Text></TouchableHighlight>
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

export default Login;
