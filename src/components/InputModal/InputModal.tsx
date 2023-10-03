import {Modal, TextInput, TouchableOpacity, View} from "react-native";
import EntypoIcon from 'react-native-vector-icons/Entypo'
import {TodoScheme} from "../../interfaces/todoScheme";
import {addTodo, color, editTodo, fontSize, styles} from "./import";
import {FC} from "react";
import {InputModalProps} from "./interface";
import useTodoState from "../../store/selector/selector";
import PropTypes from "prop-types";
import Animated, {useAnimatedStyle, useDerivedValue, useSharedValue, withTiming} from "react-native-reanimated";

export const InputModal: FC<InputModalProps> = ({
                                                    isModalVisible,
                                                    setIsModalVisible,
                                                    todoInputValue,
                                                    setTodoInputValue,
                                                    todoEditingItem,
                                                    setTodoEditingItem,
                                                }) => {

    const {dispatch, state} = useTodoState();
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(100);

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

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }]
        };
    });

    const clearButtonOpacity = useSharedValue(0); // Значение прозрачности кнопки очистки поля TextInput

    const handleInputChange = (text) => {
        setTodoInputValue(text); // Обновление значения поля TextInput
        clearButtonOpacity.value = text ? 1 : 0; // Изменение прозрачности кнопки очистки в зависимости от наличия текста в поле TextInput
    };

    const handleOpen = () => {
        setIsModalVisible(true);
        opacity.value = withTiming(1, { duration: 300 });
        translateY.value = withTiming(0, { duration: 300 });
    };

    const clearButtonStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(clearButtonOpacity.value, { duration: 200 }), // Применение плавной анимации прозрачности кнопки
            transform: [{ scale: withTiming(clearButtonOpacity.value, { duration: 200 }) }], // Применение плавной анимации масштабирования кнопки
        };
    });

    return (
        <>
            <TouchableOpacity style={styles.buttonModal} onPress={handleOpen}>
                <EntypoIcon name="plus" size={fontSize.BIG} color={color.WHITE}/>
            </TouchableOpacity>

            <Modal
                animationType='slide'
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleClose}>
                <Animated.View style={[styles.modalContainer, animatedStyle]}>
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
                            onChangeText={handleInputChange}
                            value={todoInputValue}
                            onSubmitEditing={handleSubmit}
                        />
                        <Animated.View style={[clearButtonStyle]}>
                            <TouchableOpacity  style={styles.modalActionClearButton} onPress={() => setTodoInputValue('')}>
                                <EntypoIcon name="cross" size={fontSize.EXTRA_LARGE} color={color.WHITE}/>
                            </TouchableOpacity>
                        </Animated.View>
                        <View style={styles.modalActionGroup}>
                            <TouchableOpacity style={styles.modalAction} onPress={handleClose}>
                                <EntypoIcon name="cross" size={fontSize.EXTRA_LARGE} color={color.WHITE}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalAction} onPress={handleSubmit}>
                                <EntypoIcon name="check" size={fontSize.VERY_BIG} color={color.WHITE}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </Modal>
        </>
    )
}
