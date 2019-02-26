import React from 'react';
import { StyleSheet, Text, View, Image, YellowBox} from 'react-native';
import FontLoad from './components/FontLoad';
import { createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import Checkout from './screens/Checkout';
import DriverSearch from './screens/DriverSearch';
import Login from './screens/Login';
import Notifications from './screens/Notifications';
import Completed from './screens/OrderComplete';
import Rating from './screens/Rating';
import Register from './screens/Register';
import RequestProfile from './screens/RequestProfile';
import SearchingRequest from './screens/SearchingRequest';
import ShoppingList from './screens/ShoppingList';
import ShopSearch from './screens/ShopSearch';
import Welcome from './screens/Welcome';
import YourCart from './screens/YourCart';

YellowBox.ignoreWarnings([
  'Require cycle:',
]);

FontLoad.then((res) => {
 })

const shopStackNavigator = createStackNavigator({
  ShopSearch: {
    screen: ShopSearch
  },
  Checkout: {
    screen: Checkout
  },
  YourCart: {
    screen: YourCart
  },
  OrderComplete: {
    screen: Completed
  },
  Rating: {
    screen: Rating
  },
});

const driverStackNavigator = createStackNavigator({
  DriverSearch: {
    screen: DriverSearch
  },
  SearchingRequest: {
    screen: SearchingRequest
  },
  RequestProfile: {
    screen: RequestProfile
  },
  ShoppingList: {
    screen: ShoppingList
  },
  Rating: {
    screen: Rating
  },
});

const TabNavigator = createBottomTabNavigator({
  ShopSearch: shopStackNavigator,
  Notifications: Notifications,
  DriverSearch: driverStackNavigator,
},
{
defaultNavigationOptions: ({ navigation }) => ({
  tabBarIcon: ({ focused }) => {
    const { routeName } = navigation.state;
    let imageName;
    if (routeName === 'ShopSearch') {
      imageName = require('./assets/images/nav-cart.png');
      if (focused) {
        imageName = require('./assets/images/filled_cart.png');
      }
    } else if (routeName === 'Notifications') {
      imageName = require('./assets/images/home_icon.png');
      if (focused) {
        imageName = require('./assets/images/filled_house.png');
      }
    } else if (routeName === 'DriverSearch') {
      imageName = require('./assets/images/person_w_bag.png');
      if (focused) {
        imageName = require('./assets/images/filled_person.png');
      }
    } 
    return <Image source={imageName} style={{width: 46, height: 42.99, marginTop:25}} />;
  },
}),
tabBarOptions: {
  showLabel: false,
},
}
);

export default createAppContainer(TabNavigator);

// class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       fontLoaded: false,
//     }
//   }

//   componentWillMount = () => {
//     FontLoad.then((res) => {
//       this.setState({ fontLoaded: true });
//     })
//   }

//   render() {
//     return (
//       this.state.fontLoaded ? (
//         <View style={styles.container}>
//           <Text>Open up App.js to start working on your app!</Text>
//         </View>
//     ) : null
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
  
// });

