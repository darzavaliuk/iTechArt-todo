import {StyleSheet} from "react-native";
import {color} from "../../constants/color";
import {fontSize} from "../../constants/fontSize";

export const styles = StyleSheet.create({
    headerBackground: {
        margin: 10,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    headerText: {
        color: color.BLACK,
        fontSize: fontSize.VERY_BIG,
    },
    deleteButton: {
        alignItems: "center"
    }
})
