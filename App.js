import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './src/Estilo';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [dataLimite, setDataLimite] = useState('');
  const [nivelPrioridade, setNivelPrioridade] = useState('');

  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);


  const CHAVE_ARMAZENAMENTO_TAREFAS = '@tarefas';

  useEffect(() => {
    const carregarTarefas = async () => {
      try {
        const tarefasArmazenadas = await AsyncStorage.getItem(CHAVE_ARMAZENAMENTO_TAREFAS);
        if (tarefasArmazenadas) {
          setTarefas(JSON.parse(tarefasArmazenadas));
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as tarefas salvas.');
      }
    };

    carregarTarefas();
  }, []);

  const salvarTarefas = async (tarefasParaSalvar) => {
    try {
      await AsyncStorage.setItem(CHAVE_ARMAZENAMENTO_TAREFAS, JSON.stringify(tarefasParaSalvar));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as tarefas criadas.');
    }
  }

  const adicionarTarefa = () => {
    //verificação de preenchimento dos campos
    if (!descricao || !dataLimite || !nivelPrioridade) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    //cria a nova tarefa adicionando o id (timestamp) e o estado de conclusao
    const novaTarefa = {
      id: Date.now(),
      descricao,
      dataLimite,
      nivelPrioridade,
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]); //insere a tarefa criada na lista

    //reseta os atributos da tarefa
    setDescricao('');
    setDataLimite('');
    setNivelPrioridade('');
  };

  const deletarTarefa = (id) => {
    let copiaDaLista = [...tarefas]; //essa linha copia a lista de tarefas
    copiaDaLista = copiaDaLista.filter(item => item.id !== id); // Remove a tarefa com o ID específico
    setTarefas(copiaDaLista); // Atualiza a lista de tarefas
  }

  const concluirTarefa = (id) => {
    let copiaDaLista = [...tarefas];
    const tarefaIndex = copiaDaLista.findIndex(item => item.id === id);

    if (tarefaIndex !== -1) {
      copiaDaLista[tarefaIndex].concluida = !copiaDaLista[tarefaIndex].concluida;
      setTarefas(copiaDaLista);
    }
  }

  // Renderizar cada tarefa
  const listarTarefas = ({ item }) => {

    const tarefaAtrasada = verificarAtraso(item.dataLimite);

    return (
      <View style={[
        tarefaAtrasada && !item.concluida ? styles.containerTarefaAtrasada : (!item.concluida ? styles.containerTarefaAberta : styles.containerTarefaConcluida),
        styles.containerTarefas
      ]}>
        <Text style={[styles.descricaoTarefa, item.concluido && styles.concluidoText]}>
          {item.descricao} - {item.dataLimite} - Prioridade: {item.nivelPrioridade}
        </Text>
        <View style={styles.btnContainer}>

          <TouchableOpacity onPress={() => concluirTarefa(item.id)}>
            <Image style={styles.iconeTamanho} source={require('./assets/icons/finish-ico.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deletarTarefa(item.id)}>
            <Image style={styles.iconeTamanho} source={require('./assets/icons/delete-ico.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const calendario = (event, dataEscolhida) => {
    setMostrarDatePicker(false);
    if (dataEscolhida) {
      setDataLimite(
        dataEscolhida.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
      );
    }
  };

  const verificarAtraso = (dataLimite) => {
    const dataAtual = new Date();
    const dataSeparada = dataLimite.split('/');
    const dataTarefa = new Date(`${dataSeparada[2]}-${dataSeparada[1]}-${dataSeparada[0]}T23:59:59`);

    return dataTarefa < dataAtual;
  }


  return (
    <View style={styles.container}>
      <Text style={styles.tituloApp}>OrganizadorApp</Text>

      {/* Formulário */}
      <TextInput
        style={styles.inputDescricao}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity style={styles.inputData} onPress={() => setMostrarDatePicker(true)}>
        <Text>{dataLimite || 'Data de Término (dd/mm/aaaa)'}</Text>
      </TouchableOpacity>
      {mostrarDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={calendario}
        />
      )}

      <View style={styles.inputNivelPrioridade}>
        <Picker selectedValue={nivelPrioridade} onValueChange={(itemValue) => setNivelPrioridade(itemValue)}>
          <Picker.Item label="Selecione a Prioridade" value="" />
          <Picker.Item label="Alta" value="Alta" />
          <Picker.Item label="Média" value="Média" />
          <Picker.Item label="Baixa" value="Baixa" />
        </Picker>
      </View>

      <View style={styles.addBtnBox}>
        <TouchableOpacity style={styles.addTouchable} onPress={adicionarTarefa}>
          <Image style={styles.iconeAdd} source={require('./assets/icons/add-ico.png')} />
        </TouchableOpacity>
      </View>

      {/* Lista de Tarefas */}
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={listarTarefas}
        style={styles.listaTarefas}
      />
    </View>
  );
};

