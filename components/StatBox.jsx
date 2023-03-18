import React from 'react'
import { StyleSheet, View, Text } from 'react-native'


const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  return (

    <View style={styles.container}>
        <View style={styles.container1}>
            <View>
                {icon}
                <Text style={styles.text1}>
                    {title}
                </Text>
            </View>
        </View>
        <View style={styles.container2}>
            <Text style={styles.text2}>
                {subtitle}
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '70%',
        // height: '40%',
        marginHorizontal: 30,
        backgroundColor: '#1f2a40'
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text1:{
        fontWeight: 'bold',
        color:'#e0e0e0',
        fontSize: 45
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 2,
    },
    text2: {
        color: '#4cceac',
        fontSize: 25
    }
})

export default StatBox