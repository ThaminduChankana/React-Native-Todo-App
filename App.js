import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,StatusBar, TextInput, FlatList} from 'react-native';
import {icon} from './assets/favicon.png'
import SingleTodo from './components/SingleTodo';

const App = () =>{

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const handleAddTodo = () =>{
    if(!todo) return
    else{
      setTodos([...todos,{id:Date.now(), text:todo}])
      setTodo("");
    }
  }
  
  const fetchTodos = async() =>{
    const data = await AsyncStorage.getItem("todos");
    if(data) setTodos(JSON.parse(data));
  }

  useEffect(() => {
    fetchTodos();
  },[]);

  return (
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <Text style={styles.heading}>React Native Todo App</Text>
    <View style={styles.inputContainer}>
      <TextInput
      onChangeText={(text)=>setTodo(text)}
      value={todo} 
      placeholder='Enter a ToDo' style={styles.input}></TextInput>

      <TouchableOpacity
      onPress={handleAddTodo}>
        <Text style={styles.button}>Go</Text>
      </TouchableOpacity>
    </View> 

    <View style={{width:"100%", marginTop:10}}>
      <FlatList 
        data={todos}
        renderItem={
          ({item}) => <SingleTodo 
          todo={item}
          todos={todos}
          setTodos={setTodos}
          />
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </View> 
    
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    backgroundColor:"#9EDEC6",
  },
  heading:{
    marginVertical:10,
    fontSize:30,
    fontWeight:"700"
  },
  inputContainer:{
      flexDirection:"row",
      marginHorizontal:10,
      alignItems:"center"

  },
  input:{
    flex:1,
    backgroundColor:"white",
    shadowColor:"black",
    marginRight:5,
    paddingHorizontal:20,
    paddingVertical:20,
    borderRadius:50,
    elevation:10
  },
  button: {
    backgroundColor:"white",
    shadowColor:"black",
    padding:13,
    borderRadius:50,
    elevation:10
  }
});

export default App;