import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapboxWebView from "../MapboxView/index"
const MapViewScreen = ({route}) => {
    console.log(route.name)
  return (
    <MapboxWebView latitude={route?.params?.info?.latitude} longitude={route?.params?.info?.longitude} screenName={route.name}/>
  )
}

export default MapViewScreen

const styles = StyleSheet.create({})