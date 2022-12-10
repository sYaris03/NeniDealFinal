import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card } from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParam } from './NavConfig'
import { IArticulo } from '../models/IArticulo';
import firestore from '@react-native-firebase/firestore'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header as HeaderRNE, HeaderProps, Icon, ListItem } from '@rneui/themed';

import { Button } from '@rneui/themed';

const ImagenFondo = "https://png.pngtree.com/thumb_back/fw800/background/20210814/pngtree-pink-yellow-watercolor-gold-foil-polka-dot-wallpaper-background-image_762637.jpg"


type props = NativeStackScreenProps<RootStackParam, 'DetalleArticulo'>
const DetalleArticulo = ({ route, navigation }: props) => {
    const articuloInicial: IArticulo = {
        id: "",
        titulo: "",
        descripcion: "",
        precio: 0,
        vendedor: "",
        urlImg: ""
    }
    const [articulo, setArticulo] = useState<any>(articuloInicial);

    useEffect(() => {
        getDetalleArticulo(route.params.idArticulo)
    }, [])

    function getDetalleArticulo(id: string) {
        const subscriber = firestore()
            .collection('Articulos')
            .doc(id)
            .onSnapshot(documentSnapshot => {
                console.log('User data: ', documentSnapshot.data());
                setArticulo(documentSnapshot.data())
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaProvider >
                <HeaderRNE
                    backgroundColor='#ff0080'
                    leftComponent={
                        <View style={styles.headerRight}>

                            <Pressable onPress={() => {
                                navigation.goBack()
                            }}>
                                <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nenidealdm-76a8f.appspot.com/o/Icon%2Fatrasicono.png?alt=media&token=f64b7e33-b6a4-49ba-9040-321bcf43af20' }} style={styles.Imagen} ></Image>
                            </Pressable>
                        </View>
                    }
                    centerComponent={{ text: 'Detalle de Artículo', style: styles.heading }}
                />
                <ImageBackground source={{ uri: ImagenFondo }} resizeMode="cover"
                    style={{ width: '100%', height: 700 }} >
                    <ScrollView contentContainerStyle={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                        <View style={styles.login}>
                            <View style={{
                                height: '90%',
                                width: '80%',
                                backgroundColor: '#FFFFFF90',
                                marginTop: 30,
                                borderWidth: 2,
                                borderColor: 'pink',
                                borderRadius: 15,
                                alignContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: 35, textAlign: 'center', color: '#ff0080' }}>{articulo.titulo}</Text>
                                <Image
                                    style={{ width: '90%', height: '45%', borderRadius: 20, marginTop: '5%' }}

                                    source={{
                                        uri: articulo.urlImg
                                    }}
                                />
                                <Text style={{ fontSize: 30, color: 'darkorange', textAlign: 'justify', marginTop: '2%' }}>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(articulo.precio)}</Text>
                                <Text style={{ fontSize: 15, marginTop: '5%' }}>{articulo.descripcion}</Text>
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>

                                    <Pressable
                                        style={{ width: 50, height: 50, borderRadius: 100, backgroundColor: '#FF0080', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}
                                        onPress={() => navigation.navigate('CrearTrato', { idArticulo: route.params.idArticulo, usuario: route.params.usuario })}>
                                        <Image
                                            style={{ width: 30, height: 30 }}
                                            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nenidealdm-76a8f.appspot.com/o/Icon%2Ftratoicono.png?alt=media&token=4cdeebe2-55d4-41cb-bf40-58805d910bc4' }} ></Image>

                                    </Pressable>

                                    <Pressable
                                        style={{ width: 50, height: 50, borderRadius: 100, backgroundColor: '#FF0080', alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}
                                        onPress={() => navigation.navigate('DetalleVendedor', { usuario: articulo.vendedor })}

                                    >
                                        <Image
                                            style={{ width: 30, height: 30 }}
                                            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nenidealdm-76a8f.appspot.com/o/Icon%2Fusuarioicinorosa.png?alt=media&token=8667a948-fa06-4598-b3af-f7757a7f4fb8' }} ></Image>
                                    </Pressable>
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                </ImageBackground>


            </SafeAreaProvider>

        </View >

    )
}

export default DetalleArticulo
const styles = StyleSheet.create({
    login: {
        marginTop: '-10%',
        width: '100%',
        height: '100%',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#FFFFFF90'
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
        height: 15,
        marginEnd: 10,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '50%',
        width: '90%',
        marginHorizontal: 20,
        marginTop: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'blue'

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
    Texto: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        color: 'while',
    },
    BotonRosa: {
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
        marginHorizontal: 80
    },
    BotonNaranja: {
        marginTop: 10,
        borderRadius: 10,
        width: 200,
        height: 40,
        color: "white",
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#F7BD56",
        borderColor: 'orange',
        borderWidth: 2,

    },
})