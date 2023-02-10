import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  const [number, setNumber] = React.useState(0);
  const [number2, setNumber2] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [history, setHistory] = React.useState([]);

  const buttonPressed = () => {
    setTotal(Number(number)+Number(number2));
    const title = (number + " + " + number2 + " = " + (Number(number)+Number(number2)))
    const temp = {id: title, title}
    setHistory([...history, temp])
  }
  const buttonPressed2 = () => {
    setTotal(Number(number)-Number(number2));
    const title = (number + " - " + number2 + " = " + (Number(number)-Number(number2)))
    const temp = {id: title, title}
    setHistory([...history, temp])
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {({ navigation }) => (
              <View style={styles.container}>
              <Text>Result: {total}</Text>
              
              <TextInput
                style={styles.input}
                onChangeText={setNumber}
                value={number}
                placeholder="number1"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                onChangeText={setNumber2}
                value={number2}
                placeholder="number2"
                keyboardType="numeric"
              />
              <View style={styles.buttoncontainer}>
                <View style={styles.button}>
                  <Button onPress={buttonPressed} title="+"/>
                </View>
                <View style={styles.button}>
                  <Button onPress={buttonPressed2} title="-" />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('History')}>
                  <Text> Show history </Text>
                </TouchableOpacity>
              <StatusBar style="auto" />
              </View>
              
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name="History">
          {() => (
            <View style={styles.container}>
              <Text>History</Text>
              <FlatList 
                data={history}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <Text>{item.title}</Text>
                )}
                />
            </View>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttoncontainer: {
    padding: 16,
    gap: 10,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button:{
    marginHorizontal: 10,
    width: 30,
  }
});

export default App;