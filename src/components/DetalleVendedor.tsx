import { Button, FlatList, Image, ImageBackground, Pressable, ScrollView, SnapshotViewIOS, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParam } from './NavConfig'
import { IUser } from '../models/IUser'
import firestore from '@react-native-firebase/firestore'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AirbnbRating, Card } from '@rneui/base'
import { Header as HeaderRNE, HeaderProps, Icon, ListItem } from '@rneui/themed';


const ImagenFondo = "https://png.pngtree.com/thumb_back/fw800/background/20210814/pngtree-pink-yellow-watercolor-gold-foil-polka-dot-wallpaper-background-image_762637.jpg"

type Props = NativeStackScreenProps<RootStackParam, 'DetalleVendedor'>;
const DetallesVendedor = ({ route, navigation }: Props) => {
    const [vendedores, setVendedores] = useState<IUser[]>([]);
    const [imagenPerfil, setImagenPerfil]=useState<any>("")

    useEffect(() => {
        getDetalleVendedor(route.params.usuario)
    }, [])

    async function getDetalleVendedor(id: string) {
        try {
            const subscriber = await firestore()
                .collection('Usuario')
                .where('usuario', '==', id)
                .onSnapshot(documentSnapshot => {

                    let UsuarioTemporal: IUser[] = [];
                    documentSnapshot.forEach(x => {
                        console.log(x.data());
                        let vendedor: IUser = {
                            id: x.id,
                            nombre: x.data().nombre,
                            apePaterno: x.data().apePaterno,
                            apeMaterno: x.data().apeMaterno,
                            usuario: x.data().usuario,
                            direccion: x.data().direccion,
                            contrasena: x.data().contrasena,
                            foto: x.data().foto,
                            calificacion: x.data().calificacion,
                        }
                        UsuarioTemporal.push(vendedor);
                        setImagenPerfil(vendedor.foto)
                    });
                    setVendedores(UsuarioTemporal);
                    
                });
            return subscriber;
        } catch (error) {
            console.error("Error");
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <SafeAreaProvider >
                <HeaderRNE
                    backgroundColor='#ff0080'
                    leftComponent={
                        <View style={styles.headerRight}>

                            <Pressable onPress={() => {
                                navigation.goBack();
                            }}>
                                <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nenidealdm-76a8f.appspot.com/o/Icon%2Fatrasicono.png?alt=media&token=f64b7e33-b6a4-49ba-9040-321bcf43af20' }} style={styles.Imagen} ></Image>
                            </Pressable>
                        </View>
                    }
                   
                    centerComponent={{ text: 'Vendedor', style: styles.heading }}
                />
                <ImageBackground source={{ uri: ImagenFondo }} resizeMode="cover"
                    style={{ width: '100%', height: 900 }} >

                    <FlatList
                        style={{ backgroundColor: 'pink' }}
                        data={vendedores}
                        renderItem={e => (
                    
                                <Card
                                >
                                    <Card.Title style={{ fontSize: 25, color: '#ff0080' }}>{e.item.usuario}</Card.Title>
                                    <Card.Divider />
                                     <Card.Image
                                        style={{ padding: 0, height: 350, borderRadius: 15, }}
                                        source={{
                                            uri:
                                               imagenPerfil
                                        }}
                                    /> 
                                    <View style={{ alignContent: 'center', alignItems: 'center', justifyContent:'center', flexDirection:'row' }}>
                                    <Text style={styles.Texto}>{e.item.nombre}</Text>
                                    <Text style={styles.Texto}> {e.item.apePaterno}</Text>
                                    <Text style={styles.Texto}> {e.item.apeMaterno}</Text>
                                    </View>
                                    <Text style={styles.Calificacion}>Calificación</Text>

                                    <AirbnbRating 
                                    isDisabled={true}
                                    defaultRating={e.item.calificacion}
                                    reviewColor={"#CD5C5C"}
                                    selectedColor={'#FA8072'}
                                     count={5}
                                     reviews={[
                                        'Muy malo',
                                       'Malo',
                                       'Regular',
                                       'Bueno',
                                       'Excelente',
                                       ]}/>
                                </Card>
                        )}
                    />
                </ImageBackground>
            </SafeAreaProvider>

        </View >

    )
}

export default DetallesVendedor

const styles = StyleSheet.create({
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
    Texto: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '500',
        color: 'black',
    },
    Calificacion: {
        marginTop: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        color: 'gray',
    },
})

