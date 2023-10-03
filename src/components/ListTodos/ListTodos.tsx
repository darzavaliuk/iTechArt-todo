import {SwipeListView} from 'react-native-swipe-list-view'
import {Text, TouchableHighlight, View} from "react-native";
import EntypoIcon from 'react-native-vector-icons/Entypo'
import React, {useEffect, useState} from "react";
import {ListTodosProps} from "./interface";
import {color, fontSize, size, styles} from "./import";
import useTodoState from "../../store/selector/selector";
import {completeTodo} from "../../store/actions/todoActions";
import PropTypes from "prop-types";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

export const ListTodos: React.FC<ListTodosProps> = ({handleEdit}) => {
    const [swipedRow, setSwipedRow] = useState<string | null>(null);
    const { dispatch, state } = useTodoState();
    const handleDeleteTodo = (rowMap: number, rowKey: string) => {
        dispatch(completeTodo(rowKey))
    }

    const ListItem =  React.memo(({ item, index }) => {
        const fadeAnim = useSharedValue(0);

        useEffect(() => {
            const timer = setTimeout(() => {
                startAnimation();
            }, index * 100); // Delay for each item

            return () => clearTimeout(timer);
        }, []);

        const startAnimation = () => {
            fadeAnim.value = withTiming(1, { duration: 500 }); // Apply opacity animation
        };

        const animatedStyle = useAnimatedStyle(() => {
            return {
                opacity: fadeAnim.value,
                transform: [
                    {
                        translateY: withTiming(0, {
                            duration: 500,
                        }),
                    },
                ],
            };
        });

        return (
            <Animated.View style={[styles.list, animatedStyle]}>
                <View style={styles.listText}>
                    <Text style={styles.todoText}>{item.title}</Text>
                    <Text style={styles.todoDate}>{item.date}</Text>
                </View>
                <TouchableHighlight onPress={() => handleEdit(item)} style={styles.updateButton}>
                    <EntypoIcon name="edit" size={fontSize.NORMAL_PLUS} color={color.BLACK}/>
                </TouchableHighlight>
            </Animated.View>
        );
    });

    return state.todos?.length > 0 ? (
        <View style={styles.container}>
            <SwipeListView
                useFlatList
                data={state.todos || []}

                renderItem={({ item, index }) => <ListItem item={item} index={index} />}
                renderHiddenItem={({item, ...rowMap}) => (
                    <View>
                        <TouchableHighlight style={styles.deleteButton}
                                            onPress={() => handleDeleteTodo(rowMap.index, item.key)}>
                            <EntypoIcon name="trash" style={{marginTop: 10}}
                                        size={fontSize.BIG} color={color.BLACK}/>
                        </TouchableHighlight>
                    </View>
                )}
                removeClippedSubviews={true}
                keyExtractor={(item) => item.key.toString()}
                maxToRenderPerBatch={15}
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
        </View>
    ) : (
        <View>
            <Text style={styles.noTodoText}>No todos</Text>
        </View>
    )
}

