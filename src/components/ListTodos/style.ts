import {StyleSheet} from "react-native";
import {color} from "../../constants/color";
import {fontSize} from "./import";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        margin: 10,
        backgroundColor: color.BLACK,
        padding: 10,
        borderRadius: 10,
        height: 60,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    listText: {
        width: "88%"
    },
    todoText: {
        color: color.WHITE,
        // width: "50%"
    },
    todoDate: {
        color: color.GREY,
        textAlign: "right"
    },
    updateButton: {
        backgroundColor: color.WHITE,
        borderRadius: 50,
        padding: 5,
    },
    deleteButton: {
        backgroundColor: color.GREY,
        margin: 10,
        borderRadius: 10,
        height: 60
    },
    noTodoText: {
        color: color.BLACK,
        fontSize: fontSize.NORMAL,
        textAlign: "center"
    }
})