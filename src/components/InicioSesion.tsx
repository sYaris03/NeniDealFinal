import { Alert, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ILogin } from '../models/ILogin';

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParam } from './NavConfig'
import firestore from '@react-native-firebase/firestore'
import { IUser } from '../models/IUser';

const InicioSesion = 'https://firebasestorage.googleapis.com/v0/b/nenideal22.appspot.com/o/neniDealLogoRedondo.png?alt=media&token=036fe5ee-e05c-4aa6-8e96-e08aee5cd130'
const ImagenFondo = "https://png.pngtree.com/thumb_back/fw800/background/20210814/pngtree-pink-yellow-watercolor-gold-foil-polka-dot-wallpaper-background-image_762637.jpg"

type Props = NativeStackScreenProps<RootStackParam, 'InicioSesion'>;

const InicioSesionComponent = ({ navigation }: Props) => {
    useEffect(() => {
        setUsuario("")
        setContrasena("")

    }, [])


    const [usuario, setUsuario] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [usuarioRegistrado, setUsuarioRegistrado] = useState(false)
    const [vendedores, setVendedores] = useState<IUser[]>([]);

    async function handlerSignIn() {
        try {
            const subscriber = await firestore()
                .collection('Usuario')
                .where('usuario', '==', usuario)
                .onSnapshot(documentSnapshot => {

                    documentSnapshot.forEach(x => {
                        console.log(x.data());

                        if (usuario == x.data().usuario && contrasena == x.data().contrasena) {
                            navigation.navigate('Menu', { usuario: x.data().usuario })
                            console.log('SI')
                        } else if (usuario == x.data().usuario && contrasena != x.data().contrasena) {
                            console.log('contraseña incorrecta')
                        }
                    });
                });
            return subscriber;
        } catch (error) {
            console.error("Error");
        }
    }
    return (
        <View style={styles.Contenedor}>

            <ImageBackground source={{ uri: ImagenFondo }} resizeMode="cover"
                style={[styles.Imagen]} >

                <ScrollView contentContainerStyle={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}>
                    <View style={styles.login}>
                        <Image source={{ uri: InicioSesion }} style={[styles.ProfileUsser]}></Image>
                        <View>
                            <Text style={styles.Texto}>Usuario</Text>
                            <TextInput style={styles.Input}
                                onChangeText={(text) => setUsuario(text)}
                                placeholder="Usuario"></TextInput>
                        </View>
                        <View>
                            <Text style={styles.Texto}>Contraseña</Text>
                            <TextInput style={styles.Input}
                                onChangeText={(text) => setContrasena(text)}
                                placeholder="Contraseña"
                                secureTextEntry={true}></TextInput>
                        </View>
                        <View style={[styles.Boton, { justifyContent: 'center', alignItems: 'center', }]}>

                            <Pressable onPress={
                                handlerSignIn
                            }>
                                <Text style={{ fontWeight: '700', fontSize: 17 }}>Iniciar Sesión</Text>
                            </Pressable>
                        </View>
                        <Text style={{ marginTop: 15, fontSize: 15, fontWeight: '400', color: 'while', }}>¿Aún no tienes cuenta?</Text>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Pressable onPress={(e) => {
                                navigation.navigate('CrearCuenta');
                            }}>
                                <Text style={{ fontWeight: '700', fontSize: 17, marginTop: 10 }}>Regí­strate</Text>
                            </Pressable>
                        </View>


                    </View>
                </ScrollView>
            </ImageBackground >
        </View >
    )
}

export default InicioSesionComponent

const styles = StyleSheet.create({
    Boton: {
        marginTop: 10,
        borderRadius: 10,
        width: 200,
        height: 40,
        color: "white",
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "pink",
        borderColor: '#ff0080',
        borderWidth: 2,

    },
    Contenedor: {
        backgroundColor: '#ffff',
        flex: 1,
    },
    login: {
        width: 350,
        height: 500,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#FFFFFF90'
    },
    Imagen: {
        width: '100%',
        height: '100%',
    },
    Input: {
        width: 300,
        height: 40,
        borderColor: 'white',
        borderBottomColor: '#ff0080',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff90',
        marginBottom: 20,
    },
    ProfileUsser: {
        width: 140,
        height: 140,
        marginTop: 5,
        borderWidth: 3,
        marginBottom: 10,
    },
    Texto: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        color: 'gray',
    },
    Titulo: {
        flex: 1,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: "10%",
    },

})