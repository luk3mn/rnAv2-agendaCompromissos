import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ItemList({ data, handleDelete }) {
    return (
        <View style={{marginBottom: 20}}>
            <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={ () => handleDelete(data)}>
                        <Ionicons name='md-checkmark-circle' size={30} color={"#3d405b"} />
                    </TouchableOpacity>
                    <Text style={styles.item}> {data.key} </Text>
                </View>
            </View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.item}> {data.item} </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 3,
        flexDirection: 'column',
        backgroundColor: '#e07a5f',
        borderRadius: 5,
        padding: 5,
        elevation: 1.5,
        shadowColor: '#e07a5f',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 1,
            height: 3,
        }
    },
    item: {
        color: '#f4f1de',
        fontSize: 20,
        paddingLeft: 8,
        paddingRight: 20,
    }
});