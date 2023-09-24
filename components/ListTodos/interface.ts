import {TodoScheme} from "../../interfaces/todoScheme";

export interface ListTodosProps {
    handleEdit: (todoId: TodoScheme) => void;
}