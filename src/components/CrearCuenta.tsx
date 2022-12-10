import { Alert, Image, ImageBackground, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParam } from './NavConfig'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

import { IUser } from '../models/IUser';

import firestore from '@react-native-firebase/firestore';
type Props = NativeStackScreenProps<RootStackParam, 'CrearCuenta'>;

const CrearCuentaComponent = ({ navigation }: Props) => {

  const [imagenload, setImagenLoad] = useState<boolean>(false)
  const ImagenDefault = "https://cdn.pixabay.com/photo/2016/03/21/20/05/image-1271454_960_720.png"
  const ImagenFondo = "https://png.pngtree.com/thumb_back/fw800/background/20210814/pngtree-pink-yellow-watercolor-gold-foil-polka-dot-wallpaper-background-image_762637.jpg"
  const [foto, setFoto] = useState("");

  const usuarioInicial: IUser = {
    id:"",
    nombre: "",
    apePaterno: "",
    apeMaterno: "",
    direccion: "",
    usuario: "",
    contrasena: "",
    foto: "",
    calificacion:0
  }
  useEffect(() => {
    setFoto(ImagenDefault)
  }, [])
  const [usuario, setUsuario] = useState<IUser>(usuarioInicial);

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
  function addUsuario() {
    if (foto != "") {
      uploadImage(foto);
      firestore()
        .collection('Usuario')
        .add(
          {
            nombre: usuario.nombre,
            apePaterno: usuario.apePaterno,
            apeMaterno: usuario.apeMaterno,
            direccion: usuario.direccion,
            usuario: usuario.usuario,
            contrasena: usuario.contrasena,
            foto: foto,
            calificacion:0
          }
        )
        .then(() => {
          setUsuario(usuarioInicial);
          setFoto(ImagenDefault);
          navigation.navigate('InicioSesion');
          Alert.alert(
            "Nuevo Usuario",
            "Bienvenido",
            [{
              text: "Aceptar", onPress: () => { }
            }
            ]
          );
        });
    } else {
      Alert.alert(
        "Falta una Foto",
        "Tome un foto para terminar el registro",
        [{
          text: "Aceptar", onPress: () => { }
        }
        ]
      );
    }

  }


  return (
    <ScrollView>
      <ImageBackground source={{ uri: ImagenFondo }} resizeMode="cover"
        style={{ width: '100%', height: 900 }} >
        <View style={styles.contenerdor}>
          <View style={{ alignContent: 'center', justifyContent: 'center', marginTop: '10%' }}>
            <View style={{ borderRadius: 100, width: 150, height: 150, alignItems: 'center', justifyContent: 'center' }}>
              <Pressable onPress={(e) => {
                ImagePicker.openCamera({
                  width: 300,
                  height: 400,
                  cropping: true,
                }).then(image => {
                  setFoto(image.path)
                });
              }}>
                <Image source={{ uri: ImagenDefault }} style={styles.Imagen} ></Image>
              </Pressable>
            </View>
          </View>
          <View>
            <Text style={[styles.Texto, { marginTop: '8%' }]}>Nombre</Text>
            <TextInput style={styles.Input}
              onChangeText={(text) => setUsuario({ ...usuario, nombre: (text) })}
              placeholder="Nombre"></TextInput>
          </View>
          <View>
            <Text style={styles.Texto}>Apellido Paterno</Text>
            <TextInput style={styles.Input}
              onChangeText={(text) => setUsuario({ ...usuario, apePaterno: (text) })}
              placeholder="Apellido Paterno"></TextInput>
          </View>
          <View>
            <Text style={styles.Texto}>Apellido Materno</Text>
            <TextInput style={styles.Input}
              onChangeText={(text) => setUsuario({ ...usuario, apeMaterno: (text) })}
              placeholder="Apellido Materno"></TextInput>
          </View>
          <View>
            <Text style={styles.Texto}>Dirección</Text>
            <TextInput style={styles.Input}
              onChangeText={(text) => setUsuario({ ...usuario, direccion: (text) })}
              placeholder="Calle ..."></TextInput>
          </View>
          <View>
            <Text style={styles.Texto}>Usuario</Text>
            <TextInput style={styles.Input}
              onChangeText={(text) => {
                //setCorreo(text)
                setUsuario({ ...usuario, usuario: (text) })
              }}
              //onChangeText={(text) => setCorreo(text)}
              placeholder="User12"></TextInput>
          </View>
          <View>
            <Text style={styles.Texto}>Contraseña</Text>
            <TextInput style={styles.Input}
              onChangeText={(text) => {
                //setContrasena(text)
                setUsuario({ ...usuario, contrasena: (text) })
              }}
              //onChangeText={(text) => setContrasena(text)}
              placeholder="Contraseña"
              secureTextEntry={true}></TextInput>
          </View>
          {/* <View>
          <Text style={styles.Texto}>Confirmar contraseÃ±a</Text>
          <TextInput style={styles.Input}
            onChangeText={(text) => setConfiContrasena(text)}
            placeholder="Confirmar ContraseÃ±a"
            secureTextEntry={true}></TextInput>
        </View> */}
          <View style={[styles.Boton, { justifyContent: 'center', alignItems: 'center', }]}>

            <Pressable onPress={() => {
              addUsuario()
            }}>
              <Text style={{ fontWeight: '700', fontSize: 17 }}>Crear cuenta</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  )
}

export default CrearCuentaComponent

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
  contenerdor: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Imagen: {
    width: 120,
    height: 120,
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
    color: 'gray',
  },
  Camara: {
    width: 80,
    height: 80,
    //marginBottom: 5, 
    //marginTop:15
  },
  Circulo: {
    backgroundColor: '#454545',
    width: 100,
    height: 100,
    borderRadius: 100,
    margin: 15,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
})
