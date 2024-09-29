import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://tharseo.zapto.org:443/authenticate/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login falhou');
      }

      const data = await response.json();
      const receivedToken = data.data.accessToken;
      setToken(receivedToken);
      setErrorMessage(`LOGIN EFETUADO COM SUCESSO! TOKEN: ${receivedToken}`); 
    } catch (error) {
      setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Login' }} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={login}
        onChangeText={setLogin}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button title="Fazer login" onPress={handleLogin} />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {token ? <Text>Token: {token}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    width: '100%',
    padding: 10,
  },
  errorText: {
    color: 'red',
  },
});
