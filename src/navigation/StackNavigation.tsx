import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen/MainScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import DrawerNavigation from "./DrawerNavigation";

const StackNavigation = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='DrawerNavigation' component={DrawerNavigation} />
        </Stack.Navigator>
    )
}

export default StackNavigation;