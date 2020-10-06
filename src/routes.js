import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main/';
import User from './pages/User/';

const Stack = createStackNavigator();

function Routes() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen 
                    name='Home'
                    component={Main}
                    options={{
                        headerStyle: {
                            backgroundColor: '#7159c5'
                        },
                        headerTintColor: '#FFF',
                        headerTitleAlign: 'center'
                    }}
                />
                <Stack.Screen 
                    name='User'
                    component={User}
                    options={{
                        headerStyle: {
                            backgroundColor: '#7159c5'
                        },
                        headerTintColor: '#FFF',
                        headerTitleAlign: 'center'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;