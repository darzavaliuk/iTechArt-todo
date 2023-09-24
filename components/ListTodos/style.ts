import {StyleSheet} from "react-native";
import {color} from "../../constants/color";

export const styles = StyleSheet.create({
    container: {
        // width: "100%",
        // height: "100%",
        // overflow: "scroll",
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
        // resizeMode: "cover",
        // flex: 1,
        backgroundColor: color.GREY,
        margin: 10,
        borderRadius: 10,
        height: 60
    },
    noTodoText: {
        color: color.BLACK,
        fontSize: 20,
        textAlign: "center"
    }
})