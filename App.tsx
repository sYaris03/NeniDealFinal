import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InicioSesionComponent from './src/components/InicioSesion'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParam } from './src/components/NavConfig';

import CrearCuentaComponent from './src/components/CrearCuenta';
import PrincipalComponent from './src/components/Principal';
import Prueba from './src/components/Prueba';
import MisArticulos from './src/components/MisArticulos';
import Menu from './src/components/Menu';
import Articulos from './src/components/Articulos';
import CrearArticulo from './src/components/CrearArticulo';
import DetalleArticulo from './src/components/DetalleArticulo';
import CrearTrato from './src/components/CrearTrato';
import DetallesVendedor from './src/components/DetalleVendedor';

const Stack = createNativeStackNavigator<RootStackParam>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='InicioSesion'>

        <Stack.Screen name='InicioSesion' component={InicioSesionComponent}
          options={(nav) => ({
            headerShown: false
          })}></Stack.Screen>
        <Stack.Screen name='CrearCuenta' component={CrearCuentaComponent} options={(nav) => ({ headerShown: false })}></Stack.Screen>
        <Stack.Screen name='MisArticulos' component={MisArticulos} options={(nav) => ({ headerShown: false })}></Stack.Screen>
        <Stack.Screen name='Articulos' component={Articulos} options={(nav) => ({ headerShown: false })}></Stack.Screen>
        <Stack.Screen name='Menu' component={Menu} options={(nav) => ({headerShown: false})}></Stack.Screen>
        <Stack.Screen name='CrearArticulo' component={CrearArticulo} options={(nav) => ({headerShown: false})}></Stack.Screen>
        <Stack.Screen name='DetalleArticulo' component={DetalleArticulo} options={(nav) => ({headerShown: false})}></Stack.Screen>
        <Stack.Screen name='CrearTrato' component={CrearTrato} options={(nav) => ({headerShown: false})}></Stack.Screen>
        <Stack.Screen name='DetalleVendedor' component={DetallesVendedor} options={(nav) => ({headerShown: false})}></Stack.Screen>
        {/* <Stack.Screen name='Principal' component={PrincipalComponent} options={(nav) => ({headerShown: false})}></Stack.Screen>

         <Stack.Screen name='Perfil' component={PerfilComponent} options={(nav) => ({headerShown: false})}></Stack.Screen>
         <Stack.Screen name='MisArticulos' component={Articulos} options={(nav) => ({headerShown: false})}></Stack.Screen>
         <Stack.Screen name='Tratos' component={Tratos} options={(nav) => ({headerShown: false})}></Stack.Screen> */}
        {/* <Stack.Screen name='Camara' component={CamaraComponent} options={(nav) => ({headerShown: false})}></Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App

const styles = StyleSheet.create({})