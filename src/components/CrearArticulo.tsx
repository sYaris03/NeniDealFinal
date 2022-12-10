import { Alert, FlatList, Image, ImageBackground, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header as HeaderRNE, HeaderProps, Icon, ListItem } from '@rneui/themed';
import { RootStackParam } from './NavConfig';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore'
import { IArticulo } from '../models/IArticulo';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';


const ImagenFondo = "https://png.pngtree.com/thumb_back/fw800/background/20210814/pngtree-pink-yellow-watercolor-gold-foil-polka-dot-wallpaper-background-image_762637.jpg"
const ImagenDefault = "https://cdn.pixabay.com/photo/2016/03/21/20/05/image-1271454_960_720.png"

type Props = NativeStackScreenProps<RootStackParam, 'CrearArticulo'>;
const CrearArticulo = ({ navigation, route }: Props) => {
    const articuloInicial: IArticulo = {
        id: "",
        titulo: "",
        descripcion: "",
        precio: 0,
        vendedor: "",
        urlImg: ""
    }

    useEffect(() => {
        setFoto(ImagenDefault)
    }, [])


    const [articulo, setArticulo] = useState<IArticulo>(articuloInicial);

    const [foto, setFoto] = useState(ImagenDefault);

    const uploadImage = async (foto: string) => {
        const filename = foto?.substring(foto.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? foto?.replace('file://', '') : foto
        const imageName = filename;//getUniqueId();
        const imagePath = uploadUri;//'images/' + imageName + '.jpg';
        var reference = storage().ref(filename);
        const task = reference.putFile(uploadUri);
        task.on('state_changed', taskSnapshot => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
        });
        task.then(async () => {
            console.log('Image uploaded to the bucket!');
            const mDownloadUrl = await storage()
                .ref(filename)
                .getDownloadURL();
            setFoto(mDownloadUrl);
        });
    }

    function addArticulo() {
        if (foto != ImagenDefault) {
            uploadImage(foto);
            if (foto != "") {
                firestore()
                    .collection('Articulos')
                    .add(
                        {
                            titulo: articulo.titulo,
                            descripcion: articulo.descripcion,
                            precio: articulo.precio,
                            vendedor: route.params.usuario,
                            urlImg: foto
                        }
                    )
                    .then(() => {
                        setArticulo(articuloInicial);
                        setFoto(ImagenDefault);
                        navigation.goBack();
                        Alert.alert(
                            "Articulo Nuevo",
                            "Se ha agregado un nuevo Recuerdo",
                            [{
                                text: "Aceptar", onPress: () => { }
                            }
                            ]
                        );
                    });
            } else {
                Alert.alert(
                    "Falta una Foto",
                    "Para guardar tu recuerdo debe existir una foto",
                    [{
                        text: "Aceptar", onPress: () => { }
                    }
                    ]
                );
            }
        } else {
            Alert.alert(
                "Falta una Foto",
                "Para guardar tu artículo debe existir una foto",
                [{
                    text: "Aceptar", onPress: () => { }
                }
                ]
            );
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
                                navigation.goBack()
                            }}>
                                <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nenidealdm-76a8f.appspot.com/o/Icon%2Fatrasicono.png?alt=media&token=f64b7e33-b6a4-49ba-9040-321bcf43af20' }} style={styles.Imagen} ></Image>
                            </Pressable>
                        </View>
                    }
                    centerComponent={{ text: 'Nuevo Artículo', style: styles.heading }}
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
                            <View>
                                <Text style={styles.Texto}>Titulo</Text>
                                <TextInput style={styles.Input}
                                    onChangeText={(text) => setArticulo({ ...articulo, titulo: (text) })}
                                    placeholder="Titulo"></TextInput>
                            </View>
                            <View>
                                <Text style={styles.Texto}>Descripción</Text>
                                <TextInput style={styles.Input}
                                    onChangeText={(text) => setArticulo({ ...articulo, descripcion: (text) })}
                                    placeholder="Descripción"
                                ></TextInput>
                            </View>
                            <View>
                                <Text style={styles.Texto}>Precio</Text>
                                <TextInput style={styles.Input}
                                    onChangeText={(text) => setArticulo({ ...articulo, precio: (parseFloat(text)) })}
                                    keyboardType='numeric'
                                    placeholder="0.00"
                                ></TextInput>
                            </View>
                            <Pressable onPress={(e) => {
                                ImagePicker.openCamera({
                                    width: 300,
                                    height: 400,
                                    cropping: true,
                                }).then(image => {
                                    //console.log(image.path);
                                    setFoto(image.path)

                                });
                            }}
                                style={{ width: 50, height: 50, borderRadius: 100, backgroundColor: '#FF0080', marginLeft: '80%', alignContent:'center', alignItems:'center', justifyContent:'center' }}>
                                <Image
                                    style={{ width: 30, height: 27 }}
                                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nenidealdm-76a8f.appspot.com/o/Icon%2Fcamaraicono.png?alt=media&token=08b5b403-9118-4c25-ac3d-3613e1b5ad6a' }} ></Image>
                            </Pressable>
                            <View>  
                                <Image
                                    style={{ width: 170, height: 170, borderRadius: 100 }}

                                    source={{
                                        uri: foto
                                    }}
                                />
                            </View>
                            <View style={[styles.BotonRosa, { justifyContent: 'center', alignItems: 'center', }]}>

                                <Pressable onPress={() => {
                                    addArticulo()
                                }}>
                                    <Text style={{ fontWeight: '700', fontSize: 17 }}>Agregar</Text>
                                </Pressable>
                            </View>
                            <View style={[styles.BotonNaranja, { justifyContent: 'center', alignItems: 'center', }]}>

                                <Pressable onPress={() => {
                                    setFoto(ImagenDefault)
                                    navigation.goBack()
                                }}>
                                    <Text style={{ fontWeight: '700', fontSize: 17 }}>Cancelar</Text>
                                </Pressable>
                            </View>


                        </View>
                    </ScrollView>
                </ImageBackground>


                {/* </ImageBackground > */}
            </SafeAreaProvider>

        </View >
    )
}

export default CrearArticulo

// const styles = StyleSheet.create({
//     heading: {
//         color: 'white',
//         fontSize: 22,
//         fontWeight: 'bold',
//     },
//     headerRight: {
//         display: 'flex',
//         flexDirection: 'row',
//         marginTop: 5,
//     },
//     Boton: {
//         marginTop: 10,
//         borderRadius: 10,
//         width: 200,
//         height: 40,
//         color: "white",
//         lineHeight: 84,
//         fontWeight: "bold",
//         textAlign: "center",
//         backgroundColor: "pink",
//         borderColor: '#ff0080',
//         borderWidth: 2,

//     },
//     Contenedor: {
//         backgroundColor: '#ffff',
//         flex: 1,
//     },
//     login: {
//         width: 350,
//         height: '100%',
//         borderColor: 'white',
//         borderWidth: 2,
//         borderRadius: 10,
//         padding: 10,
//         alignItems: 'center',
//         backgroundColor: '#FFFFFF90'
//     },
//     Imagen: {
//         width: '100%',
//         height: '85%',
//     },
//     Input: {
//         width: 300,
//         height: 40,
//         borderColor: 'white',
//         borderBottomColor: '#ff0080',
//         borderWidth: 2,
//         borderRadius: 10,
//         padding: 10,
//         marginVertical: 10,
//         backgroundColor: '#ffffff90',
//         marginBottom: 20,
//     },
//     ProfileUsser: {
//         width: 140,
//         height: 140,
//         marginTop: 5,
//         borderWidth: 3,
//         marginBottom: 10,
//     },
//     Texto: {
//         marginTop: 10,
//         textAlign: 'center',
//         fontSize: 18,
//         fontWeight: '500',
//         color: 'gray',
//     },
//     Titulo: {
//         flex: 1,
//         fontSize: 30,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         margin: "10%",
//     },

// })
const styles = StyleSheet.create({
    login: {
        width: 350,
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
        marginEnd: 10
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