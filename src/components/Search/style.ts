import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    textInput: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        // paddingHorizontal: 10,
        backgroundColor: 'black',
        color: "white",
        marginRight: 30
    },
    textInputFocused: {
        backgroundColor: '#221111',
    },
    clearButtonContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    clearButtonText: {
        color: 'black',
    },
});
