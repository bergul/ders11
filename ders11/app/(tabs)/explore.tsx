import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter, useSegments } from 'expo-router';

import app from '../../firebaseconfig';

import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, push, set, get } from 'firebase/database';
import { TextInput } from 'react-native-gesture-handler';



export default function TabTwoScreen() {
  const [mail, setMail] = useState('');
  const router = useRouter();
  const segment = useSegments()
 const[ad, setAd] = useState('');
 const[soyad, setSoyad] = useState('');
 const [isimler, setIsimler] = useState('');  
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        router.push('/');
      } else {
        const email = await AsyncStorage.getItem('userEmail');
        if (email) {
          setMail(email);
        }
      }
    };

    checkAuth();
    isimleriGetir();
  }, [segment]);

  const handleSignOut = async () => {
   const auth = getAuth(app.app);
    await signOut(auth);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userEmail');
    router.push('/');
  };
  const isimleriGetir = async () => {
    const database= getDatabase(app.app); 
    const referans = ref(database, '/demolar');
    const snapshot = await get(referans);
    if (snapshot.exists()) {
      snapshot.forEach((item)=>{
        const key = item.key;
        setIsimler(key);


      });
    } else {
      console.log('No data available');
    }
  };
  function testekle(): void {
   const referans = ref(getDatabase(app.app), '/demolar');
   const newRef = push(referans);
   set(newRef, {
      "ad":ad
       ,"soyad":soyad}
    );
  }

  return (
    <View>
      <Text>{mail}</Text>
      <Link href="../user/"  >git</Link>
      <Button title="Sign Out" onPress={handleSignOut} />
      <Button title="Go to Home" onPress={testekle} />
      <TextInput value={ad} placeholder="Ad" onChangeText={setAd} />
      <TextInput value={soyad} placeholder="Soyad" onChangeText={setSoyad} />
      <Button title="Ekle" onPress={testekle} />
      {isimler}
    </View>
  );
}



const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
