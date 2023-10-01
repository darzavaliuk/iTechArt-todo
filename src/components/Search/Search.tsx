import React, { useState, useRef } from 'react';
import { View, TextInput, Animated, TouchableOpacity } from 'react-native';
import {styles} from "./style";
import {SearchProps} from "./interface";

export const Search: React.FC<SearchProps> = ({isFocused, setIsFocused}) => {
    const [text, setText] = useState('');
    const clearButtonOpacity = useRef(new Animated.Value(0)).current;
    const clearButtonScale = useRef(new Animated.Value(0)).current;

    const handleTextInputFocus = () => {
        setIsFocused(true);
    };

    const handleTextInputBlur = () => {
        setIsFocused(false);
    };

    const handleTextChange = (value: string) => {
        setText(value);

        Animated.parallel([
            Animated.timing(clearButtonOpacity, {
                toValue: value === '' ? 0 : 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(clearButtonScale, {
                toValue: value === '' ? 0 : 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const clearText = () => {
        setText('');
        Animated.parallel([
            Animated.timing(clearButtonOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(clearButtonScale, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const clearButtonStyle = {
        opacity: clearButtonOpacity,
        transform: [{ scale: clearButtonScale }],
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.textInput, isFocused && styles.textInputFocused]}
                value={text}
                onChangeText={handleTextChange}
                onFocus={handleTextInputFocus}
                onBlur={handleTextInputBlur}
            />
            <Animated.View style={[styles.clearButtonContainer, clearButtonStyle]}>
                <TouchableOpacity onPress={clearText}>
                    <Animated.Text style={[styles.clearButtonText, clearButtonStyle]}>
                        Clear
                    </Animated.Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};


