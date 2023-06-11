import uuid from 'react-native-uuid';
import React, {Component} from 'react';
import {
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  ImageBackground,
} from 'react-native';

import Crud from './src/Database/crud_rn';

const estilo = StyleSheet.create({
  Textestilo: {
    color: 'red',
    fontSize: 23,
    fontWeight: 'bold',
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 50,
  },

  NotaPositiva: {
    color: 'green',
    fontSize: 30,
  },

  NotaNegativa: {
    color: 'red',
    fontSize: 30,
  },

  Estiloideal: {
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 40,
  },

  RowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  SizeText: {
    fontSize: 30,
  },

  ButtonStatusAproved: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 5,
    width: '90%',
    alignSelf: 'center',
  },

  TextStatusAproved: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },

  menuInternoAprovado: {
    backgroundColor: '#006400',
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },

  menuInternoNaoConcluido: {
    backgroundColor: '#FF6347',
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },

  ButtonExcluir: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 5,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },

  TextExcluir: {
    fontSize: 30,
    color: 'white',
  },
});

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      inputValue2: '',
      inputValue3: '',
      inputValue4: '',
      inputValue5: '',
      lista: [],
    };
  }
  

  handleExcluir = idPassadoPeloBotão => {
    const banco = new Crud();
    banco
      .Remover(idPassadoPeloBotão)
      .then(() => {
        const novaLista = this.state.lista.filter(
          tarefa => tarefa.id !== idPassadoPeloBotão,
        );
        this.setState({lista: novaLista});
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleInputChange = text => {
    this.setState({inputValue: text});
  };

  handleInputChange2 = text => {
    this.setState({inputValue2: text});
  };

  handleInputChange3 = text => {
    this.setState({inputValue3: text});
  };

  handleInputChange4 = text => {
    this.setState({inputValue4: text});
  };

  handleInputChange5 = text => {
    this.setState({inputValue5: text});
  };

  handleButtonPress = () => {
    const {
      inputValue,
      inputValue2,
      inputValue3,
      inputValue4,
      inputValue5,
    } = this.state;
  
    const status = parseFloat(inputValue4) > 6; 
  
    const newItem = {
      nome: inputValue,
      turno: inputValue2, 
      materia: inputValue3,
      nota: inputValue4,
      data: inputValue5,
      status: status,
      id: uuid.v4(),
    };
  
    const banco = new Crud();
    banco.Inserir(newItem);
  
    this.setState({
      lista: [...this.state.lista, newItem],
      inputValue: '',
      inputValue2: '',
      inputValue3: '',
      inputValue4: '',
      inputValue5: '',
    });
  };
  Listar = () => {
    const banco = new Crud();

    banco.Listar().then(listaCompleta => {
      this.setState({lista: listaCompleta});
      this.Listar();
    });
  };
  Atualizar = id => {
    const updatedList = this.state.lista.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: !item.status,
        };
      }
      return item;
    });
  
    this.setState({
      lista: updatedList,
    });
  
    const banco = new Crud();
    banco.Atualizar(id, { status: !updatedList.status });
  };

  Remover = () => {
    this.setState(prevState => ({
      lista: prevState.lista.pop(),
    }));
  };

  Inserir = (nome, turno, materia, nota, data, status) => {
    const bancosos = new handleButtonPress(
      nome,
      turno,
      materia,
      nota,
      data,
      status,
    );
    const banco = new Crud();
    banco.Inserir(bancosos);
    this.Inserir();
  };

  UpdateStatus = id => {
    const updatedList = this.state.lista.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: !item.status,
        };
      }
      return item;
    });
  
    this.setState({
      lista: updatedList,
    });
  }; 

  handleExcluir = idPassadoPeloBotão => {
    const banco = new Crud();
    banco
      .Remover(idPassadoPeloBotão)
      .then(() => {
        const novaLista = this.state.lista.filter(
          tarefa => tarefa.id !== idPassadoPeloBotão,
        );
        this.setState({lista: novaLista});
      })
      .catch(error => {
        console.log(error);
      });
  };

  

  render() {
    return (
      <ScrollView>
        <View>
          <Text style={estilo.Estiloideal}>COLEGIO IDEAL</Text>
        </View>

        <TouchableOpacity>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
            }}
            onChangeText={this.handleInputChange}
            placeholder="Digite o seu nome"
            value={this.state.inputValue}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
            }}
            onChangeText={this.handleInputChange2}
            placeholder="Digite o turno"
            value={this.state.inputValue2}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
            }}
            onChangeText={this.handleInputChange3}
            placeholder="Digite a matéria"
            value={this.state.inputValue3}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
            }}
            onChangeText={this.handleInputChange4}
            placeholder="Digite a sua nota"
            keyboardType="numeric"
            value={this.state.inputValue4}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
            }}
            onChangeText={this.handleInputChange5}
            placeholder="Digite a data"
            value={this.state.inputValue5}
          />
          <Button title="Enviar" onPress={this.handleButtonPress} />
        </TouchableOpacity>

        <View style={estilo.menu}>
          {this.state.lista.map(item => {
            return (
              <View
                style={
                  item.status
                    ? estilo.menuInternoAprovado
                    : estilo.menuInternoNaoConcluido
                }
                key={item.id}>
                <View style={estilo.RowContainer}>
                  <Text style={[estilo.Textestilo, {color: 'red'}]}>
                    NOME DO ALUNO:
                  </Text>
                  <Text style={estilo.SizeText}>{item.nome}</Text>
                </View>

                <View style={estilo.RowContainer}>
                  <Text style={[estilo.Textestilo, {color: 'black'}]}>
                    TURNO:
                  </Text>
                  <Text style={estilo.SizeText}>{item.turno}</Text>
                </View>
                <View style={estilo.RowContainer}>
                  <Text style={[estilo.Textestilo, {color: 'black'}]}>
                    MATERIA:
                  </Text>
                  <Text style={estilo.SizeText}>{item.materia}</Text>
                </View>
                <View style={estilo.RowContainer}>
                  <Text style={[estilo.Textestilo, {color: 'black'}]}>
                    NOTA:
                  </Text>
                  <Text
                    style={
                      item.nota > 6 ? estilo.NotaPositiva : estilo.NotaNegativa
                    }>
                    {item.nota}
                  </Text>
                </View>
                <View style={estilo.RowContainer}>
                  <Text style={[estilo.Textestilo, {color: 'black'}]}>
                    DATA:
                  </Text>
                  <Text style={estilo.SizeText}>{item.data}</Text>
                </View>

                <View style={estilo.RowContainer}>
                  <Text style={[estilo.Textestilo, {color: 'black'}]}>
                    STATUS:
                  </Text>
                  <Text style={estilo.SizeText}>
                    {item.nota > 6 ? 'aprovado' : 'reprovado'}
                  </Text>
                </View>

                <TouchableOpacity
                  style={estilo.ButtonStatusAproved}
                  onPress={() => this.Atualizar(item.id)}>
                  <Text style={estilo.TextStatusAproved}>
                    {item.status ? 'COLOCAR COMO PENDENTE' : 'CONCLUIR TAREFA'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={estilo.ButtonExcluir}
                  onPress={() => this.handleExcluir(item.id)}>
                  <Text style={estilo.TextExcluir}>EXCLUIR</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
