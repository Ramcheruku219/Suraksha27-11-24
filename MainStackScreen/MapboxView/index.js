import React, { useState, useEffect, useRef } from "react";
import { View, Button, StyleSheet, Alert, Pressable, Text, Dimensions, Modal } from "react-native";
import { WebView } from "react-native-webview";
import Fontisto from '@expo/vector-icons/Fontisto';
import * as Location from "expo-location";
import Ionicons from '@expo/vector-icons/Ionicons';
import HtmlGenerator from "./HtmlGenerator";
const { width, height } = Dimensions.get("window")

const MapboxWebView = (props) => {
  const [location, setLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const webViewRef = useRef(null);
  const [finalLayer, setFinalLayer] = useState()

  useEffect(() => { handleLayers("", props && props) }, [])

  const [layerList, setLayerList] = useState([
    { Title: "Chaurahas", layer: "vscl:chaurahas", status: false },
    { Title: "Drainages", layer: "vscl:drainages", status: false },
    { Title: "Govt Offices", layer: "vscl:govt_offices", status: false },
    { Title: "Kooda Ghars", layer: "vscl:kooda_ghars", status: false },
    { Title: "Zone Boundaries", layer: "vscl:muncipal_boundaries", status: false },
    { Title: "Park Garden Outers", layer: "vscl:park_garden_outers", status: false },
    { Title: "Park Gardens", layer: "vscl:park_gardens", status: false },
    { Title: "Property Consumers", layer: "vscl:property_consumers", status: false },
    { Title: "Railway Lines", layer: "vscl:railway_lines", status: false },
    { Title: "Road Outers", layer: "vscl:road_outers", status: false },
    // { Title: "Road Street Networks", layer: 'vscl:road_street_networks' ,status:false},
    { Title: "Road Street Networks", layer: "vscl:view_road_street_networks", status: false },
    { Title: "Sewer Lines", layer: "vscl:sewer_lines", status: false },
    { Title: "Ward Boundaries", layer: "vscl:ward_boundaries", status: false },
    { Title: "Water Supply Networks", layer: "vscl:water_supply_networks", status: false },
    {
      Title: "Water Supply Pumping Station", layer: "vscl:water_supply_pumping_station", status: false
    },
    { Title: "OHSR", layer: "vscl:ohts", status: false },
    { Title: "ESRI", layer: "0", type: "ESRI", status: false },
  ]);

  const handleLayers = async (uintLayer, unitLocation) => {
    setLayerList(((pre) => {
      let temp = [...pre].map(item => {
        if (item.layer == uintLayer) {
          item.status = !item.status
        }
        return item
      })
      // setFinalLayer(await HtmlGenerator(temp,unitLocation))
      return temp

    }))
    setFinalLayer(await HtmlGenerator(layerList, unitLocation))

  }
  //   useEffect(() => {
  //     const getLocationPermission = async () => {
  //       let { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== "granted") {
  //         Alert.alert("Permission denied");
  //         return;
  //       }

  //       // Get current location
  //       let currentLocation = await Location.getCurrentPositionAsync({});
  //       setLocation(currentLocation.coords);
  //     };

  //     getLocationPermission();
  //   }, []);

  //   const sendLocationToWebView = () => {
  //     if (webViewRef.current && location) {
  //       const jsCode = `updateLocation(${location.latitude}, ${location.longitude});`;
  //       webViewRef.current.injectJavaScript(jsCode);
  //     }
  //   };

  return (
    <View style={styles.container}>
      {/* <Button title="Send Location" onPress={sendLocationToWebView} /> */}

      <WebView
        // ref={webViewRef}
        source={finalLayer}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
      />
      {/* {props.screenName=="Map Information" && <View style={{ height:height*.3, flexDirection: "row", gap: 10,flexWrap:"wrap" ,justifyContent:"center",alignItems:"center"}}>
        {layerList.map((item, index) => {
          return (
            <Pressable key={index} onPress={()=>handleLayers(item.layer,props)}style={styles.selectLayer}>
              <Text style={styles.text}>{item.layer.slice(5).replace("_"," ")}</Text>
            </Pressable>
          );
        })}
      </View> } */}
      {
        (props.screenName == "Map Information") && <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.selectLayer}>
          <Ionicons name="layers" size={30} color="#ff8000" />

        </Pressable>
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", alignItems: "center", elevation: 5 }}>
          <View style={{ minHeight: 200, width: "70%", backgroundColor: "white", borderRadius: 10, padding: 10 }}>
            <View style={{ gap: 10, }}>
              {layerList.map((item, index) => {
                return (
                  <Pressable key={index} onPress={() => handleLayers(item.layer, props)} style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: .3, paddingBottom: 5 }}>
                    <View style={{ height: 15, width: 15, borderWidth: 1.1, justifyContent: "center", alignItems: "center", backgroundColor: item.status ? "green" : "white" }}>
                      {
                        item.status && <Fontisto name="check" size={7} color={item.status ? "white" : "black"} />
                      }

                    </View>
                    <Text style={{ marginLeft: 10 }}>{item.layer.slice(5).replaceAll("_", " ") || item.Title}</Text>
                  </Pressable>
                );
              })}
              <Pressable onPress={() => setModalVisible(false)} style={{ alignSelf: "center", padding: 5, paddingHorizontal: 10, backgroundColor: "green", borderRadius: 5, elevation: 5 }}>
                <Text style={{ color: "white" }}>
                  Apply Layers

                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  webview: {
    flex: 1,
    // height:height*.7,
    // marginBottom: 20,
  },
  selectLayer: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#fff",
    padding: 5,
    elevation: 5,
    borderRadius: 10,

  },
});

export default MapboxWebView;

