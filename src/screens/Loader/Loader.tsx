import LottieView from "lottie-react-native";
import React from "react";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import todo from '../../assets/todo.json';

interface LoaderScreenProps<RouteName extends keyof ParamListBase> {
    navigation: NavigationProp<ParamListBase, RouteName>;
}

export const Loader: React.FC<LoaderScreenProps<'Home'>> = ({navigation}) => {
    return (
        <LottieView style={{flex: 1}} source={todo}
                    duration={2000} autoPlay loop={false}
                    onAnimationFinish={() => navigation.navigate('Home')}/>
    )
}
