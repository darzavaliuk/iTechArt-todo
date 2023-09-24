import {TodoScheme} from "../../interfaces/todoScheme";
import {ADD_TODO, COMPLETE_TODO, DELETE_TODOS, SET_TODOS, UPDATE_TODO} from "./types/todoTypes";

export function addTodo(todo: TodoScheme) {
    return {
        type: ADD_TODO,
        todo: todo
    }
}

export function deleteTodos() {
    return {
        type: DELETE_TODOS,
    }
}

export function editTodo(todo: TodoScheme) {
    return {
        type: UPDATE_TODO,
        todo: todo
    }
}

export function completeTodo(key: string) {
    return {
        type: COMPLETE_TODO,
        key: key
    }
}

export function setTodos(todos: TodoScheme[]) {
    return {
        type: SET_TODOS,
        payload: todos
    }
}

