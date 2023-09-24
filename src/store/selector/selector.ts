import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import {TodoState} from "../reducers/todoReducer/todoReducer"; // Импорт TypedUseSelectorHook и useSelector из 'react-redux'

interface RootState {
    todoReducer: TodoState;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector; // Назначение типизированного хука useSelector

const useTodoState = () => {
    const dispatch = useDispatch();
    const state = useTypedSelector((state) => ({
        todos: state.todoReducer.todos,
    }));

    return { dispatch, state };
};

export default useTodoState;