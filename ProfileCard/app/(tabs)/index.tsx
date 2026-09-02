import {  View ,Text, StyleSheet, Image } from 'react-native';

export default function HomeScreen() {
  return (
// view(reactNative) = div(html)
// You NEED to have a div (View in React Native) for stuff to show up
    <View style= {styles.container}> 
      

      <View style = {styles.card}>
        <Image 
        style={styles.profileImage}
        source={{uri: "https://picsum.photos/200"}}/>
        <Text style={styles.name}>Chidi</Text>
        <Text style={styles.bio}>Bio:{"\n"}
           Lorem .</Text>
        <View style={styles.facts}>
        <Text style={styles.fact}>• I am a Software Developer</Text>
        <Text style={styles.fact}>• I love coding</Text>
        <Text style={styles.fact}>• I enjoy learning new technologies</Text>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#eee',
    flex: 1,
    padding: 50,
    alignItems: 'center',
  },
  name:{
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
  },
  card:{
    padding: 20,
    backgroundColor: 'white',
    minHeight: 100,
    minWidth: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  bio:{
    color: 'gray',
    fontSize: 14,
    textAlign: 'center',
  },
  facts:{
    width: "100%",
    gap: 5,
  },
  fact:{
    fontSize: 15,
  }

});
