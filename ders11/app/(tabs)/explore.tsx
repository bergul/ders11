import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter, useSegments } from 'expo-router';

import app from '../../firebaseconfig';

import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, push, set } from 'firebase/database';



export default function TabTwoScreen() {
  const [mail, setMail] = useState('');
  const router = useRouter();
  const segment = useSegments()

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
  }, [segment]);

  const handleSignOut = async () => {
   const auth = getAuth(app.app);
    await signOut(auth);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userEmail');
    router.push('/');
  };

  function testekle(): void {
   const referans = ref(getDatabase(app.app), '/demolar');
   const newRef = push(referans);
   set(newRef, {
      ad: 'test',
      soyad: 'test2'
    });
  }

  return (
    <View>
      <Text>{mail}</Text>
      <Link href="../user/"  >git</Link>
      <Button title="Sign Out" onPress={handleSignOut} />
      <Button title="Go to Home" onPress={testekle} />
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
