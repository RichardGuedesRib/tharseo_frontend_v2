import { Stack } from 'expo-router';
import { useState } from 'react';
import { Button, YStack, Input, Text } from 'tamagui';
import { ScreenContent } from '~/components/ScreenContent';



export default function Home() {
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
      setToken(data.data.accessToken); 
      setErrorMessage('LOGIN EFETUADO COM SUCESSO! TOKEN: ' + token);
    } catch (error) {
      setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
      console.error(error);
    }
  };
 
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <YStack f={1} p={24} jc="center" ai="center" space>
        <ScreenContent path="app/(tabs)/index.tsx" title="Tab One" />

        <Input
          placeholder="Username"
          value={login}
          onChangeText={setLogin}
          width={200}
        />
        
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          width={200}
        />
        
        <Button onPress={handleLogin}>
          Fazer login
        </Button>

        {errorMessage ? <Text color="red">{errorMessage}</Text> : null}

        {token ? <Text>Token: {token}</Text> : null}
      </YStack>
    </>
  );
}
