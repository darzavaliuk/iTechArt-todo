import {TodoScheme} from "../../interfaces/todoScheme";

export interface InputModalProps {
    isModalVisible: boolean;
    setIsModalVisible: (visible: boolean) => void;
    todoInputValue: string;
    setTodoInputValue: (value: string) => void;
    todoEditingItem: TodoScheme | null;
    setTodoEditingItem: (item: TodoScheme | null) => void;
}
