import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SingleTodo({todo, setTodos, todos}) {

    const[edit,setEdit]=useState(false);
    const [editText, setEditText] = useState(todo.text);
    const handleEdit = () => {
        if(!edit)
        setEdit(!edit)
        else{
            setEdit(!edit)
            setTodos(
                todos.map((t) => 
                    t.id === todo.id ? {
                        id:t.id,
                        text:editText,
                    }
                    : t
                )
            );
            AsyncStorage.setItem("todos", JSON.stringify(todos))
        }
    }

    const handleDelete = (id) => {
        setTodos(todos.filter((t) => t.id !== id));
    }

    useEffect(() => {
        AsyncStorage.setItem("todos", JSON.stringify(todos))
    }, [todos]);


  return (
    <View style={styles.todo}>

        {
            !edit?(<Text style={styles.todotext}>{todo.text}</Text>)
            :(<TextInput style={styles.todoinput}
            value={editText}
            onChangeText = {(text) => setEditText(text)}/>)
        }
        
        <View style={styles.actions}>
        <TouchableOpacity>
            <MaterialIcons 
            style={styles.todoaction}
            name="edit"
            size={23}
            color="black"
            onPress={handleEdit}/>
        </TouchableOpacity>
        <TouchableOpacity>
            <MaterialIcons 
            style={styles.todoaction}
            name="delete"
            size={23}
            color="black"
            onPress={()=>handleDelete(todo.id)}/>
        </TouchableOpacity></View>
    </View>
  )
}

const styles= StyleSheet.create({
    todo:{
        flexDirection:"row",
        marginHorizontal:10,
        elevation:5,
        shadowColor:"black",
        backgroundColor:"white",
        paddingHorizontal:10,
        paddingVertical:10,
        marginBottom:10,
        borderRadius:50,
    },
    actions:{
        flexDirection:"row", 
    },
    todoaction:{
        marginLeft:15 
    },
    todotext:{
        flex:1,
        fontSize:18,
        paddingVertical:3,
        paddingHorizontal:5,
    },
    todoinput:{
        flex:1,
        fontSize:18,

        paddingHorizontal:5,
        borderColor:"grey",
        borderWidth:1,
        borderRadius:5,
    }
});