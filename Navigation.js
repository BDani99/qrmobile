import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Text, View} from "react-native";
import Home from './screens/Home'
import Others from './screens/drawerscreens/Others'
import Settings from './screens/drawerscreens/Settings'
import LoginScreen from './screens/Login'

//Stack
const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen 
            name='Home' 
            component={Home} 
            options={{headerShown: false}}
            />
        </HomeStack.Navigator>
    )
}

//Drawer
const Drawer = createDrawerNavigator();

function DrawerGroup() {
    return (
        <Drawer.Navigator screenOptions={{headerShown: true}}>
            <Drawer.Screen name='Qr-kód Scennelés' component={HomeStackGroup}/>
            <Drawer.Screen name='Egyebek' component={Others} options={{headerShown: true}}/>
            <Drawer.Screen name='Beállíások' component={Settings} options={{headerShown: true}}/>
        </Drawer.Navigator>
    )
}

export default function Navigation() {
    const currentTheme = useColorScheme();

    return (
        <NavigationContainer
        theme={currentTheme === "dark" ? DarkTheme : customTheme}
        >
        <StatusBar style='auto'/>
            <DrawerGroup/>
        </NavigationContainer>
    )
}

const customTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#e4e6da',
    },
};