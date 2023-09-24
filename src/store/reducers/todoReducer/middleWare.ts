import AsyncStorage from "@react-native-async-storage/async-storage";
import {ADD_TODO, COMPLETE_TODO, DELETE_TODOS, UPDATE_TODO} from "../../actions/types/todoTypes";
import {TodoScheme} from "../../../interfaces/todoScheme";
import {setTodos} from "../../actions/todoActions";


// @ts-ignore
const saveTodoMiddleware = store => next => action => {
        if (action.type === ADD_TODO) {
            const currentState = store.getState();
            const todos = [...currentState.todoReducer.todos, action.todo];
            AsyncStorage.setItem('storedTodos', JSON.stringify(todos)).then(() => {
                next(action);
            })
                .catch(error => console.log(error));
        } else if (action.type == UPDATE_TODO) {
            const newTodo: TodoScheme[] = store.getState().todoReducer.todos;
            const todoIndex: number = newTodo.findIndex((todo: TodoScheme) => todo.key === action.todo.key)
            newTodo.splice(todoIndex, 1, action.todo)
            AsyncStorage.setItem("storedTodos", JSON.stringify(newTodo)).then(() => {
                next(action);
            }).catch((error) => console.log(error))
        } else if (action.type == DELETE_TODOS) {
            AsyncStorage.setItem("storedTodos", JSON.stringify([])).then(() => {
                next(action);
            }).catch((error) => console.log(error))
        } else if (action.type == COMPLETE_TODO) {
            const newTodo = [...store.getState().todoReducer.todos];
            const todoIndex = newTodo.findIndex((todo) => todo.key == action.key);
            newTodo.splice(todoIndex, 1);
            AsyncStorage.setItem("storedTodos", JSON.stringify(newTodo)).then(() => {
                next(action);
            }).catch((error) => console.log(error))
        } else {
            next(action)
        }
    }
;

export default saveTodoMiddleware;