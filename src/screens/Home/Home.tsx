import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    ListTodos,
    Header,
    InputModal,
    deleteTodos,
    setTodos,
    styles,
    color,
} from './import';
import {TodoScheme} from '../../interfaces/todoScheme';
import useTodoState from '../../store/selector/selector';
import {Search} from '../../components/Search/Search';

function Home() {
    const {dispatch, state} = useTodoState();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [todoInputValue, setTodoInputValue] = useState<string>();
    const [todoEditingItem, setTodoEditingItem] = useState<TodoScheme | null>(
        null,
    );
    const [ready, setReady] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleDelete = () => {
        dispatch(deleteTodos());
    };

    const handleEdit = (item: TodoScheme) => {
        setTodoEditingItem(item);
        setIsModalVisible(true);
        setTodoInputValue(item.title);
    };

    const loadTodos = () => {
        AsyncStorage.getItem('storedTodos')
            .then(data => {
                if (data !== null) {
                    dispatch(setTodos(JSON.parse(data)));
                }
                setReady(true);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        loadTodos();
    }, []);

    return (
        <SafeAreaView style={styles.sectionContainer}>
            <StatusBar barStyle={'light-content'}/>
            {ready ? (
                <>
                    <Header handleDelete={handleDelete}/>
                    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={-200}>
                        <Search isFocused={isFocused} setIsFocused={setIsFocused}/>
                    </KeyboardAvoidingView>
                    <ListTodos handleEdit={handleEdit} isFocused={isFocused}/>
                    <InputModal
                        isModalVisible={isModalVisible}
                        setIsModalVisible={setIsModalVisible}
                        todoInputValue={todoInputValue!}
                        setTodoInputValue={setTodoInputValue}
                        todoEditingItem={todoEditingItem}
                        setTodoEditingItem={setTodoEditingItem}
                    />
                </>
            ) : (
                <ActivityIndicator size="large" color={color.BLACK} style={{flex: 1}}/>
            )}
        </SafeAreaView>
    );
}

export default Home;
