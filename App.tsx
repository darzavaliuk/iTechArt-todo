import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import {Loader} from "./src/screens/Loader/Loader";
import {Home} from "./src/screens/Home/";
import {Provider} from "react-redux";
import {rootReducer} from "./src/store/rootReducer";
import {applyMiddleware, createStore} from "redux";
import saveTodoMiddleware from "./src/store/reducers/todoReducer/middleWare";

function App() {
    const store = createStore(rootReducer, applyMiddleware(saveTodoMiddleware));
    const Stack = createStackNavigator();

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen
                        name='Splash Screen'
                        component={Loader}
                    />

                    <Stack.Screen
                        name='Home'
                        component={Home}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
