import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "../components/Icon";
import * as WebBrowser from "expo-web-browser";

import { MonoText, TitleText } from "../components/StyledText";
const { width } = Dimensions.get("window");

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  componentDidMount() {
    return fetch(
      "https://cors-anywhere.herokuapp.com/roo-api-sandbox.deliveroo.net/restaurants",
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
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image
            source={require("../assets/images/roo-logo.png")}
            style={styles.welcomeImage}
          />
        </View>

        <FlatList
          contentContainerStyle={styles.contentContainer}
          style={{ paddingBottom: 10 }}
          data={this.state.dataSource.slice(1, 10)}
          renderItem={({ index, item }) => {
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
                        uri: ting[item.restaurant_branches[key].image[0]]
                      }}
                      style={styles.restaurantImage}
                    />
                    <View style={styles.restaurantBodyContainer}>
                      <Text style={styles.restaurantName}>
                        {item.restaurant_org}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Icon name="md-star" size={18} color="#11cc55" />
                        <Text style={{ fontSize: 15, color: "#11cc55" }}>
                          {` `}
                          {item.restaurant_branches[key].rating}
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
    width: 140,
    height: 140,
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
