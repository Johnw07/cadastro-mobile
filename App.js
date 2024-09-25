import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, Text, Modal, FlatList } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [turma, setTurma] = useState('');
  const [error, setError] = useState('');
  const [turmaModalVisible, setTurmaModalVisible] = useState(false);

  const turmas = ['Turma 1', 'Turma 2', 'Turma 3', 'Turma 4'];

  const cadastro = () => {
    if (!nome || !email || !senha || !confirmarSenha || !turma) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    setError(''); // Limpa erro anterior
    alert(`Nome: ${nome}\nEmail: ${email}\nTurma: ${turma}\nSenha: ${senha}`);
  };

  const handleNomeChange = (text) => {
    const onlyLetters = text.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
    setNome(onlyLetters);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Image style={styles.logo} source={require('./assets/logo.png')} />

      <TextInput
        placeholder="Seu nome..."
        style={styles.textInput}
        onChangeText={handleNomeChange}
        value={nome}
      />
      <TextInput
        placeholder="Seu email..."
        style={styles.textInput}
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Sua senha..."
        style={styles.textInput}
        onChangeText={text => setSenha(text)}
        value={senha}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Confirmar senha..."
        style={styles.textInput}
        onChangeText={text => setConfirmarSenha(text)}
        value={confirmarSenha}
      />

      {/* Botão de seleção de turma estilizado com azul suave */}
      <TouchableOpacity 
        style={styles.turmaInput} 
        onPress={() => setTurmaModalVisible(true)}
      >
        <Text style={styles.turmaText}>{turma || 'Selecione sua turma...'}</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.btnCadastro} onPress={cadastro} activeOpacity={0.8}>
        <Text style={styles.btnText}>CADASTRAR!</Text>
      </TouchableOpacity>

      <Modal
        visible={turmaModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione sua turma:</Text>
            <FlatList
              data={turmas}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setTurma(item);
                    setTurmaModalVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity 
              style={styles.modalCloseButton} 
              onPress={() => setTurmaModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 76,
    marginBottom: 20,
    marginTop: -40,
  },
  textInput: {
    width: '80%',
    height: 50,
    backgroundColor: '#f0f8ff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#00bff2',
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  turmaInput: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#004a80', 
    backgroundColor: '#004a80', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  turmaText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnCadastro: {
    width: '60%',
    height: 50,
    backgroundColor: '#00bff2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 2,
    borderColor: '#0099cc',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
  },
  modalCloseButton: {
    marginTop: 20,
  },
  modalCloseText: {
    color: 'blue',
    fontSize: 18,
  },
});
