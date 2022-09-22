import { Background } from './src/components/Background';
import { StatusBar } from 'react-native';
import { useRef, useEffect } from 'react';
import * as Notifications from 'expo-notifications';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';
import './src/services/notificationConfigs';
import './src/services/getPushNotificationToken';

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';

export default function App() {
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  });

  useEffect(() => {
    getNotificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseNotificationListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    // return () => {
    //   if (getNotificationListener.current && responseNotificationListener) {
    //     Notifications.removeNotificationSubscription(
    //       getNotificationListener.current
    //     );
    //     Notifications.removeNotificationSubscription(
    //       responseNotificationListener.current
    //     );
    //   }
    // };
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
