import {Text, TouchableHighlight, View} from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import React from "react";
import {HeaderProps} from "./interface";
import {color, fontSize, styles} from "./import";

export const Header: React.FC<HeaderProps> = ({handleDelete}) => {
    return (
        <View style={styles.headerBackground}>
            <Text style={styles.headerText}>Todo</Text>
            <TouchableHighlight onPress={() => handleDelete()} style={styles.deleteButton}>
                <EntypoIcon name="trash" size={fontSize.BIG} color={color.BLACK}/>
            </TouchableHighlight>
        </View>
    )
}

