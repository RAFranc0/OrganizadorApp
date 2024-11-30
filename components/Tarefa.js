import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import cores from "./cores";
import DateTimePicker from '@react-native-community/datetimepicker';

const Tarefa = (props) => {

    return (
        <View style={!props.concluida ? styles.item : styles.itemConcluido}>
            <View style={styles.esquerdaItemTarefa}>
                <Text>{props.text}</Text>
            </View>

            <View>
                <Text style={styles.data}>{ }</Text>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: cores.branco,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemConcluido: {
        backgroundColor: cores.bgTarefaConcluida,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    esquerdaItemTarefa: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap', //quebra de linha automática
    },
    quadradoItemTarefa: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    text: {
        maxWidth: '75%',
    },

});

export default Tarefa;