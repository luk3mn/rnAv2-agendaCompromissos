// Importação das bibliotecas
import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons";

// Importação dos componentes
import ItemList from "./src/components/ItemList";

// Importação do async Storage
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function App() {

  const [item, setItem] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [commitment, setCommitment] = useState('');

  // Armazenamento de dados
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@data', JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  // Leitura de dados
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@data');
      if (value) {
        setItem(JSON.parse(value));
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    storeData(item);
  }, [item]);

  function handleAdd() {
    if (!date || !commitment) {
      alert('Os campos não podem ficar em branco');
      return; // se o campo estiver vazio, ele retorna e não faz nada
    }

    const data = {
      key: date,
      item: commitment
    };
    
    // "...task" vai sempre add "data" ao final do vetor
    setItem([...item, data]);
    setOpen(false); // Fecha o campo de modal
    setDate(''); // Limpa o campo de data
    setCommitment(''); // Limpa o campo de compromissos
  }

  const handleDelete = useCallback((data) => {
    const find = item.filter(r => r.key !== data.key)
    setItem(find);
  })
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#121d31" barStyle="light-content" />

      <View style={styles.content}>
        <Text style={styles.title}> Compromissos do Lucas Renan </Text>
      </View>

      {/* Construção da lista */}
      <FlatList 
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={item}
        keyExtractor={ (item) => String(item.key) }
        renderItem={ ({ item }) => <ItemList data={item} handleDelete={handleDelete} /> }
      />

      {/* Tela modal */}
      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>
            
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={ () => setOpen(false) }>
                <Ionicons style={{marginLeft: 5, marginRight: 5}} name="md-arrow-back" size={40} color={"#f4f1de"} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Novo compromisso</Text>
            </View>

            {/* Incluir nova tarefa - área de texto e botão */}
            <View style={styles.modalBody} animation={"fadeInUp"} useNativeDriver>
              <TextInput 
                placeholderTextColor={"#747474"}
                autoCorrect={false}
                placeholder="Entre com a data"
                style={styles.input}
                value={date}
                onChangeText={ (texto) => setDate(texto) }
              />
              <TextInput 
                multiline={true}
                placeholderTextColor={"#747474"}
                autoCorrect={false}
                placeholder="Entre com o compromisso"
                style={styles.input}
                value={commitment}
                onChangeText={ (texto) => setCommitment(texto) }
              />  
              <TouchableOpacity onPress={handleAdd} style={styles.handleAdd}>
                <Text style={styles.handleAddText}>Cadastrar</Text>
              </TouchableOpacity>
            </View>

          </SafeAreaView>
      </Modal>

      {/* Botão para add nova tarefa */}
      <TouchableOpacity style={styles.fab} onPress={ () => setOpen(true) }>
        <Ionicons name="ios-add" size={35} color={"#f4f1de"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f1de"
  },
  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: "center",
    color: "#3d405b"
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: "#3d405b",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    }
  },
  modal: {
    flex: 1,
    backgroundColor: '#3d405b',
  },
  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    marginLeft: 15,
    fontSize: 23,
    color: '#f4f1de',
  },
  modalBody: {
    marginTop: 15,
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 10,
    backgroundColor: "#FFF",
    padding: 9,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5,
  },
  handleAdd: {
    backgroundColor: '#e07a5f',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5
  },
  handleAddText: {
    color: '#f4f1de',
    fontWeight: '600',
    fontSize: 16
  }
})