import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "../components/Icon";
import * as WebBrowser from "expo-web-browser";

import { MonoText, TitleText } from "../components/StyledText";
const { width } = Dimensions.get("window");

const emojiMappings = {
  "🌽":
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=40",
  "🍔":
    "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=40",
  "🍤":
    "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=40",
  "🥖":
    "https://images.unsplash.com/photo-1521986329282-0436c1f1e212?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=40",
  "🍟":
    "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=40",
  "🍱":
    "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=40",
  "🥡":
    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=40",
  "🥞":
    "https://images.unsplash.com/photo-1541288097308-7b8e3f58c4c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=40",
  "🥟":
    "https://images.unsplash.com/photo-1545668855-b923f0176935?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=40",
  "🥐":
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=40"
};

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, text: "" };
  }
  componentDidMount() {
    return fetch(
      // "https://cors-anywhere.herokuapp.com/roo-api-sandbox.deliveroo.net/restaurants",
      "https://roo-api-sandbox.deliveroo.net/restaurants",
      {
        headers: {
          "api-key": "4578fa93-d005-4375-b7e1-6ce620d183d0",
          origin: "localhost"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, margin: 10 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", paddingTop: 20 }}>
          <Image
            source={require("../assets/images/roo-logo.png")}
            style={styles.welcomeImage}
          />
          <TextInput
            style={{
              height: 40,
              width: width * 0.88,
              backgroundColor: "#eee",
              padding: 5,
              borderRadius: 5,
              marginBottom: 5
            }}
            placeholder="Search..."
            onChangeText={text => this.setState({ text })}
          />
        </View>

        <FlatList
          contentContainerStyle={styles.contentContainer}
          style={{ paddingBottom: 10 }}
          data={this.state.dataSource
            .filter(
              item =>
                (item.restaurant_branches[
                  Object.keys(item.restaurant_branches)[0]
                ].status[0] === "OPEN" &&
                  item.restaurant_org.includes(this.state.text)) ||
                (this.state.text !== "" &&
                  item.restaurant_org.includes(this.state.text))
            )
            .slice(1, 10)}
          renderItem={({ item }) => {
            var key = Object.keys(item.restaurant_branches)[0];
            console.log(item.restaurant_branches[key].image[0]);
            return (
              <View style={styles.restaurantLinkContainer}>
                <View style={styles.restaurantContainer}>
                  <TouchableOpacity
                    onPress={handleHelpPress}
                    style={styles.helpLink}
                  >
                    <Image
                      source={{
                        uri:
                          emojiMappings[item.restaurant_branches[key].image[0]]
                      }}
                      style={styles.restaurantImage}
                    />
                    <View style={styles.restaurantBodyContainer}>
                      <Text style={styles.restaurantName}>
                        {item.restaurant_org}
                        {item.restaurant_branches[key].status[0] == "CLOSED" &&
                          "  (CLOSED)"}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Icon
                          name="md-star"
                          size={18}
                          color={
                            item.restaurant_branches[key].rating > 4
                              ? "#01ab4d"
                              : "#ffa502"
                          }
                        />
                        <Text
                          style={{
                            fontSize: 15,
                            color:
                              item.restaurant_branches[key].rating > 4
                                ? "#01ab4d"
                                : "#ffa502"
                          }}
                        >
                          {` `}
                          {item.restaurant_branches[key].rating}
                          {item.restaurant_branches[key].rating > 4
                            ? " Excellent"
                            : " Good"}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          keyExtractor={item => Object.keys(item.restaurant_branches)[0]}
        />
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change"
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingBottom: 20
  },
  welcomeContainer: {
    backgroundColor: "#fff0",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 0
  },
  welcomeImage: {
    width: 40,
    height: 40,
    resizeMode: "contain"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  navigationFilename: {
    marginTop: 5
  },
  restaurantLinkContainer: {
    marginTop: 5,
    alignItems: "center"
  },
  restaurantContainer: {
    alignItems: "center",
    backgroundColor: "#eee",
    width: 0.95 * width,
    height: 200,
    padding: 0,
    borderRadius: 10
  },
  restaurantImage: {
    resizeMode: "cover",
    width: 0.95 * width,
    height: 130,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  restaurantBodyContainer: {
    padding: 8
  },
  restaurantName: {
    fontSize: 22,
    color: "#111",
    fontFamily: "cirque"
  }
});
