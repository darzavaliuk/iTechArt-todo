import {Action} from "redux";
import {TodoScheme} from "../../../interfaces/todoScheme";
import {ADD_TODO, COMPLETE_TODO, DELETE_TODOS, SET_TODOS, UPDATE_TODO} from "../../actions/types/todoTypes";

const initialState = {
    todos: [] as TodoScheme[]
}

export interface TodoState {
    todos: TodoScheme[];
}

export const todoReducer = (state = initialState, action: any) => {

    switch (action.type) {


        case DELETE_TODOS:
            return {
                ...state,
                todos: []
            }


        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.todo]
            }


        case UPDATE_TODO:
            const newTodo: TodoScheme[] = [...state.todos]
            const todoIndex: number = newTodo.findIndex((todo: TodoScheme) => todo.key === action.todo.key)
            newTodo.splice(todoIndex, 1, action.todo)
            return {
                ...state,
                todos: [...newTodo]
            }

        case COMPLETE_TODO:
            const newTodos = [...state.todos];
            const todoInd = state.todos.findIndex((todo) => todo.key == action.key.toString());
            newTodos.splice(todoInd, 1);
            return {
                ...state,
                todos: [...newTodos]
            }

        case SET_TODOS:
            console.log(action.payload)
            return {
                ...state,
                todos: [...action.payload]
            }

        default:
            return state;
    }
}