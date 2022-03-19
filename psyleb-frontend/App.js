import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Login from './screens/Login'


export default function App() {
  return(
    <Login />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: 'black',
    backgroundColor: 'green',
    margin: 3,
  }
});
