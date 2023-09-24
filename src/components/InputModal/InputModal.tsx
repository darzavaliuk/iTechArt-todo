import {Modal, TextInput, TouchableOpacity, View} from "react-native";
import EntypoIcon from 'react-native-vector-icons/Entypo'
import {TodoScheme} from "../../interfaces/todoScheme";
import {addTodo, color, editTodo, fontSize, styles} from "./import";
import {FC} from "react";
import {InputModalProps} from "./interface";
import useTodoState from "../../store/selector/selector";
import PropTypes from "prop-types";

export const InputModal: FC<InputModalProps> = ({
                                                    isModalVisible,
                                                    setIsModalVisible,
                                                    todoInputValue,
                                                    setTodoInputValue,
                                                    todoEditingItem,
                                                    setTodoEditingItem,
                                                }) => {

    const {dispatch, state} = useTodoState();

    const handleEditTodo = (editedTodo: TodoScheme) => {
        dispatch(editTodo(editedTodo))
        setTodoEditingItem(null)
        setIsModalVisible(false)
    }

    const handleAddTodo = (todo: TodoScheme) => {
        dispatch(addTodo(todo))
        setIsModalVisible(false);
    }

    const handleClose = () => {
        setIsModalVisible(false);
        setTodoInputValue("")
        setTodoEditingItem(null)
    }

    const handleSubmit = () => {
        if (todoInputValue) {
            if (!todoEditingItem) {
                handleAddTodo({
                    title: todoInputValue,
                    date: new Date().toUTCString(),
                    key: `${(state.todos[state.todos.length - 1] && parseInt(state.todos[state.todos.length - 1].key) + 1) || 1}`
                });
            } else {
                handleEditTodo({
                    title: todoInputValue,
                    date: todoEditingItem.date,
                    key: todoEditingItem.key
                })
            }
        }
        setTodoInputValue("");
    }

    return (
        <>
            <TouchableOpacity style={styles.buttonModal} onPress={() => setIsModalVisible(true)}>
                <EntypoIcon name="plus" size={fontSize.BIG} color={color.WHITE}/>
            </TouchableOpacity>

            <Modal
                animationType='slide'
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleClose}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={styles.icon}>
                            <EntypoIcon name="edit" size={fontSize.BIG} color={color.BLACK}/>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder='Write some ideas...'
                            placeholderTextColor={color.WHITE}
                            selectionColor={color.GREY}
                            autoFocus={true}
                            onChangeText={(text) => setTodoInputValue(text)}
                            value={todoInputValue}
                            onSubmitEditing={handleSubmit}
                        />
                        <View style={styles.modalActionGroup}>
                            <TouchableOpacity style={styles.modalAction} onPress={handleClose}>
                                <EntypoIcon name="cross" size={fontSize.EXTRA_LARGE} color={color.WHITE}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalAction} onPress={handleSubmit}>
                                <EntypoIcon name="check" size={fontSize.VERY_BIG} color={color.WHITE}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

InputModal.propTypes = {
    isModalVisible: PropTypes.bool.isRequired,
    setIsModalVisible: PropTypes.func.isRequired,
    todoInputValue: PropTypes.string.isRequired,
    setTodoInputValue: PropTypes.func.isRequired,
    todoEditingItem: PropTypes.oneOfType([
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
        }),
        PropTypes.oneOf([null]),
    ]).isRequired,
    setTodoEditingItem: PropTypes.func.isRequired,
};


