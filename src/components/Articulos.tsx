import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header as HeaderRNE, HeaderProps, Icon, ListItem } from '@rneui/themed';
import { RootStackParam } from './NavConfig';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore'
import { IArticulo } from '../models/IArticulo';


type Props = NativeStackScreenProps<RootStackParam, 'Articulos'>;
const Articulos = ({ navigation, route }: Props) => {
  const [articulos, setArticulos] = useState<IArticulo[]>([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    getData();
  }, [])

  async function getData() {
    try {
      const subscriber = await firestore()
        .collection('Articulos')
        //.where('vendedor','!=',route.params.usuario)
        .orderBy('titulo').startAt(filtro).endAt(filtro+'\uf8ff')
        //.doc('ctajxb6qwyl90mUZ9Txg')
        .onSnapshot(documentSnapshot => {
          let articulosTemporal: IArticulo[] = [];
          documentSnapshot.forEach(x => {
            console.log(x.data());
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
          centerComponent={{ text: 'Artículos', style: styles.heading }}
        />
        <View style={{alignContent:'center', alignItems:'center',  backgroundColor: '#ffff',}}>
          <TextInput style={styles.Input}
            onChangeText={(text) => {
            setFiltro(text)
            getData()
            }}
            placeholder="Filtrar"></TextInput>
        </View>

        <FlatList
          style={{ backgroundColor: 'pink' }}
          data={articulos}
          renderItem={e => (

            <ListItem.Swipeable>
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

export default Articulos

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
    backgroundColor: "pink",
    borderColor: '#ff0080',
    borderWidth: 2,
    marginHorizontal: 80
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
})