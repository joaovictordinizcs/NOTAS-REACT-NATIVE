import React, { Component } from 'react';
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
  

  Estiloideal: {
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 40,
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
        turno: '', // Adicionado a propriedade 'turno' ao estado inicial
      };
    }
  
    // Rest of your code...
  

  handleInputChange = (text) => {
    this.setState({ inputValue: text });
  };

  handleInputChange2 = (text) => {
    this.setState({ inputValue2: text });
  };

  handleInputChange3 = (text) => {
    this.setState({ inputValue3: text });
  };

  handleInputChange4 = (text) => {
    this.setState({ inputValue4: text });
  };

  handleInputChange5 = (text) => {
    this.setState({ inputValue5: text });
  };

  handleButtonPress = () => {
    const {
      inputValue,
      inputValue2,
      inputValue3,
      inputValue4,
      inputValue5,
    } = this.state;
    const status = parseInt(inputValue4, 10) > 6; // Parse nota as an integer before comparing
    const newItem = {
      nome: inputValue,
      turno: inputValue2,
      materia: inputValue3,
      nota: parseFloat(inputValue4), // Parse nota as a float
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

  render() {
    return (
      <View>
        <View>
          <Text style={estilo.Estiloideal}>COLEGIO IDEAL</Text>
        </View>

        <TouchableOpacity>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={this.handleInputChange}
            placeholder="Digite o seu nome"
            value={this.state.inputValue}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={this.handleInputChange2}
            placeholder="Digite o turno"
            value={this.state.inputValue2}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={this.handleInputChange3}
            placeholder="Digite a matéria"
            value={this.state.inputValue3}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={this.handleInputChange4}
            placeholder="Digite a sua nota"
            value={this.state.inputValue4}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={this.handleInputChange5}
            placeholder="Digite a data"
            value={this.state.inputValue5}
          />
          <Button title="Enviar" onPress={this.handleButtonPress} />
        </TouchableOpacity>

        <View style={estilo.menu}>
          <View style={estilo.menuInterno}>
            <Text style={[estilo.Textestilo, { color: 'red' }]}>NOME DO ALUNO:</Text>
            <Text style={[estilo.Textestilo, { color: 'black' }]}>TURNO:</Text>
            <Text style={[estilo.Textestilo, { color: 'black' }]}>MATERIA:</Text>
            <Text style={[estilo.Textestilo, { color: 'black' }]}>NOTA:</Text>
            <Text style={[estilo.Textestilo, { color: 'black' }]}>DATA:</Text>
          </View>
        </View>
      </View>
    );
  }
}