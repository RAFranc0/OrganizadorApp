import { StyleSheet } from "react-native";
import Color from '../components/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Color.bgPalha,
    },
    tituloApp: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 20,
        textAlign: 'center',
    },
    inputDescricao: {
        height: 50,
        borderWidth: 1,
        borderColor: Color.cinzaBorda,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    inputData: {
        height: 50,
        borderWidth: 1,
        borderColor: Color.cinzaBorda,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    inputNivelPrioridade: {
        height: 50,
        borderWidth: 1,
        borderColor: Color.cinzaBorda,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    listaTarefas: {
        marginTop: 20,
    },
    containerTarefas: {
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    containerTarefaAberta: {
        backgroundColor: Color.branco,
    },
    containerTarefaAtrasada: {
        backgroundColor: Color.bgTarefaAtrasada,
    },
    containerTarefaConcluida: {
        backgroundColor: Color.bgTarefaConcluida,
    },
    descricaoTarefa: {
        fontSize: 16,
    },
    concluidoText: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    iconeTamanho: {
        marginHorizontal: 10,
        width: 35,
        height: 35,
    },
    addBtnBox: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    addTouchable: {
        borderWidth: 1,
        borderRadius: 100,
        borderColor: Color.cinzaBorda,
        backgroundColor: Color.branco,
        padding: 5,
    },
    iconeAdd: {
        width: 50,
        height: 50,
    },
});

export default styles;