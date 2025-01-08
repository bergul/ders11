import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import app from '../../firebaseconfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


const validatePassword = (password: string, email: string): string[] => {
  const errors: string[] = [];
  const forbiddenNumbers = ["1903", "1905", "1907", "53", "61"];
  const emailParts = email.split('@')[0].match(/.{4,}/g) || [];

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number.");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character.");
  }
  forbiddenNumbers.forEach(num => {
    if (password.includes(num)) {
      errors.push(`Password cannot contain the number ${num}.`);
    }
  });
  emailParts.forEach(part => {
    if (password.includes(part)) {
      errors.push(`Password cannot contain part of the email: ${part}.`);
    }
  });

  return errors;
};


export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[error, setError] = useState('');  
  const router = useRouter();
///www.notpaylas.com.tr/firebaseodev
  const handleSignUp =  () => {
    const errors = validatePassword(password, email);
    if (errors.length > 0) {
      setError(errors.join('\n'));
      return;
    }

    const auth = getAuth(app.app);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
          AsyncStorage.setItem('userToken', userCredential.user.uid);
          if (userCredential.user.email) {
            AsyncStorage.setItem('userEmail', userCredential.user.email);
          }
          Alert.alert('Kayıt Başarılı', 'Kayıt yapıldı');
          router.push('/explore');
        
      })
      .catch((error) => {
      setError(error.message);  
      });
  };

  const handleSignIn =  () => {
    const auth = getAuth(app.app);
   
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
    
          AsyncStorage.setItem('userToken', userCredential.user.uid);
          if (userCredential.user.email) {
            AsyncStorage.setItem('userEmail', userCredential.user.email);
          }
          Alert.alert('Giriş Başarılı', 'Giriş yapıldı');
          router.push('/explore');
        
      })
      .catch((error) => {
      setError(error.message);  
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Welcome to Crypto</Text>
        <Text>{error}</Text>
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
