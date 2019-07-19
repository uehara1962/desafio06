import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview';

export default function Repository ({ navigation }) {

  // console.tron.log(navigation.getParam('repository'))
  const uri = navigation.getParam('repository')

  return (
    <WebView
      source={{ uri: uri }}
      style={{ marginTop: 20 }}
    />
  )
}

Repository.navigationOptions = {
  title: 'Repository',
}