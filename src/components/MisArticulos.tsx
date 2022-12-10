import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header as HeaderRNE, HeaderProps, Icon, ListItem } from '@rneui/themed';
import { RootStackParam } from './NavConfig';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore'
import { IArticulo } from '../models/IArticulo';

type Props = NativeStackScreenProps<RootStackParam, 'MisArticulos'>;
const MisArticulos = ({ navigation, route }: Props) => {
  const [articulos, setArticulos] = useState<any>([]);

  useEffect(() => {
    getData(route.params.usuario);
  }, [])

  function deleteArticulo(id: string) {
    Alert.alert(
      "Eliminar Artículo",
      "Estas segur@ de querer eliminar este artículo?",
      [{
        text: "Aceptar", onPress: () => {
          firestore()
            .collection('Articulos')
            .doc(id)
            .delete()
            .then(() => {
              getData(route.params.usuario)
              Alert.alert(
                "Eliminado",
                "Se ha eliminado correctamente el artículo",
                [{
                  text: "Aceptar", onPress: () => { }
                }
                ]
              );
            });
        }
      },
      {
        text: "Cancelar", onPress: () => { }
      }
      ]
    );


  }

  async function getData(usuario : string) {
    try {
      const subscriber = await firestore()
        .collection('Articulos')
        //.doc('ctajxb6qwyl90mUZ9Txg')
        .where('vendedor', '==', usuario)
        .onSnapshot(documentSnapshot => {
          // console.log('Produto: ', documentSnapshot.data());
          let articulosTemporal: IArticulo[] = [];
          documentSnapshot.forEach(x => {
            console.log(x.data().precio);
            let articulo: IArticulo = {
              id: x.id,
              titulo: x.data().titulo,
              descripcion: x.data().descripcion,
              precio: x.data().precio,
              vendedor: x.data().vendedor,
              urlImg: x.data().urlImg,
            }
            articulosTemporal.push(articulo);
          });
          setArticulos(articulosTemporal);
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
                navigation.goBack()
              }}>
                <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nenidealdm-76a8f.appspot.com/o/Icon%2Fatrasicono.png?alt=media&token=f64b7e33-b6a4-49ba-9040-321bcf43af20' }} style={styles.Imagen} ></Image>
              </Pressable>
            </View>
          }
          centerComponent={{ text: 'Mis Artículos', style: styles.heading }}
        />
        <View style={[styles.BotonRosa, { justifyContent: 'center', alignItems: 'center', }]}>
          <Pressable onPress={() => {
            navigation.navigate('CrearArticulo', {usuario: route.params.usuario})
          }}>
            <Text style={{ fontWeight: '700', fontSize: 17 }}>Nuevo Artículo</Text>
          </Pressable>
        </View>

        <FlatList
          style={{ backgroundColor: 'pink' }}
          data={articulos}
          renderItem={e => (

            <ListItem.Swipeable

              rightContent={(reset) => (
                <Button
                  title="Eliminar"
                  onPress={() => deleteArticulo(e.item.id)}
                  buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                />
              )}
            >
              <ListItem.Content>

                <Pressable style={{
                  width: '100%',
                  height: 120,
                  borderWidth: 2,
                  borderColor: '#ff0080',
                  borderRadius: 10,
                  marginLeft: 4,
                }}
                  onPress={() => navigation.navigate('DetalleArticulo', { idArticulo: e.item.id, usuario: route.params.usuario })}
                >
                  <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ width: '33%', alignItems: 'center' }}>
                      <Image
                        style={{ width: 100, height: 100, borderRadius: 100 }}

                        source={{
                          uri: e.item.urlImg
                        }}
                      />
                    </View>
                    <View style={{ width: '66%', height: 120, alignContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 17, color: '#ff0080' }}>{e.item.titulo}</Text>
                      <Text style={{ fontSize: 16, color: 'black', textAlign: 'justify' }}>{e.item.descripcion.substring(0, 50)}...</Text>
                      <Text style={{ fontSize: 25, color: 'darkorange', textAlign: 'justify' }}>{Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}).format(e.item.precio)}</Text>
                    </View>
                  </View>
                </Pressable>


              </ListItem.Content>
            </ListItem.Swipeable>
          )}
        />
      </SafeAreaProvider>

    </View >
  )
}

export default MisArticulos

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
  BotonRosa: {
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
    marginHorizontal: 80
  },
})