import React from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator} from 'react-native';
import firebase from 'firebase';

const window = Dimensions.get("window")
const database = firebase.database();
var newDeliveryKey = firebase.database().ref().child('ChildAdded').push().key
beenAccepted = database.ref('deliveries/' + 'delivery'+newDeliveryKey).getValue()

export default class LoadingScreen extends React.Component {
  static navigationOptions = {
    header: null,
    };

  timeout = () => {
    this.props.navigation.navigate('ShopSearch')
    }

  componentWillMount() {
    timerId = setTimeout(() => this.timeout(), 15000);
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.mainView}>
              <View style={styles.whiteBox}>
                  <ActivityIndicator size='large' color='#19C6D1'/>
              </View>
              <Text style={styles.matchText}>Waiting for a Match</Text>
              {this.moveOn()}
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get("screen").height,
    width:Dimensions.get("screen").width,
  },
  mainView: {
    justifyContent: 'center',
    alignItems: 'center', 
  },
  matchText: {
    color: '#212121',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 30,
    marginTop: -window.height*.35,
  },
  whiteBox: {
    backgroundColor: '#ffffff',
    width:Dimensions.get("screen").width*.9,
    height: Dimensions.get("screen").height*.6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: Dimensions.get("screen").height*.005 },
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    position: 'absolute',
    borderColor: '#19C6D1',
    borderWidth: 1.5,
    borderRadius: 5,
  },
  header:{
    color: '#605DF1',
    fontFamily: 'Montserrat-Medium',
    fontSize: 30,
    textAlign: 'center',
  },
});
