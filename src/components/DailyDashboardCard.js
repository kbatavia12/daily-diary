import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { globalStyles } from '../../static/styles';
import quotes from '../../static/Quotes.json';

const DailyDashboardCard = ({navigate, date}) => {

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);

        return quotes[randomIndex];
    }

    return (
        <TouchableHighlight onPress = {navigate} style={styles.cardContainer} >
            <View>
                <Text style={styles.cardHeading} >{new Date(date).toDateString().substr(4,)}</Text>
                <Text style={styles.subHeading} >Pen down your thoughts here..</Text>
                <View style = {styles.quoteTextContainer} >
                    <Text style = {styles.quoteText} >{getRandomQuote().text}</Text>
                    <Text style = {styles.authorText}>--{getRandomQuote().author != null ? getRandomQuote().author : "Unknown" }</Text>
                </View>
            </View>

        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: globalStyles.cardBackground,
        padding: 10,
        borderRadius: 15,
        elevation: 15,
        shadowColor: globalStyles.shadowColor,
        shadowRadius: 30,
        shadowOpacity: 0.1,
        borderColor: globalStyles.shadowColor,
        marginVertical: 10

    },
    cardHeading: {
        color: globalStyles.textColor,
        width: '100%',
        fontSize: 35
    },
    subHeading: {
        color: globalStyles.textColor,
        fontSize: 18
    },
    quoteTextContainer: {
        marginTop: 7
    },
    quoteText: {
        color: globalStyles.textColor,
        width: '100%'
    },
    authorText: {
        color: globalStyles.textColor,
        alignSelf: 'flex-end',
        marginTop: 2
    }
})


export default DailyDashboardCard;


