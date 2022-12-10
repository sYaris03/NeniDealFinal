import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParam } from './NavConfig';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';

type Props = NativeStackScreenProps<RootStackParam, 'Menu'>;
const Menu = ({ route, navigation }: Props) => {

  //Usuario que inicio sesion
  const usuario= route.params.usuario

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <SafeAreaProvider >
        <HeaderRNE
        backgroundColor='#ff0080'
          centerComponent={{ text: 'Menu', style: styles.heading }}
          rightComponent={
            <View style={styles.headerRight}>

              <Pressable 
              onPress={()=>{navigation.navigate('InicioSesion')}}>
                <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nenidealdm-76a8f.appspot.com/o/Icon%2Fcerrarsesion.png?alt=media&token=fc5227f3-4757-4dea-bc13-6d4b11064b60' }} style={styles.Imagen} ></Image>
              </Pressable>
            </View>
          }
        />
      </SafeAreaProvider>
      <View style={{ flex: 7, alignItems: 'center' }}>
        <View style={[styles.Boton, { justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}>
          <Pressable onPress={() => {
            //navigation.navigate('Perfil',{usuario: usuario})
          }}>
            <Text style={styles.Texto}>Mi Perfil</Text>
            {/* <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/570/570170.png' }} style={styles.Icon} ></Image> */}
          </Pressable>
        </View>
        <View style={[styles.Boton, { justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}>
          <Pressable onPress={() => {
            navigation.navigate('MisArticulos',{usuario: usuario})
          }}>
            <Text style={styles.Texto}>Mis Articulos</Text>
            {/* <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/570/570170.png' }} style={styles.Icon} ></Image> */}
          </Pressable>
        </View>
        
        <View style={[styles.Boton, { justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}>
          <Pressable onPress={() => {
           navigation.navigate('Articulos',{usuario: usuario})
          }}>
            <Text style={styles.Texto}>Comprar</Text>
          </Pressable>
        </View>

        {/* agregar parametros */}
        <View style={[styles.Boton, { justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}>
          <Pressable onPress={() => {
            navigation.navigate('Tratos')
          }}>
            <Text style={styles.Texto}>Tratos agendados</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
  Boton: {
    marginTop: '8%',
    borderRadius: 10,
    width: 300,
    height: 80,
    color: "white",
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "pink"
  },
  SignOut: {
    marginTop: '8%',
    borderRadius: 10,
    width: 300,
    height: 80,
    color: "white",
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "pink"
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  Imagen: {
    width: 20,
    height: 20,
    marginEnd: 10,
  },
  Texto: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '500',
    color: 'while',
  },
})