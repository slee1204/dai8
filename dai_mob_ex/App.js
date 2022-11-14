
import { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View, Button } from 'react-native'


export default function App() {
  const [loading, setLoading] = useState(true);

  // pretend it's taking time to connect and retrieve data from a server/api
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
    }, 2000);
  },[])

  if (loading){
  return <LottieView
        autoPlay
        
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('./assets/loading.json')}
      />
  }

  return (
      <View style={styles.container}>
        <Button
          title="Restart Animation"
          onPress={() => {
            setLoading(true)
          }}
        />
      </View>
    )
  ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
