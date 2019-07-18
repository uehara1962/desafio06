// import React from 'react';
// import { StyleSheet, Text, View} from 'react-native';

// import './config/ReactotronConfig'

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },

// });

// // console.tron.log('Hello World')
// // console.tron.warn('Hello World')

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcome}>Welcome to React Native!</Text>
//     </View>
//   );
// }

//S>----------------------------------------------------------------------------------------<//

// import React from 'react';
// import { View} from 'react-native';

// import './config/ReactotronConfig'

// // console.tron.log('Hello World')
// // console.tron.warn('Hello World')

// export default function App() {
//   return (
//     <View />
//   );
// }

//S>----------------------------------------------------------------------------------------<//

import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig'

import Routes from './routes'
// console.tron.log('Hello World')
// console.tron.warn('Hello World')

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
      <Routes />
    </>
  );
}
