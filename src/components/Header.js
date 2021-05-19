import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../static/styles';


const Header = ({ title, save, saveToDB, addNewNote }) => {
    return (
        <View style={styles.headerContainer} >
            <Text style={styles.headerText}>{title}</Text>
            {save ? <TouchableOpacity activeOpacity={0.8} onPress={saveToDB} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity> : <TouchableOpacity activeOpacity={0.8} onPress={addNewNote} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Add new</Text>
            </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        color: globalStyles.textColor,
        fontSize: 35,
        maxWidth: '60%',
        minWidth: '40%'
    },
    saveButton: {
        backgroundColor: globalStyles.textColor,
        paddingHorizontal: 10,
        paddingVertical: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
        // height: '35%',
        // alignSelf: 'center'
    },
    saveButtonText: {
        fontSize: 18
    }

})

export default Header;
