import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import auth from '../../firebaseconfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
          AsyncStorage.setItem('userToken', userCredential.user.uid);
          Alert.alert('Kayıt Başarılı', 'Kayıt yapıldı');
          router.push('/explore');
        
      })
      .catch((error) => {
        Alert.alert('Kayıt Hatası', error.message);
      });
  };

  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
    
          AsyncStorage.setItem('userToken', userCredential.user.uid);
          Alert.alert('Giriş Başarılı', 'Giriş yapıldı');
          router.push('/explore');
        
      })
      .catch((error) => {
        Alert.alert('Giriş Hatası', error.message);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Welcome to Crypto</Text>
        <TextInput
          placeholder='Email Adres'
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder='Şifre'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Kayıt Ol" onPress={handleSignUp} />
        <Button title="Giriş Yap" onPress={handleSignIn} />
        <View><Link href='/explore'>Keşfet!</Link></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
