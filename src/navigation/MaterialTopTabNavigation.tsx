import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RecentExpenses from '../screens/RecentExpenses/RecentExpenses';
import TopTabScreen from '../screens/TopTabScreen/TopTabScreen';
import Icon, { IconType } from "react-native-dynamic-vector-icons";

const MaterialTopTabNavigation = () => {
    const TopTab = createMaterialTopTabNavigator();

    const renderTabIcon = (
        route: any,
        focused: boolean,
        color: string,
        size: number,
      ) => {
        let iconName = "hour-glass";
        let iconType = IconType.Ionicons
        switch (route) {
          case "topTab":
            iconName = focused ? "time" : "time-outline";
            break;
          case "topTabScreen":
            iconName = focused ? "bag-add" : "bag-add-outline";
            break;
          default:
            iconName = focused ? "time" : "time-outline";
            break;
        }
        return (
            <Icon
            name={iconName}
            type={iconType}
            size={size}
            color={color}
          />
        );
      };
    return (
        <TopTab.Navigator
        initialRouteName='topTab'
        screenOptions={{
            tabBarStyle:{backgroundColor:'#e6e6e6'},
            tabBarShowIcon: true,
            tabBarIndicatorStyle:{backgroundColor:'green'},
            tabBarActiveTintColor:"#006600",
            tabBarInactiveTintColor:"#a6a6a6",
            tabBarShowLabel: false,
        }}
        >
            <TopTab.Screen 
            name='topTab' 
            component={RecentExpenses} 
            options={{
                tabBarLabel:'Top Tab',
                tabBarIcon:  ({ focused, color, size }:any) =>
                renderTabIcon('topTab', focused, color, size),
            }}/>
            <TopTab.Screen 
            name='topTabScreen' 
            component={TopTabScreen} 
            options={{
                tabBarLabel: "Top Tab Screen",
                tabBarIcon:  ({ focused, color, size }:any) =>
                renderTabIcon('topTabScreen', focused, color, size),
            }}/>
        </TopTab.Navigator>
    )
}

export default MaterialTopTabNavigation;