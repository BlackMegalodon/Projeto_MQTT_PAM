import React, {useState, useEffect} from 'react';
import {env} from 'expo-env'
import { StyleSheet, Text, View } from 'react-native';
import MQTTService from './src/services/mqttService'
import StatusModal from './src/components/StatusModal'
import LightControl from './src/components/LightControl'
import Gauges from './src/components/Gauges';
import { parse } from 'react-native-svg';

const mqtt = new MQTTService();

export default function App() {
  const [isConnected, setisConnected] = useState(false);
  const [showError, setshowError] = useState(false);
  const [isLightOn, setisLightOn] = useState(false);
  const [temp, settemp] = useState(0);
  const [hum, sethum] = useState(0);

  const mqttConfig = {
    host: env.MQTT_host,
    port: parseInt(env.MQTT_port),
    path: env.MQTT_path,
    user: env.MQTT_user,
    pass: env.MQTT_pass,
    clientId: 'RN_App_' + Math.random()
  };

  useEffect(() => {
    startConnection();
  }, []);

  const startConnetion = () => {
    setshowError(false)
    mqtt.connect(
      mqttConfig,
      (topic, message) => {
        if (topic === 'casa/temp') settemp(parseFloat(message))
        if (topic === 'casa/umid') sethum(parseFloat(message))
        if (topic === 'casa/luz') setisLightOn(message === '1')
      },
    (err) => {
      setisConnected(false)
      setshowError(true)
    }
    )
  };

  const toggleLight = () => {
    const newState = isLightOn ? "0" : "1";
    mqtt.publish('casa/luz', newState);
  }
   
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Start Home IoT</Text>

    <LightControl isLightOn={isLightOn} onToggle={toggleLight}/>

    <Gauges temp={temp} hum={hum}/>

    <StatusModal visible={showError} onRetry={startConnection} onLater={() => setshowError(false)}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '121212',
    padding: 20,
    alignItems: 'center',
  },

  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20
  }
});
