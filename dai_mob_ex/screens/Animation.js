//https://reactnavigation.org/docs/params
import { useState } from "react";
// import axios from "axios";

// import * as Animatable from 'react-native-animatable';
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import { View, Text, StatusBar, Button, ScrollView } from "react-native";

export default function Animation() {
  const [numMovies, setNumMovies] = useState(0);
  const [movies, setMovies] = useState([]);
  const [sel, setSel] = useState(0);

  const GetGhibliMovies = async () => {
    // location.href = "https://ghibliapi.herokuapp.com/films"
    //await means please wait for the line to finish before moving on the the next line
    const results = await axios.get("https://ghibliapi.herokuapp.com/films");

    console.log(results);
    setNumMovies(results.data.length);
    setMovies([...results.data]);

    // axios.get(...).then(results=>{})
    // numMovies = 0
  };

  return (
    <View>
      <Button
        onPress={() => GetGhibliMovies()}
        title="Get All Ghibli Movies"
      ></Button>
      <Text>There are # {numMovies} movies from the DB</Text>
      <StatusBar style="auto" />
      <ScrollView>
      {numMovies > 0 &&
        movies.map((o, i) => (
          <Animatable.View
            duration={1000}
            delay={1000*i}
            animation={{
            from:{
              opacity: 0
            },
            to:{
              opacity:1
            }
          }} >
          <Card>
            <Card.Title
              title={o.title}
              subtitle={o.original_title}
              left={LeftContent}
            />
            <Card.Content>
              <Paragraph>{o.description}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: o.image }} />
            <Card.Actions>
            </Card.Actions>
          </Card>
          </Animatable.View>
        ))}
      </ScrollView>
    </View>
  );
}
