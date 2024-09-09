import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen/MainScreen";
import BottomTabNavigation from "./BottomTabNavigation";


const StackNavigation = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='BottomStackContainer' component={BottomTabNavigation} />
            <Stack.Screen name='MainScreen' component={MainScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigation;