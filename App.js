import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import DiaryPost from './src/screens/DiaryPost';
import firebaseConfig from './firebase';
import firebase from 'firebase';
import Signup from './src/screens/Signup';
import Login from './src/screens/Login';

const Stack = createStackNavigator();

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);


const App = () => {


	const [user, setUser] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => user ? setUser(true) : false);
	}, [])


	return (
		<NavigationContainer>
			{user ? <Stack.Navigator screenOptions={{ headerShown: false }} >
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Diary" component={DiaryPost} />
			</Stack.Navigator> :
				<Stack.Navigator screenOptions={{ headerShown: false }} >
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Signup" component={Signup} />
				</Stack.Navigator>}
		</NavigationContainer>
	);
};


export default App;
