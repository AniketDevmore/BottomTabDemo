import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigation from "./BottomTabNavigation";
import MainScreen from '../screens/MainScreen/MainScreen';

const DrawerNavigation = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name='Home'
                component={BottomTabNavigation}
                options={{
                    drawerLabel: 'Home'
                }}
            />
            <Drawer.Screen
                name='MainScreen'
                component={MainScreen}
                options={{
                    drawerLabel: 'Main Screen'
                }} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation;