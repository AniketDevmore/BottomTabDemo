import { CommonActions, useNavigation } from "@react-navigation/native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import RecentExpenses from "../screens/RecentExpenses/RecentExpenses";
import AllExpenses from "../screens/AllExpenses/AllExpenses";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

const BottomTabNavigation = () => {
  const BottomStack = createBottomTabNavigator();
  const isRecentScreenFocused = useSelector((state: any) => state.route.isRecentFocused);
  const isAllScreenFocused = useSelector((state: any) => state.route.isAllExpenseFocused);

  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName = "hour-glass";
    let iconType = IconType.Ionicons
    switch (route.name) {
      case "RecentExpenses":
        iconName = focused ? "hourglass" : "hourglass-outline";
        break;
      case "AllExpenses":
        iconName = focused ? "calendar" : "calendar-outline";
        break;
      default:
        iconName = focused ? "hourglass" : "hourglass-outline";
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

  const RecentExpensesListner = (navigation: any) => {
    console.log('isRecentScreenFocused---------->>', isRecentScreenFocused)
    if (!isRecentScreenFocused) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'RecentExpenses' }],
        })
      );
    }
  };

  const AllExpensesListner = (navigation: any) => {
    console.log('isAllScreenFocused---------->>', isAllScreenFocused)
    if (!isAllScreenFocused) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'AllExpenses' }],
        })
      );
    }
  };

  return (
    <BottomStack.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) =>
        renderTabIcon(route, focused, color, size),
      tabBarActiveTintColor: "#006600",
      tabBarInactiveTintColor: "#a6a6a6",
      tabBarStyle: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: '#ccffcc',
        borderTopColor: "#cccccc",
        borderTopWidth: 0.5
      }
    })}
      initialRouteName={'RecentExpenses'}
    >
      <BottomStack.Screen
        name='RecentExpenses'
        component={RecentExpenses}
        options={{
          headerShown: false,
          tabBarLabel: 'Recent Expenses'
        }}
        listeners={({ navigation }) => ({
          tabPress: () => RecentExpensesListner(navigation)
        })}
      />
      <BottomStack.Screen name='AllExpenses' component={AllExpenses} options={{
        headerShown: false,
        tabBarLabel: 'All Expenses'
      }}
        listeners={({ navigation }) => ({
          tabPress: () => AllExpensesListner(navigation)
        })}
      />
    </BottomStack.Navigator>
  )
}

export default BottomTabNavigation;