
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, AppRegistry, FlatList } from 'react-native';

let colors = ['#6DC4E0', '#605DF1']

let items = [
  {
    name: 'Name',
    timeLocation: 'Time, Location',
    summary: 'Shopping Cart Summary',
    eta: 'ETA: 2 Hours',
  },
  {
    name: 'Name',
    timeLocation: 'Time, Location',
    summary: 'Shopping Cart Summary',
    eta: 'ETA: 2 Hours',
  },
  {
    name: 'Name',
    timeLocation: 'Time, Location',
    summary: 'Shopping Cart Summary',
    eta: 'ETA: 2 Hours',
  }
]



export default class ShoppingList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.orangeBox}>
          <View style={styles.formatInOrangeBox}>
            <Image source ={require('./../assets/images/shopping-cart.png')} style={styles.ShoppingCart} />
            <Image source ={require('./../assets/images/person.png')} style={styles.person} />  
          </View>
          <View style={styles.formatInOrangeBox}>
            <Text style = {styles.header}>Shopping List</Text>
          </View>
          </View>
          
        <View style={styles.flatlistStyle}>
            <FlatList
              horizontal = {false}
              data= {items}
              keyExtractor = {(item, index) => index.toString()}
              renderItem = {
                ({item, index}) => {
                return ( 
                  <View style = {styles.rectangles}>
                  <View style={{backgroundColor: colors[index % colors.length]}}>
                  
                    <Text style = {styles.name}>{item.name}</Text>
                    <Text style = {styles.locationTime}>{item.timeLocation}</Text>
                    <Text style = {styles.summary}>{item.summary}</Text>
                    <Text style = {styles.eta}>{item.eta}</Text>
                  </View>    
                  </View>
              )
              }
               }
              />
          </View>      
          </View>   
    );
  }
};

AppRegistry.registerComponent('AwesomeProject', () => FlexDirectionBasics);    


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  formatInOrangeBox: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: Dimensions.get('screen').width,
  },
  orangeBox: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height*.50,
    backgroundColor: '#FF715B',
    alignItems: 'center',
  },
  header: {
    fontSize: 50,
    color:  '#fff',
    textAlign: 'center',
    width: Dimensions.get("screen").width,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: Dimensions.get("screen").height*.05,
  },
  person:{
    width: 43,
    height: 40,
    marginLeft: Dimensions.get("screen").width*.35,
    marginRight: Dimensions.get("screen").width*.04,
    marginTop: Dimensions.get("screen").height*.05,
  },
  ShoppingCart:{
    width: 42,
    height: 38,
    marginRight: Dimensions.get("screen").width*.35,
    marginLeft: Dimensions.get("screen").width*.04,
    marginTop: Dimensions.get("screen").height*.05,
  },
  name: {
    fontSize: 30,
    color:  '#fff',
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: Dimensions.get("screen").width*.02,
  },
  locationTime: {
    fontSize: 30,
    color:  '#fff',
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: Dimensions.get("screen").width*.02,
  },
  summary: {
    fontSize: 20,
    color:  '#fff',
    textAlign: 'left',
    fontFamily: 'Montserrat-Regular',
    marginLeft: Dimensions.get("screen").width*.02,
  },
  eta: {
    fontSize: 20,
    color:  '#fff',
    textAlign: 'left',
    fontFamily: 'Montserrat-Regular',
    marginLeft: Dimensions.get("screen").width*.02,
  },
  rectangles: {
    marginTop: 5,
    width: Dimensions.get("screen").width*.90,
    height: Dimensions.get("screen").height*.17,
  },
  flatlistStyle:{
    flex: 1, 
    justifyContent: 'flex-end',  
    alignItems: 'center', 
    top: -150,
  },
});

