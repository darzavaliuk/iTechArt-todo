import {SwipeListView} from 'react-native-swipe-list-view'
import {Animated, Easing, Text, TouchableHighlight, View} from "react-native";
import EntypoIcon from 'react-native-vector-icons/Entypo'
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {ListTodosProps} from "./interface";
import {color, fontSize, size, styles} from "./import";
import useTodoState from "../../store/selector/selector";
import {completeTodo} from "../../store/actions/todoActions";

export const ListTodos: React.FC<ListTodosProps> = ({handleEdit, isFocused}) => {
    const [swipedRow, setSwipedRow] = useState<string | null>(null);
    const {dispatch, state} = useTodoState();
    const handleDeleteTodo = (rowMap: number, rowKey: string) => {
        dispatch(completeTodo(rowKey))
    }

    const [animateOnSearch] = useState(new Animated.Value(1));

    useEffect(() => {
        if (isFocused) {
            Animated.timing(animateOnSearch, {
                toValue: 0,
                duration: 250,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animateOnSearch, {
                toValue: 1,
                duration: 250,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        }
    }, [isFocused]);

    const containerStyle = {
        opacity: animateOnSearch,
        transform: [
            {
                scale: animateOnSearch.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                }),
            },
        ],
    };
    const [isListVisible, setListVisible] = useState(true);


    useEffect(() => {
        animateListItems();
    }, []);

    const animateListItems = () => {
        Animated.timing(animateOnSearch, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const animateOnAppear = useRef(new Animated.Value(0)).current;

    useLayoutEffect(() => {
        animateListItems1();
    }, []);

    const animateListItems1 = () => {
        const delay = 30;

        state.todos.forEach((_, index) => {
            Animated.sequence([
                Animated.delay((index + 2) * delay),
                Animated.timing(animateOnAppear, {
                    toValue: 1,
                    duration: 100 * (index + 3),
                    useNativeDriver: true,
                }),
            ]).start();
        });
    };
    const renderItem = ({ item }) => {
        const opacity = animateOnAppear.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });

        const translateY = animateOnAppear.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 0],
        });

        return (
            <Animated.View style={{ opacity, transform: [{ translateY }] }}>
                <View style={styles.list}>
                    <View style={styles.listText}>
                        <Text style={styles.todoText}>{item.title}</Text>
                        <Text style={styles.todoDate}>{item.date}</Text>
                    </View>
                    <TouchableHighlight
                        onPress={() => handleEdit(item)}
                        style={styles.updateButton}
                    >
                        <EntypoIcon
                            name="edit"
                            size={fontSize.NORMAL_PLUS}
                            color={color.BLACK}
                        />
                    </TouchableHighlight>
                </View>
            </Animated.View>
        );
    };

    return state.todos?.length > 0 ? (
        <Animated.View style={[styles.container, containerStyle]}>
            <SwipeListView
                useFlatList
                data={state.todos || []}
                renderItem={renderItem}

                renderHiddenItem={({item, ...rowMap}) => (
                    <View>
                        <TouchableHighlight style={styles.deleteButton}
                                            onPress={() => handleDeleteTodo(rowMap.index, item.key)}>
                            <EntypoIcon name="trash" style={{marginTop: 10}}
                                        size={fontSize.BIG} color={isListVisible ? color.WHITE : color.BLACK}/>
                        </TouchableHighlight>
                    </View>
                )}

                leftOpenValue={size.openValue}
                previewRowKey={'1'}
                previewOpenValue={size.openValue}
                previewOpenDelay={3000}
                disableLeftSwipe={true}
                showsHorizontalScrollIndicator={false}
                overScrollMode={"auto"}
                onRowOpen={(rowKey) => {
                    setSwipedRow(rowKey);
                }}
                onRowClose={() => {
                    setSwipedRow(null);
                }}
            />
        </Animated.View>
    ) : (
        <View>
            <Text style={styles.noTodoText}>No todos</Text>
        </View>
    )
}
