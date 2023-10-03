import {StyleSheet} from "react-native";
import {color} from "../../constants/color";
import {size} from "../../constants/size";
import {fontSize} from "../../constants/fontSize";
import {letterSpacing} from "../../constants/letterSpacing";

export const styles = StyleSheet.create({
    buttonModal: {
        width: size.modalWidth,
        height: size.modalHeight,
        backgroundColor: color.BLACK,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        bottom: 5,
        right: 15,
    },
    modalContainer: {
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: color.BLACK
    },
    modalView: {
        backgroundColor: color.WHITE,
        borderRadius: 20,
        padding: 35
    },
    icon: {
        alignItems: "center",
        marginBottom: 30
    },
    input: {
        width: size.inputWidth,
        height: size.inputHeight,
        backgroundColor: color.BLACK,
        padding: 10,
        fontSize: fontSize.SMALL,
        borderRadius: 10,
        color: color.WHITE,
        letterSpacing: letterSpacing.NORMAL
    },
    modalActionGroup: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 30
    },
    modalAction: {
        width: size.modalWidth,
        height: size.modalHeight,
        backgroundColor: color.BLACK,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    modalActionClearButton: {
        width: size.modalWidth,
        height: size.modalHeight,
        // backgroundColor: color.BLACK,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        marginTop: -55,
    },
    clearButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        opacity: 0, // Изначально кнопка должна быть невидимой
    },
})
