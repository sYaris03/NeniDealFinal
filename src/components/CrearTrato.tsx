import { Alert, Image, ImageBackground, Modal, PermissionsAndroid, Platform, Pressable, ProgressViewIOS, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card } from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParam } from './NavConfig'
import { IArticulo } from '../models/IArticulo';
import firestore from '@react-native-firebase/firestore'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header as HeaderRNE, HeaderProps, Icon, ListItem } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@rneui/themed';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

const ImagenFondo = "https://png.pngtree.com/thumb_back/fw800/background/20210814/pngtree-pink-yellow-watercolor-gold-foil-polka-dot-wallpaper-background-image_762637.jpg"

type props = NativeStackScreenProps<RootStackParam, 'CrearTrato'>


const CrearTrato = ({ route, navigation }: props) => {
    const [latitud, setAltitud] = useState<number>(0);
    const [longitud, setLongitud] = useState<number>(0);
    const [modal, setModal] = useState(false);

    function addTrato() {
        console.log({ 
            articulo: route.params.idArticulo,
            comprador: route.params.usuario,
            vendedor: 'AOVB',
            fecha: date})
        // if(latitud != 0 && longitud != 0){
                firestore()
                .collection('Tratos')
                .add(
                    {
                        articulo: route.params.idArticulo,
                        comprador: route.params.usuario,
                        vendedor: 'AOVB',
                        fecha: date,
                        lugar:  new firestore.GeoPoint(latitud, longitud)
}
                )
                .then(() => {
                    // navigation.navigate('MisArticulos');
                    // Alert.alert(
                    //     "Articulo Nuevo",
                    //     "Se ha agregado un nuevo Recuerdo",
                    //     [{
                    //       text: "Aceptar", onPress: () => { }
                    //     }
                    //     ]
                    //   );
                });
        
        // }else{
        //     Alert.alert(
        //         "Faltan Datos",
        //         "Para guardar este deal se necesita un lugar",
        //         [{
        //           text: "Aceptar", onPress: () => { }
        //         }
        //         ]
        //       );
        // }
       
        
    }

    useEffect(() => {
        requestPermissions();
    }, [])
    function obtenerUbicacionActual() {


        Geolocation.getCurrentPosition(
            (position) => {
                //console.log(position.coords.);
                setAltitud(position.coords.latitude);
                setLongitud(position.coords.longitude);
                console.log(latitud);
                console.log(longitud);

            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            //{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )


    }

    async function requestPermissions() {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                obtenerUbicacionActual()
            }
        }
    }

    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState<any>('date')
    const [show, setShow] = useState(false)
    const [text, setText] = useState("")

    const [showCompleted, setShowCompleted] = useState(false);
    const [isHidden, setHidden] = useState(true);

    const onChange = (event, selectedDate) => {
        const completedDate = selectedDate || Date;
        setShowCompleted(Platform.OS === 'ios');
        setDate(selectedDate)
        setText(selectedDate)
    };

    function showDatepicker(type: string) {
        setMode(type)
        setShowCompleted(!showCompleted);
    };

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
                    centerComponent={{ text: 'Agendar Deal', style: styles.heading }}
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
                    
                            <Text>{text.toString()}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>

                                <Pressable
                                    onPress={() => { showDatepicker('date') }}
                                    style={{ width: 50, height: 50, borderRadius: 100, backgroundColor: '#ff0080', alignContent: 'center', alignItems:'center', justifyContent:'center' }}>
                                             <Image
                                                 style={{width: 30, height:30}}
                                                 source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nenidealdm-76a8f.appspot.com/o/Icon%2Fcalendarioicono.png?alt=media&token=c8ea4ac0-bb6f-41de-8743-4137b6a0d086' }} ></Image>
                                    </Pressable>
                                <Pressable
                                    onPress={() => { showDatepicker('time') }}
                                    style={{ width: 50, height: 50, borderRadius: 100, backgroundColor: '#ff0080', marginLeft: 20, alignContent: 'center', alignItems:'center', justifyContent:'center' }}>
                                             <Image
                                                 style={{width: 30, height:30}}
                                                 source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nenidealdm-76a8f.appspot.com/o/Icon%2Fhoraicono.png?alt=media&token=e1fcf776-cbf3-4575-9c35-ca2f247f92cd' }} ></Image>
                                    </Pressable>
                                <Pressable
                                    onPress={() => { setModal(true) }}
                                    style={{ width: 50, height: 50, borderRadius: 100, backgroundColor: '#ff0080', marginLeft: 20, alignContent: 'center', alignItems:'center', justifyContent:'center' }}>
                                             <Image
                                                 style={{width: 25, height:30}}
                                                 source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nenidealdm-76a8f.appspot.com/o/Icon%2Fubicacionicono.png?alt=media&token=0d8566fc-29b6-4fe0-835c-9fcd836b9d7e' }} ></Image>
                                    </Pressable>
                            </View>
                            {isHidden ? (
                                <View>
                                    {showCompleted && (
                                        <DateTimePicker
                                            testID='dateTimePicker'
                                            value={date}
                                            mode={mode}
                                            display='spinner'
                                            onChange={onChange}
                                        />
                                    )}
                                </View>
                            ) : null}

                            <Pressable
                                onPress={() => { addTrato() }}
                                style={[styles.BotonNaranja, { justifyContent: 'center', alignItems: 'center', }]}><Text>Aceptar</Text></Pressable>


                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modal}
                        // onRequestClose={() => {
                        //     Alert.alert("Modal has been closed.");
                        //     setModalVisible(!modalVisible);
                        // }}
                        >
                            <View style={{ width: '100%', height: '90%' }}>
                                <MapView
                                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                    style={styles.map}
                                    region={{
                                        latitude: latitud,
                                        longitude: longitud,
                                        latitudeDelta: 0.015,
                                        longitudeDelta: 0.0121,
                                    }}
                                    onMarkerDragEnd={(e) => {
                                        console.log(e.nativeEvent.coordinate),
                                            setAltitud(e.nativeEvent.coordinate.latitude),
                                            setLongitud(e.nativeEvent.coordinate.longitude)
                                    }}
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: latitud,
                                            longitude: longitud,
                                        }}
                                        title="Punto de reunión"
                                        description="Este será el punto de reunión."
                                        pinColor='pink'
                                        draggable={true}
                                    //onDragEnd = {(e) => {console.log(e.nativeEvent.coordinate)}}
                                    />
                                </MapView>
                            </View>
                            <Pressable onPress={() => { setModal(false) }}
                                style={{ height: '10%' }}><Text>A C E P T A R</Text></Pressable>

                        </Modal>
                    </ScrollView>
                </ImageBackground>

            </SafeAreaProvider>

        </View >
    )
}

export default CrearTrato

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
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})